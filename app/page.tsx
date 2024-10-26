'use client'
import DownloadButton from '@/components/DownloadButton'
import TransactionList from '@/components/TransactionList'
import XmlInput from '@/components/XmlInput'
import {Container, Heading, VStack} from '@chakra-ui/react'

const Home = () => (
  <Container maxW='container.xl' py={8}>
    <Heading mb={8} size='2xl' textAlign='center' mt={{base: 10, md: 0}}>
      CAMT.053 Editor
    </Heading>
    <VStack gap={5}>
      <XmlInput />
      <TransactionList />
      <DownloadButton />
    </VStack>
  </Container>
)

export default Home
