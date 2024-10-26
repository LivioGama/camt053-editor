import {HeaderStats} from '@/components/HeaderStats'
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
  Heading,
  HStack,
  IconButton,
  Separator,
  Stack,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({base: true, md: false})

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
      <HeaderStats
        transactions={transactions}
        value={projectedRevenue}
        onChange={e => setProjectedRevenue(Number(e.target.value))}
      />
      <RevenuesChart transactions={transactions} />
      <Switch mb={4} checked={showOnlyCredit} onCheckedChange={toggleShowOnlyCredit}>
        Show only credit
      </Switch>
      <Separator />

      {sortedGroupedTransactions.map(([monthYear, transactions]) => (
        <Box key={monthYear} mb={6} borderRadius='lg' border='dashed 3px lightgray' p={5}>
          <Separator />
          <Stack
            justifyContent='space-between'
            alignItems='center'
            p={6}
            bg='gray.900'
            mb={4}
            borderRadius='lg'>
            <Stack flexDirection={{base: 'column', md: 'row'}} alignItems='center' gap={4} w='full'>
              <Heading size={{base: 'sm', md: 'lg'}}>{monthYear}</Heading>
              <HStack w='full'>
                <HStack gap={{base: 2, md: 4}} w='full' alignItems='stretch'>
                  <Stack flexDirection={{base: 'column', md: 'row'}}>
                    <Badge>{transactions.length} transactions</Badge>
                    <Badge variant='solid' size={{base: 'sm', md: 'lg'}} colorPalette='green'>
                      {format(
                        sumBy(
                          transactions.filter(t => t.type === 'debit'),
                          'amount',
                        ),
                        'CHF',
                      )}
                    </Badge>
                    <Badge variant='solid' size={{base: 'sm', md: 'lg'}} colorPalette='red'>
                      {format(
                        sumBy(
                          transactions.filter(t => t.type === 'credit'),
                          'amount',
                        ),
                        'CHF',
                      )}
                    </Badge>
                  </Stack>
                </HStack>
                <Stack flexDirection={{base: 'column', md: 'row'}} gap={4}>
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
                </Stack>
              </HStack>
            </Stack>
          </Stack>
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
