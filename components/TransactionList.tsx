import {HeaderStats} from '@/components/HeaderStats'
import {RevenuesChart} from '@/components/RevenuesChart'
import {SimilarTransactions} from '@/components/SimilarTransactions'
import {TransactionCell} from '@/components/TransactionCell'
import {Switch} from '@/components/ui/switch'
import {useCamt053} from '@/hooks/useCamt053'
import {Transaction} from '@/models/Transaction'
import Store from '@/store/store'
import {format} from '@/utils/formatter'
import {Badge, Box, Heading, HStack, Separator, Stack, VStack} from '@chakra-ui/react'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import sumBy from 'lodash/sumBy'
import {useCallback, useMemo} from 'react'
import {observer} from '@legendapp/state/react'

const TransactionList = observer(() => {
  const {transactions} = useCamt053()
  const showOnlyCredit = Store.showOnlyCredit.get()
  const limitToYear = Store.limitToYear.get()
  const treatedMonths = Store.treatedMonths.get()
  const projectedRevenue = Store.projectedRevenue.get()
  const showOnlyProExpenses = Store.showOnlyProExpenses.get()
  const showOnlyPersoExpenses = Store.showOnlyPersoExpenses.get()

  const yearFilteredTransactions = useMemo(
    () =>
      transactions.filter(
        transaction =>
          !limitToYear || new Date(transaction.date).getFullYear() === new Date().getFullYear() - 1,
      ),
    [transactions, limitToYear],
  )

  const listFilteredTransactions = useMemo(
    () =>
      yearFilteredTransactions.filter(transaction =>
        !showOnlyCredit || transaction.type === 'debit'
          ? !showOnlyProExpenses || !transaction.perso
            ? !(showOnlyPersoExpenses && !transaction.perso)
            : false
          : false,
      ),
    [yearFilteredTransactions, showOnlyCredit, showOnlyProExpenses, showOnlyPersoExpenses],
  )

  const groupedTransactions = groupBy(listFilteredTransactions, (transaction: Transaction) => {
    const date = new Date(transaction.date)
    return `${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`
  })

  const sortedGroupedTransactions = sortBy(Object.entries(groupedTransactions), ([date]) =>
    new Date(date).getTime(),
  )

  const handleToggleTreatedMonth = useCallback(
    (monthYear: string) => {
      if (treatedMonths.includes(monthYear)) {
        Store.treatedMonths.$ = treatedMonths.filter(m => m !== monthYear)
      } else {
        Store.treatedMonths.$ = [...treatedMonths, monthYear]
      }
    },
    [treatedMonths],
  )

  return (
    <Box w='full'>
      <SimilarTransactions
        transactions={yearFilteredTransactions}
        showOnlyCredit={showOnlyCredit}
      />
      <HeaderStats
        transactions={yearFilteredTransactions}
        value={projectedRevenue}
        onChange={e => (Store.projectedRevenue.$ = Number(e.target.value))}
      />
      <RevenuesChart transactions={yearFilteredTransactions} />
      <HStack gap={4}>
        <Switch mb={4} checked={limitToYear} onCheckedChange={() => Store.limitToYear.toggle()}>
          Limit to the year
        </Switch>
        <Switch
          mb={4}
          checked={showOnlyCredit}
          onCheckedChange={() => Store.showOnlyCredit.toggle()}>
          Show only credit
        </Switch>
        <Switch
          mb={4}
          checked={showOnlyProExpenses}
          onCheckedChange={() => {
            Store.showOnlyProExpenses.toggle()
            if (!showOnlyProExpenses) {
              Store.showOnlyPersoExpenses.$ = false
            }
          }}>
          Show only pro expenses
        </Switch>
        <Switch
          mb={4}
          checked={showOnlyPersoExpenses}
          onCheckedChange={() => {
            Store.showOnlyPersoExpenses.toggle()
            if (!showOnlyPersoExpenses) {
              Store.showOnlyProExpenses.$ = false
            }
          }}>
          Show only personal expenses
        </Switch>
      </HStack>
      <Separator />

      {sortedGroupedTransactions.map(([monthYear, transactions]) => (
        <Box key={monthYear} mb={6} borderRadius='lg' border='dashed 3px lightgray' p={5}>
          <Box position='sticky' top={8} zIndex={2} bg='gray.800'>
            <Separator />
            <Stack
              justifyContent='space-between'
              alignItems='center'
              p={6}
              bg='gray.900'
              mb={4}
              borderRadius='lg'>
              <Stack
                flexDirection={{base: 'column', md: 'row'}}
                alignItems='center'
                gap={4}
                pr={48}
                w='full'>
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
                  </Stack>
                </HStack>
              </Stack>
            </Stack>
          </Box>
          {!treatedMonths.includes(monthYear) && (
            <VStack gap={4} align='stretch'>
              {sortBy(transactions, 'date').map((transaction: Transaction) => (
                <TransactionCell key={transaction.id} transaction={transaction} />
              ))}
            </VStack>
          )}
        </Box>
      ))}
    </Box>
  )
})

export default TransactionList
