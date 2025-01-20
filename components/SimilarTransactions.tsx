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
import {Button, Flex, HStack, Input, Text} from '@chakra-ui/react'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import {useMemo, useState} from 'react'

export const SimilarTransactions = ({
  transactions,
  showOnlyCredit,
}: {
  transactions: Transaction[]
  showOnlyCredit: boolean
}) => {
  const {removeTransaction, moveMultipleTransactionsTo} = useCamt053()
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

  const toggleMultipleTo = async (mode: 'perso' | 'pro') => {
    if (
      window.confirm(
        `Are you sure you want to move all the transaction to ${filteredTransactions.length} "${mode}"?`,
      )
    ) {
      const transactionIds = filteredTransactions.map(t => t.id)
      await moveMultipleTransactionsTo(mode, transactionIds)
      setSearchTerm('')
    }
  }

  return (
    <DrawerRoot size='xl' onOpenChange={details => !details.open && setSearchTerm('')}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant='outline' size='sm' pos='fixed' right={14} top={10} zIndex={1000}>
          Search similar transactions
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Search similar transactions</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Flex mb={4} alignItems='center' justifyContent='space-between'>
            <Input
              maxW={250}
              placeholder='Search transactions...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              mr={2}
            />
            {!isEmpty(searchTerm) && (
              <HStack flex={1}>
                <Text flex={1} textAlign='center'>
                  {filteredTransactions.length} transactions{' '}
                  {format(
                    sumBy(filteredTransactions, 'amount'),
                    isEmpty(filteredTransactions) ? 'CHF' : filteredTransactions[0].currency,
                  )}
                </Text>
                <Button
                  onClick={() => toggleMultipleTo('perso')}
                  bg='#52832A'
                  color='white'
                  disabled={
                    isEmpty(filteredTransactions) || filteredTransactions.every(t => t.perso)
                  }
                  ml={2}>
                  Convert all to perso
                </Button>
                <Button
                  onClick={() => toggleMultipleTo('pro')}
                  bg='#31709E'
                  color='white'
                  disabled={
                    isEmpty(filteredTransactions) || filteredTransactions.every(t => !t.perso)
                  }
                  ml={2}>
                  Convert all to pro
                </Button>
              </HStack>
            )}
          </Flex>
          {!isEmpty(searchTerm) &&
            filteredTransactions.map(transaction => (
              <TransactionCell key={transaction.id} transaction={transaction} />
            ))}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}
