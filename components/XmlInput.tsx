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
import {Box, Stack} from '@chakra-ui/react'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import isEmpty from 'lodash/isEmpty'
import {useRef, useState} from 'react'
import {FilePond, registerPlugin} from 'react-filepond'

registerPlugin(FilePondPluginFileValidateType)

const XmlInput = () => {
  const {transactions, setXmlContent} = useCamt053()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const pond = useRef<FilePond | null>(null)
  const isProcessing = useRef(false)

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

  const handleFileLoad = async (files: any[]) => {
    if (!files.length) return

    if (isProcessing.current) return
    isProcessing.current = true

    const readFile = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target?.result as string)
        reader.onerror = e => reject(e)
        reader.readAsText(file)
      })

    try {
      for (const f of files) {
        const content = await readFile(f.file)
        content && (await setXmlContent(content))
      }

      pond.current?.removeFiles()
    } catch (error) {
      console.error('Error processing files:', error)
    } finally {
      isProcessing.current = false
    }
  }

  return (
    <>
      <Stack flexDirection={{base: 'column', md: 'row'}} gap={5} w='full' alignItems='stretch'>
        <Box flex={1}>
          <FilePond
            ref={pond}
            allowMultiple={true}
            labelIdle='Drag & Drop your CAMT.053 XML file or <span class="filepond--label-action">Browse</span>'
            stylePanelLayout='compact'
            styleButtonRemoveItemPosition='right'
            styleButtonProcessItemPosition='right'
            styleLoadIndicatorPosition='right'
            styleProgressIndicatorPosition='right'
            onupdatefiles={handleFileLoad}
          />
        </Box>
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
