import {format} from '@/utils/formatter'
import {Badge, Box, Flex, HStack, IconButton, Stack, Text, VStack} from '@chakra-ui/react'
import dayjs from 'dayjs'
import {AiOutlineDelete} from 'react-icons/ai'

export const TransactionCell = ({
  onClick,
  transaction,
}: {
  transaction: any
  onClick: () => Promise<any>
}) => (
  <Box borderWidth='1px' borderRadius='lg' p={4} boxShadow='sm'>
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
      <IconButton aria-label='Delete' onClick={onClick} colorPalette='red' size='sm'>
        <AiOutlineDelete />
      </IconButton>
    </Flex>
  </Box>
)
