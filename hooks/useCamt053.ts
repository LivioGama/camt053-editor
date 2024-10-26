import {toaster} from '@/components/ui/toaster'
import {Transaction} from '@/models/Transaction'
import {generateCamt053XmlFile, parseCAMT} from '@/utils/camtUtil'
import pb from '@/utils/pb'
import isEmpty from 'lodash/isEmpty'
import ollama from 'ollama/browser'
import {useCallback, useState} from 'react'
import useAsyncEffect from 'use-async-effect'

export const useCamt053 = () => {
  const [transactions, setTransactions] = useState([])

  useAsyncEffect(async () => {
    const unsubscribe = pb.collection('transactions').subscribe('*', e => {
      setTransactions(prevTransactions => {
        switch (e.action) {
          case 'create':
            return [...prevTransactions, e.record]
          case 'update':
            if (e.record.deleted) return prevTransactions.filter(t => t.id !== e.record.id)
            return prevTransactions.map(t => (t.id === e.record.id ? e.record : t))
          case 'delete':
            return prevTransactions.filter(t => t.id !== e.record.id)
          default:
            return prevTransactions
        }
      })
    })

    pb.collection('transactions').getFullList({filter: 'deleted = false'}).then(setTransactions)

    return async () => {
      ;(await unsubscribe)()
    }
  }, [])

  const setXmlContent = useCallback(async (content: string) => {
    const transactions = await pb.collection('transactions').getFullList()
    const c = parseCAMT(content)

    const contentToUpload = c.filter(
      transaction => !transactions.find(t => t.description === transaction.description),
    )
    if (isEmpty(contentToUpload)) return
    toaster.create({
      description: `${contentToUpload.length} transactions to upload!`,
      type: 'info',
    })
    await Promise.allSettled(
      contentToUpload.map((transaction: Transaction) =>
        pb.collection('transactions').create(transaction),
      ),
    )
    toaster.create({
      description: `Uploaded ${contentToUpload.length} transactions`,
      type: 'success',
    })
  }, [])

  const removeTransaction = useCallback(
    (id: string) => pb.collection('transactions').update(id, {deleted: true}),
    [],
  )

  const removeMultipleTransactions = (transactionIds: string[]) =>
    Promise.allSettled(
      transactionIds.map(id => pb.collection('transactions').update(id, {deleted: true})),
    )

  const generateCamt053Xml = useCallback(() => generateCamt053XmlFile(transactions), [transactions])

  return {
    setXmlContent,
    removeTransaction,
    transactions,
    generateCamt053Xml,
    removeMultipleTransactions,
  }
}

// Moved to the playground/index.js instead
export const optimizeDescription = async (description: string) => {
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
