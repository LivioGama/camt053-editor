import {RevenuesChart} from '@/components/RevenuesChart'
import {SimilarTransactions} from '@/components/SimilarTransactions'
import {TransactionCell} from '@/components/TransactionCell'
import {Switch} from '@/components/ui/switch'
import {useCamt053} from '@/hooks/useCamt053'
import {Transaction} from '@/models/Transaction'
import store from '@/store/store'
import {format} from '@/utils/formatter'
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Separator,
  VStack,
} from '@chakra-ui/react'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import sumBy from 'lodash/sumBy'
import {useCallback, useMemo} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'

const TransactionList = () => {
  const {transactions, removeTransaction, removeMultipleTransactions} = useCamt053()
  const {
    showOnlyCredit,
    toggleShowOnlyCredit,
    treatedMonths,
    markMonthAsTreated,
    unmarkMonthAsTreated,
    projectedRevenue,
    setProjectedRevenue,
  } = store()

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(transaction => (showOnlyCredit ? transaction.type === 'debit' : true)),
    [transactions, showOnlyCredit],
  )

  const groupedTransactions = groupBy(filteredTransactions, (transaction: Transaction) => {
    const date = new Date(transaction.date)
    return `${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`
  }) as Record<string, Transaction[]>

  const sortedGroupedTransactions = sortBy(Object.entries(groupedTransactions), ([date]) =>
    new Date(date).getTime(),
  )

  const handleToggleTreatedMonth = useCallback(
    (monthYear: string) => {
      if (treatedMonths.includes(monthYear)) {
        unmarkMonthAsTreated(monthYear)
      } else {
        markMonthAsTreated(monthYear)
      }
    },
    [treatedMonths, markMonthAsTreated, unmarkMonthAsTreated],
  )

  return (
    <Box w='full'>
      <SimilarTransactions transactions={transactions} showOnlyCredit={showOnlyCredit} />
      <HStack justifyContent='space-around'>
        <VStack align='stretch' gap={4}>
          <Heading size='lg' mb={4}>
            Current credit:{' '}
            <Badge variant='solid' size='lg' colorPalette='green'>
              {format(
                sumBy(
                  transactions.filter(t => t.type === 'debit'),
                  'amount',
                ),
                'CHF',
              )}
            </Badge>{' '}
            Annual projection:{' '}
            <Input
              type='number'
              value={projectedRevenue}
              onChange={e => setProjectedRevenue(Number(e.target.value))}
              width='150px'
              mr={2}
            />
            <Badge variant='solid' size='lg' colorPalette='green'>
              {format(
                sumBy(
                  transactions.filter(t => t.type === 'debit'),
                  'amount',
                ) + projectedRevenue,
                'CHF',
              )}
            </Badge>
          </Heading>
          <Heading size='lg' mb={4}>
            Current debit:{' '}
            <Badge variant='solid' size='lg' colorPalette='red'>
              {format(
                sumBy(
                  transactions.filter(t => t.type === 'credit'),
                  'amount',
                ),
                'CHF',
              )}
            </Badge>
          </Heading>
        </VStack>
        <Heading size='lg' mb={4}>
          {transactions.length} transactions
        </Heading>
      </HStack>
      <RevenuesChart transactions={transactions} />
      <Switch mb={4} checked={showOnlyCredit} onCheckedChange={toggleShowOnlyCredit}>
        Show only credit
      </Switch>

      {sortedGroupedTransactions.map(([monthYear, transactions]) => (
        <Box key={monthYear} mb={6} borderRadius='lg' border='dashed 3px lightgray' p={5}>
          <Separator />
          <Flex
            justifyContent='space-between'
            alignItems='center'
            p={6}
            bg='gray.900'
            mb={4}
            borderRadius='lg'>
            <Flex alignItems='center' gap={4}>
              <Heading size='lg' textAlign='center'>
                {monthYear}
              </Heading>
              <Badge>{transactions.length} transactions</Badge>
              <Badge variant='solid' size='lg' colorPalette='green'>
                {format(
                  sumBy(
                    transactions.filter(t => t.type === 'debit'),
                    'amount',
                  ),
                  'CHF',
                )}
              </Badge>
              <Badge variant='solid' size='lg' colorPalette='red'>
                {format(
                  sumBy(
                    transactions.filter(t => t.type === 'credit'),
                    'amount',
                  ),
                  'CHF',
                )}
              </Badge>
            </Flex>
            <HStack gap={4}>
              <Switch
                ml={4}
                checked={treatedMonths.includes(monthYear)}
                onCheckedChange={() => handleToggleTreatedMonth(monthYear)}>
                Treated
              </Switch>
              <IconButton
                colorPalette='red'
                aria-label='Delete All'
                onClick={async () => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete all transactions for ${monthYear}?`,
                    )
                  ) {
                    const transactionIds = transactions.map(t => t.id)
                    await removeMultipleTransactions(transactionIds)
                  }
                }}
                colorScheme='red'
                size='sm'>
                <AiOutlineDelete />
              </IconButton>
            </HStack>
          </Flex>
          {!treatedMonths.includes(monthYear) && (
            <VStack gap={4} align='stretch'>
              {transactions.map((transaction: Transaction) => (
                <TransactionCell
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => removeTransaction(transaction.id)}
                />
              ))}
            </VStack>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default TransactionList
