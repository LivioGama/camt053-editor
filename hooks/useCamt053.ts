import {toaster} from '@/components/ui/toaster'
import {Transaction} from '@/models/Transaction'
import {generateCamt053XmlFile, parseCAMT} from '@/utils/camtUtil'
import pb from '@/utils/pb'
import isEmpty from 'lodash/isEmpty'
import {useCallback, useState} from 'react'
import useAsyncEffect from 'use-async-effect'
import dayjs from 'dayjs'

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
      transaction =>
        !transactions.some(
          t =>
            dayjs(t.date).format('YYYY-MM-DD') === transaction.date &&
            t.amount === transaction.amount &&
            t.description.trim() === transaction.description.trim(),
        ),
    )

    if (isEmpty(contentToUpload)) {
      console.log('No transactions to upload')
      return
    }
    toaster.create({
      description: `${contentToUpload.length} transactions 🔼 ; ${c.length - contentToUpload.length} skipped ⏩`,
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
