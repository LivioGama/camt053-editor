import {toaster} from '@/components/ui/toaster'
import {Transaction} from '@/models/Transaction'
import {generateCamt053XmlFile, parseCAMT} from '@/utils/camtUtil'
import pb from '@/utils/pb'
import isEmpty from 'lodash/isEmpty'
import {useCallback, useEffect} from 'react'
import dayjs from 'dayjs'
import {useQuery, useQueryClient} from '@tanstack/react-query'

export const useCamt053 = () => {
  const queryClient = useQueryClient()

  const {data: transactions = []} = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => pb.collection('transactions').getFullList({}),
  })

  useEffect(() => {
    const subscription = pb.collection('transactions').subscribe('*', e => {
      if (e.action === 'create' || e.action === 'delete') {
        queryClient.invalidateQueries({queryKey: ['transactions']})
      } else if (e.action === 'update') {
        queryClient.setQueryData(['transactions'], (oldData: Transaction[]) =>
          oldData.map(t => (t.id === e.record.id ? e.record : t)),
        )
      }
    })

    return () => {
      subscription.then(unsub => unsub())
    }
  }, [queryClient])

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

  const moveMultipleTransactionsTo = (mode, transactionIds: string[]) =>
    Promise.allSettled(
      transactionIds.map(id => pb.collection('transactions').update(id, {perso: mode === 'perso'})),
    )

  const generateCamt053Xml = useCallback(() => generateCamt053XmlFile(transactions), [transactions])

  const updateTransaction = useCallback(
    (id: string, transaction: Partial<Transaction>) =>
      pb.collection('transactions').update(id, transaction),
    [],
  )

  return {
    setXmlContent,
    removeTransaction,
    transactions,
    generateCamt053Xml,
    moveMultipleTransactionsTo,
    updateTransaction,
  }
}
