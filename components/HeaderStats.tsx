import {Transaction} from '@/models/Transaction'
import {format} from '@/utils/formatter'
import {Badge, Heading, Input, Separator, Stack, Text, VStack} from '@chakra-ui/react'
import sumBy from 'lodash/sumBy'

export const HeaderStats = ({
  onChange,
  transactions,
  value,
}: {
  transactions: Transaction[]
  value: number
  onChange: (e) => void
}) => {
  const currentCredit = sumBy(
    transactions.filter(t => t.type === 'debit'),
    'amount',
  )
  const currentDebit = sumBy(
    transactions.filter(t => t.type === 'credit'),
    'amount',
  )
  return (
    <VStack py={5} gap={5}>
      <Separator />
      <Stack flexDirection={{base: 'column', md: 'row'}} gap={10}>
        <VStack align='stretch' gap={5}>
          <Heading size='lg'>
            <Text as='span'>Current credit: </Text>
            <Badge variant='solid' size='lg' colorPalette='green'>
              {format(currentCredit, 'CHF')}
            </Badge>
          </Heading>
          <Heading size='lg'>
            <Text as='span'>Yearly projection: </Text>
            <Input type='number' value={value} onChange={onChange} width='150px' mr={2} />
            <Badge variant='solid' size='lg' colorPalette='green'>
              {format(
                sumBy(
                  transactions.filter(t => t.type === 'debit'),
                  'amount',
                ) + value,
                'CHF',
              )}
            </Badge>
          </Heading>
        </VStack>
        <VStack align='stretch' gap={5}>
          <Heading size='lg'>
            Current debit:{' '}
            <Badge variant='solid' size='lg' colorPalette='red'>
              {format(currentDebit, 'CHF')}
            </Badge>
          </Heading>
          <Heading size='lg'>
            Taxable amount:{' '}
            <Badge variant='solid' size='lg' colorPalette='red'>
              {format(currentCredit - currentDebit, 'CHF')}
            </Badge>
          </Heading>
        </VStack>
      </Stack>
      <Heading size='lg'>{transactions.length} transactions</Heading>
      <Separator />
    </VStack>
  )
}
