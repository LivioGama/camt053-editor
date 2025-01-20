import {format} from '@/utils/formatter'
import {Badge, Box, Flex, HStack, Stack, Text, VStack} from '@chakra-ui/react'
import dayjs from 'dayjs'
import {Switch} from '@/components/ui/switch'
import {useCamt053} from '@/hooks/useCamt053'

export const TransactionCell = ({transaction}: {transaction: any}) => {
  const {updateTransaction} = useCamt053()

  const onSwitch = async () => {
    try {
      await updateTransaction(transaction.id, {perso: !transaction.perso})
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      boxShadow='sm'
      borderColor={transaction.perso ? '#52832A' : '#31709E'}>
      <Flex justifyContent='space-between' alignItems='center' gap={5}>
        <VStack align='start' gap={2}>
          <HStack gap={2}>
            <Badge
              variant='solid'
              size={transaction.amount > 200 ? 'lg' : 'sm'}
              colorPalette={
                parseFloat(transaction.amount) && transaction.type === 'debit' ? 'green' : 'red'
              }>
              {format(transaction.amount, transaction.currency)}
            </Badge>
            <Badge variant='solid' colorPalette='blue'>
              {dayjs(transaction.date).format('DD.MM.YYYY')}
            </Badge>
            <Badge colorPalette={transaction.perso ? 'green' : 'blue'}>
              {transaction.perso ? 'Perso' : 'Pro'}
            </Badge>
            <Switch checked={transaction.perso} onCheckedChange={onSwitch} />
          </HStack>
          <Stack flexDirection={{base: 'column', md: 'row'}}>
            <Text fontSize='sm' flexShrink={1}>
              {transaction.description_clean || transaction.description}
            </Text>
            {transaction.description_clean && (
              <Text color='gray.500' fontSize='xs' flexShrink={1}>
                {transaction.description}
              </Text>
            )}
          </Stack>
        </VStack>
      </Flex>
    </Box>
  )
}
