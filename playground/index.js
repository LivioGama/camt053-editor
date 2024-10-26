import pkg from 'lodash'
import log4node from 'log4node'
import ollama from 'ollama/browser'
import PocketBase from 'pocketbase'

const {isEmpty} = pkg

const log = new log4node.Log4Node({level: 'debug', file: 'playground.log'})

export const PB_URL = 'http://127.0.0.1:8090'

const pb = new PocketBase(PB_URL)

pb.autoCancellation(false)

export default pb

export const optimizeDescription = async description => {
  const response = await ollama.chat({
    model: 'llama3',
    stream: false,
    messages: [
      {
        role: 'user',
        content: `Simplify this transaction description by summarizing it to only the merchant name, and should not exceed 5 words. Only provide the direct answer without any prefix or introduction.\`\`\`${description}\`\`\`
        A good example is:
        \`\`\`APPLE PAY ACHAT/SHOPPING EN LIGNE DU 08.04.2024 33.40 EUR AU COURS DE 0.9897 MONTANT DANS LA MONNAIE DU COMPTE 33.06 1.5% FRAIS DE TRAITEMENT 0.50 CARTE N° XXXX2360 SNCF WEB MOBILE PARIS 12\`\`\`
        The result should be:
        \`\`\`SNCF WEB MOBILE PARIS 12\`\`\`
        `,
      },
    ],
  })
  return response.message.content
}

const updateTransactions = async () => {
  const transactions = await pb.collection('transactions').getFullList()
  const withoutDesc = transactions.filter(transaction => !transaction.description_clean)
  if (isEmpty(withoutDesc)) return
  console.log(`${withoutDesc.length} transactions to optimize!`)
  for (const transaction of withoutDesc) {
    const descriptionClean = await optimizeDescription(transaction.description)
    await pb.collection('transactions').update(transaction.id, {
      description_clean: descriptionClean,
    })
    log.debug(`Updated transaction ${transaction.id} with description_clean: ${descriptionClean}`)
    const progress = Math.round((withoutDesc.indexOf(transaction) / withoutDesc.length) * 100)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(
      `Progress: ${progress}% (${withoutDesc.indexOf(transaction)}/${withoutDesc.length})`,
    )
  }
}

updateTransactions()
