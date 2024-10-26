import {Button} from '@/components/ui/button'
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import {useCamt053} from '@/hooks/useCamt053'
import {sampleXml} from '@/sample-camt.053'
import {Stack, Textarea} from '@chakra-ui/react'
import isEmpty from 'lodash/isEmpty'
import {useState} from 'react'

const XmlInput = () => {
  const {transactions, setXmlContent} = useCamt053()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUseExample = async () => {
    if (!isEmpty(transactions)) {
      setIsDialogOpen(true)
    } else {
      await setXmlContent(sampleXml)
    }
  }

  const confirmUseExample = async () => {
    await setXmlContent(sampleXml)
    setIsDialogOpen(false)
  }

  return (
    <>
      <Stack flexDirection={{base: 'column', md: 'row'}} gap={5} w='full' alignItems='stretch'>
        <Textarea
          flex={1}
          onChange={e => setXmlContent(e.target.value)}
          height='50px'
          placeholder='Paste your CAMT.053 XML content here...'
        />
        <Button variant='outline' onClick={handleUseExample}>
          Use example
        </Button>
      </Stack>

      <DialogRoot open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge fake transactions?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            There are existing transactions. Using the example will merge the fake transactions with
            the existing ones. Are you sure you want to merge example transactions in the database?
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger asChild onClick={() => setIsDialogOpen(false)} />
            <Button variant='outline'>Cancel</Button>
            <Button onClick={confirmUseExample}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default XmlInput
