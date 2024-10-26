import {TransactionCell} from '@/components/TransactionCell'
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {useCamt053} from '@/hooks/useCamt053'
import {Transaction} from '@/models/Transaction'
import {format} from '@/utils/formatter'
import {Button, Flex, Input} from '@chakra-ui/react'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import {useMemo, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'

export const SimilarTransactions = ({
  transactions,
  showOnlyCredit,
}: {
  transactions: Transaction[]
  showOnlyCredit: boolean
}) => {
  const {removeTransaction, removeMultipleTransactions} = useCamt053()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        transaction =>
          (showOnlyCredit ? transaction.type === 'debit' : true) &&
          Object.values(transaction).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
    [transactions, searchTerm, showOnlyCredit],
  )

  const handleRemoveAllFiltered = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete all ${filteredTransactions.length} filtered transactions?`,
      )
    ) {
      const transactionIds = filteredTransactions.map(t => t.id)
      await removeMultipleTransactions(transactionIds)
      setSearchTerm('')
    }
  }
  return (
    <DrawerRoot size='xl'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant='outline' size='sm' pos='fixed' right={4} top={4}>
          Search similar transactions
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Search similar transactions</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Flex mb={4} alignItems='center'>
            <Input
              placeholder='Search transactions...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              mr={2}
            />
            {!isEmpty(searchTerm) && (
              <Button
                onClick={() => handleRemoveAllFiltered()}
                colorPalette='red'
                disabled={isEmpty(filteredTransactions)}
                ml={2}>
                <AiOutlineDelete />
                Remove all filtered ({filteredTransactions.length} transactions -{' '}
                {format(
                  sumBy(filteredTransactions, 'amount'),
                  isEmpty(filteredTransactions) ? 'CHF' : filteredTransactions[0].currency,
                )}
                )
              </Button>
            )}
          </Flex>
          {!isEmpty(searchTerm) &&
            filteredTransactions.map(transaction => (
              <TransactionCell
                key={transaction.id}
                transaction={transaction}
                onClick={() => removeTransaction(transaction.id)}
              />
            ))}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}
