'use client'
import DownloadButton from '@/components/DownloadButton'
import PdfInput from '@/components/PdfInput'
import TransactionList from '@/components/TransactionList'
import XmlInput from '@/components/XmlInput'
import Store from '@/store/store'
import {Box, Container, Heading, Tabs, VStack} from '@chakra-ui/react'
import {observer} from '@legendapp/state/react'

const Home = observer(() => (
  <Container maxW='container.xl' py={8}>
    <Heading mb={8} size='2xl' textAlign='center' mt={{base: 10, md: 0}}>
      CAMT.053 Editor
    </Heading>
    <Box overflow='auto' maxH='100vh'>
      <VStack gap={5}>
        <Tabs.Root
          w='100%'
          lazyMount
          unmountOnExit
          defaultValue={Store.lastSelectedTab.peek()}
          onValueChange={detail => Store.lastSelectedTab.set(detail.value as 'xml' | 'pdf')}>
          <Tabs.List>
            <Tabs.Trigger value='xml'>XML</Tabs.Trigger>
            <Tabs.Trigger value='pdf'>PDF</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value='xml'>
            <XmlInput />
            <TransactionList />
            <DownloadButton />
          </Tabs.Content>
          <Tabs.Content value='pdf'>
            <PdfInput />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  </Container>
))

export default Home
