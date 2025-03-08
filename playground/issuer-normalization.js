import {config} from 'dotenv'
import fs from 'fs'
import isEmpty from 'lodash/isEmpty.js'
import log4node from 'log4node'
import PocketBase from 'pocketbase'
import readline from 'readline'
import {generateWithGemini} from './generateWithGemini.js'

const log = new log4node.Log4Node({level: 'debug', file: 'issuer-normalization.log'})

config({path: '../.env'})

export const PB_URL = process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8090'

const pb = new PocketBase(PB_URL)
pb.autoCancellation(false)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const promptUser = question => new Promise(resolve => rl.question(question, resolve))

const PROCESSED_ISSUERS_FILE = './processed-issuers.json'

// Load previously processed issuers
const loadProcessedIssuers = () => {
  try {
    if (fs.existsSync(PROCESSED_ISSUERS_FILE)) {
      const data = fs.readFileSync(PROCESSED_ISSUERS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(`Error loading processed issuers: ${error.message}`)
  }
  return {processed: [], normalized: {}}
}

// Save processed issuers to file
const saveProcessedIssuers = processedData => {
  try {
    fs.writeFileSync(PROCESSED_ISSUERS_FILE, JSON.stringify(processedData, null, 2), 'utf8')
    console.log(`Saved processed issuers to ${PROCESSED_ISSUERS_FILE}`)
  } catch (error) {
    console.error(`Error saving processed issuers: ${error.message}`)
  }
}

const normalizeIssuers = async () => {
  // Load previously processed issuers
  const {processed, normalized} = loadProcessedIssuers()
  console.log(`Loaded ${processed.length} previously processed issuers`)

  // Fetch all transactions and invoices
  const transactions = await pb.collection('transactions').getFullList({
    filter: 'perso = false',
  })

  const invoices = await pb.collection('analyzed_files').getFullList({
    filter: 'analysis_result.isError = false',
  })

  console.log(`Found ${transactions.length} transactions and ${invoices.length} invoices`)

  // Extract unique issuers from transactions and invoices
  const transactionIssuers = transactions.map(t => t.description_clean || t.description)
  const invoiceIssuers = invoices.map(i => i.analysis_result?.issuer).filter(Boolean)

  // Combine all issuers
  const allIssuers = [...transactionIssuers, ...invoiceIssuers]

  // Create a map of lowercase -> original issuers to handle case-insensitive matching
  const issuersByLowercase = {}
  allIssuers.forEach(issuer => {
    const lowercase = issuer.toLowerCase()
    if (!issuersByLowercase[lowercase]) {
      issuersByLowercase[lowercase] = []
    }
    if (!issuersByLowercase[lowercase].includes(issuer)) {
      issuersByLowercase[lowercase].push(issuer)
    }
  })

  // Get unique lowercase keys
  const uniqueLowercaseIssuers = Object.keys(issuersByLowercase)

  console.log(`Found ${uniqueLowercaseIssuers.length} unique issuers (case-insensitive)`)

  // Map to store the normalized names (lowercase -> normalized)
  const normalizedIssuerMap = {...normalized}

  // Map to store all variations -> normalized (for direct lookup)
  const issuerMap = {}

  // Track newly processed issuers
  const newlyProcessed = []

  // Prompt user for each unique issuer group
  for (const lowercaseIssuer of uniqueLowercaseIssuers) {
    // Skip if already processed
    if (processed.includes(lowercaseIssuer)) {
      console.log(`\n\x1b[33mSkipping already processed issuer: "${lowercaseIssuer}"\x1b[0m`)

      // Apply the previously normalized name to all variations
      const normalizedName = normalized[lowercaseIssuer]
      if (normalizedName) {
        const variations = issuersByLowercase[lowercaseIssuer]
        variations.forEach(variation => {
          issuerMap[variation] = normalizedName
        })
      }

      continue
    }

    const variations = issuersByLowercase[lowercaseIssuer]
    const displayIssuer = variations[0] // Use the first variation for display

    console.log(`\nIssuer: "${displayIssuer}"`)
    if (variations.length > 1) {
      console.log('Variations:')
      variations.forEach((v, i) => console.log(`  ${i + 1}. "${v}"`))
    }

    const newName = await promptUser(
      `Rename this issuer (leave empty to keep "${displayIssuer}"): `,
    )

    const normalizedName = newName.trim() || displayIssuer
    normalizedIssuerMap[lowercaseIssuer] = normalizedName

    // Mark as processed
    newlyProcessed.push(lowercaseIssuer)

    // Map all variations to the normalized name
    variations.forEach(variation => {
      issuerMap[variation] = normalizedName
    })

    if (newName.trim()) {
      console.log(`\x1b[32mRenamed all variations to "${normalizedName}"\x1b[0m`)
    } else {
      console.log(`\x1b[34mKeeping "${normalizedName}" as is\x1b[0m`)
    }
  }

  // Update transactions and invoices with normalized issuers
  console.log('\nUpdating transactions...')
  let transactionUpdateCount = 0
  for (const transaction of transactions) {
    const currentIssuer = transaction.description_clean || transaction.description
    const normalizedIssuer = issuerMap[currentIssuer]

    if (normalizedIssuer && normalizedIssuer !== currentIssuer) {
      await pb.collection('transactions').update(transaction.id, {
        description_clean: normalizedIssuer,
      })
      console.log(
        `Updated transaction ${transaction.id}: "${currentIssuer}" -> "${normalizedIssuer}"`,
      )
      transactionUpdateCount++
    }
  }
  console.log(`Updated ${transactionUpdateCount} transactions`)

  console.log('\nUpdating invoices...')
  let invoiceUpdateCount = 0
  for (const invoice of invoices) {
    if (invoice.analysis_result?.issuer) {
      const currentIssuer = invoice.analysis_result.issuer
      const normalizedIssuer = issuerMap[currentIssuer]

      if (normalizedIssuer && normalizedIssuer !== currentIssuer) {
        const updatedAnalysisResult = {
          ...invoice.analysis_result,
          issuer: normalizedIssuer,
        }

        await pb.collection('analyzed_files').update(invoice.id, {
          analysis_result: updatedAnalysisResult,
        })
        console.log(`Updated invoice ${invoice.id}: "${currentIssuer}" -> "${normalizedIssuer}"`)
        log.debug(`Updated invoice ${invoice.id}: "${currentIssuer}" -> "${normalizedIssuer}"`)
        invoiceUpdateCount++
      }
    }
  }
  console.log(`Updated ${invoiceUpdateCount} invoices`)

  // Save processed issuers
  saveProcessedIssuers({
    processed: [...processed, ...newlyProcessed],
    normalized: normalizedIssuerMap,
  })

  console.log('\nNormalization complete!')

  return issuerMap
}

const matchDocumentsByIssuer = async issuerMap => {
  if (!issuerMap) {
    console.log('No issuer map provided. Run normalizeIssuers() first.')
    return
  }

  // Fetch all transactions and invoices
  const transactions = await pb.collection('transactions').getFullList({
    filter: 'perso = false && file = null',
  })

  const invoices = await pb.collection('analyzed_files').getFullList({
    filter: 'transaction = null && analysis_result.isError = false',
  })

  console.log(
    `Found ${transactions.length} unmatched transactions and ${invoices.length} unmatched invoices`,
  )

  // Group by normalized issuer
  const transactionsByIssuer = {}
  const invoicesByIssuer = {}

  transactions.forEach(transaction => {
    const issuer = transaction.description_clean || transaction.description
    if (!transactionsByIssuer[issuer]) {
      transactionsByIssuer[issuer] = []
    }
    transactionsByIssuer[issuer].push(transaction)
  })

  invoices.forEach(invoice => {
    if (invoice.analysis_result?.issuer) {
      const issuer = invoice.analysis_result.issuer
      if (!invoicesByIssuer[issuer]) {
        invoicesByIssuer[issuer] = []
      }
      invoicesByIssuer[issuer].push(invoice)
    }
  })

  // Process each issuer group
  for (const issuer of Object.keys(transactionsByIssuer)) {
    const issuerTransactions = transactionsByIssuer[issuer]
    const issuerInvoices = invoicesByIssuer[issuer] || []

    if (isEmpty(issuerInvoices)) {
      console.log(`\x1b[33mNo invoices found for issuer "${issuer}"\x1b[0m`)
      continue
    }

    console.log(`\n\x1b[36mProcessing issuer: ${issuer}\x1b[0m`)
    console.log(
      `Found ${issuerTransactions.length} transactions and ${issuerInvoices.length} invoices`,
    )

    // Prepare data for LLM
    const transactionsData = issuerTransactions.map(t => ({
      id: t.id,
      description: t.description,
      description_clean: t.description_clean,
      amount: t.amount,
      currency: t.currency,
      date: t.date,
    }))

    const invoicesData = issuerInvoices.map(i => ({
      id: i.id,
      issuer: i.analysis_result.issuer,
      amount: i.analysis_result.amount,
      currency: i.analysis_result.currency,
      date: i.analysis_result.date,
      invoice_number: i.analysis_result.invoice_number,
    }))

    // Call LLM to match
    const matches = await matchWithLLM(issuer, transactionsData, invoicesData)

    if (!matches || isEmpty(matches)) {
      console.log(`\x1b[31mNo matches found for issuer "${issuer}"\x1b[0m`)
      continue
    }

    // Apply matches
    console.log(`\x1b[32mApplying ${matches.length} matches for issuer "${issuer}"\x1b[0m`)
    for (const match of matches) {
      try {
        if (!match.transactionId) continue
        await Promise.all([
          pb.collection('transactions').update(match.transactionId, {file: match.invoiceId}),
          pb
            .collection('analyzed_files')
            .update(match.invoiceId, {transaction: match.transactionId}),
        ])
        log.debug(`Matched transaction ${match.transactionId} with invoice ${match.invoiceId}`)
        console.log(`Matched transaction ${match.transactionId} with invoice ${match.invoiceId}`)
      } catch (error) {
        console.error(`Error applying match: ${error.message}`)
      }
    }
  }

  console.log('\nMatching complete!')
}

const matchWithLLM = async (issuer, transactions, invoices) => {
  const prompt = `
You are an expert at matching bank transactions with their corresponding invoices.

I have a set of bank transactions and invoices from the same issuer: "${issuer}".
Your task is to match each invoice with its corresponding transaction.

Matching criteria (in order of importance):
1. Date proximity (transactions usually happen on or near the invoice date)
2. Amount similarity (amounts should be close, but may not be exact due to currency conversion or fees)
3. Description relevance (transaction descriptions may contain keywords from the invoice)

For each invoice, find the most likely matching transaction.
Each transaction should only be matched to one invoice, and vice versa.

Return a valid JSON array of matches with this format:
[
  {
    "invoiceId": "invoice_id_1",
    "transactionId": "transaction_id_1",
    "confidence": 0.95,
    "reasoning": "Exact date match and amount match"
  },
  ...
]

Transactions:
${JSON.stringify(transactions, null, 2)}

Invoices:
${JSON.stringify(invoices, null, 2)}
`

  try {
    let content = ''
    await generateWithGemini(prompt, chunk => {
      content += chunk
      process.stdout.write(chunk)
    })

    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Failed to extract JSON from LLM response')
      return []
    }

    const matches = JSON.parse(jsonMatch[0])
    return matches
  } catch (error) {
    console.error(`Error matching with LLM: ${error.message}`)
    return []
  }
}

// Run the normalization process
const runNormalization = async () => {
  console.log('Starting issuer normalization process...')
  const issuerMap = await normalizeIssuers()
  console.log('Normalization complete. Would you like to proceed with matching? (y/n)')

  const answer = await promptUser('Proceed with matching? (y/n): ')
  if (answer.toLowerCase() === 'y') {
    await matchDocumentsByIssuer(issuerMap)
  } else {
    console.log('Matching skipped. Run matchDocumentsByIssuer() manually when ready.')
    rl.close()
  }
}

// Export functions for manual execution
export {matchDocumentsByIssuer, normalizeIssuers, runNormalization}

// Run immediately
runNormalization()

const checkIssuersForSpaces = async () => {
  // Fetch all transactions and invoices
  const transactions = await pb.collection('transactions').getFullList({
    filter: 'perso = false',
  })

  const invoices = await pb.collection('analyzed_files').getFullList({
    filter: 'analysis_result.isError = false',
  })

  // Extract issuers
  const transactionIssuers = transactions.map(t => ({
    id: t.id,
    type: 'transaction',
    issuer: t.description_clean || t.description,
  }))

  const invoiceIssuers = invoices
    .filter(i => i.analysis_result?.issuer)
    .map(i => ({
      id: i.id,
      type: 'invoice',
      issuer: i.analysis_result.issuer,
    }))

  // Combine all issuers
  const allIssuers = [...transactionIssuers, ...invoiceIssuers]

  // Check for spaces
  const issuersWithSpaces = allIssuers.filter(({issuer}) => issuer !== issuer.trim())

  if (issuersWithSpaces.length === 0) {
    console.log('No issuers found with leading or trailing spaces')
    return
  }

  console.log('\nFound issuers with leading or trailing spaces:')
  issuersWithSpaces.forEach(({id, type, issuer}) => {
    console.log(`[${type}] ID: ${id}`)
    console.log(`Original: "${issuer}"`)
    console.log(`Trimmed : "${issuer.trim()}"`)
    console.log('---')
  })
}

// Export the new function
// checkIssuersForSpaces()
