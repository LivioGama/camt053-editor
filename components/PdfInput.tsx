import {
  Badge,
  Box,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import {Children, useCallback, useRef, useState} from 'react'
import {FilePond, registerPlugin} from 'react-filepond'
import {useDocuments} from '@/hooks/useDocuments'
import {calculateMD5} from '@/utils/fileUtils'
import {FaFilePdf} from 'react-icons/fa'
import {Alert} from '@/components/ui/alert'
import {Button} from '@/components/ui/button'
import {CircleCheckIcon, EyeIcon, PlayIcon, TrashIcon} from 'lucide-react'
import {format} from '@/utils/formatter'
import dayjs from 'dayjs'
import pb from '@/utils/pb'

registerPlugin(FilePondPluginFileValidateType)

const PdfInput = () => {
  const pond = useRef<FilePond | null>(null)
  const isProcessing = useRef(false)
  const {uploadFile, analyzeFile, deleteFile, documents} = useDocuments()
  const [currentFileId, setCurrentFileId] = useState<string>()

  const handleFileLoad = useCallback(
    async (files: any[]) => {
      if (!files.length) return
      if (isProcessing.current) return
      isProcessing.current = true

      try {
        const documentMd5Checksums = documents.map(d => d.md5_checksum)
        for (const f of files) {
          const md5 = await calculateMD5(f.file)

          if (documentMd5Checksums.includes(md5)) {
            console.log('File already analyzed, skipping:', f.file.name)
            continue
          }

          const formData = new FormData()
          formData.append('invoice', new Blob([f.file], {type: 'application/pdf'}))
          formData.append('md5_checksum', md5)
          formData.append('original_filename', f.file.name)

          await uploadFile(formData)
        }
        pond.current?.removeFiles()
      } catch (error) {
        console.error('Error processing files:', error)
      } finally {
        isProcessing.current = false
      }
    },
    [documents, uploadFile],
  )

  const onAnalyze = useCallback(
    async fileId => {
      setCurrentFileId(fileId)
      try {
        await analyzeFile(fileId)
      } catch (error) {
        console.error('Error analyzing file:', error)
      } finally {
        setCurrentFileId(undefined)
      }
    },
    [analyzeFile],
  )

  return (
    <Stack gap={8}>
      <Stack flexDirection={{base: 'column', md: 'row'}} gap={5} w='full' alignItems='stretch'>
        <Box flex={1}>
          <FilePond
            ref={pond}
            allowMultiple={true}
            labelIdle='Drag & Drop your PDF invoices or <span class="filepond--label-action">Browse</span>'
            stylePanelLayout='compact'
            styleButtonRemoveItemPosition='right'
            styleButtonProcessItemPosition='right'
            styleLoadIndicatorPosition='right'
            styleProgressIndicatorPosition='right'
            onupdatefiles={handleFileLoad}
            acceptedFileTypes={['application/pdf']}
          />
        </Box>
      </Stack>

      <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} gap={4}>
        {Children.toArray(
          documents.map(file => {
            const isSuccess = file.analysis_result?.isError === false
            const isPending = !Boolean(file.analysis_result)
            const isAnalysisError = !isSuccess
            return (
              <VStack
                p={5}
                gap={3}
                bg='gray.800'
                borderRadius='xl'
                justifyContent='space-between'
                align='center'
                overflow='hidden'
                position='relative'>
                <Box position='relative'>
                  <Icon as={FaFilePdf} boxSize={90} color='red.400' />
                  {!isAnalysisError && (
                    <Icon
                      as={CircleCheckIcon}
                      boxSize={10}
                      fill='green.500'
                      color='white'
                      position='absolute'
                      right={-3}
                      bottom={-3}
                    />
                  )}
                </Box>
                <Box fontSize='sm' maxLines={1} textAlign='center'>
                  {file.original_filename}
                </Box>
                {file.analysis_result &&
                  (isAnalysisError ? (
                    <Alert
                      status='error'
                      title={file.analysis_result.otherInformationInBulk}
                      fontSize='xs'
                    />
                  ) : (
                    <VStack bg='gray.900' borderRadius='md' p={5} w='100%'>
                      <Badge colorPalette='red' size='lg'>
                        {format(file.analysis_result.amount, file.analysis_result.currency)}
                      </Badge>
                      <Badge colorPalette='green'>
                        {dayjs(file.analysis_result.date).format('DD MMM YYYY')}
                      </Badge>
                      <Box maxLines={1} textAlign='center'>
                        {file.analysis_result.issuer}
                      </Box>
                    </VStack>
                  ))}
                <HStack gap={5}>
                  <Button colorPalette='blue' onClick={() => onAnalyze(file.id)} size='sm'>
                    <PlayIcon />
                    {!file.analysis_result ? 'Analyze' : 'Re-analyze'}
                  </Button>
                  <Button
                    variant='outline'
                    borderColor='gray.500'
                    onClick={() => window.open(pb.files.getUrl(file, file.invoice))}
                    size='sm'>
                    <EyeIcon />
                  </Button>
                  {!isPending && isAnalysisError && (
                    <Button colorPalette='red' onClick={() => deleteFile(file.id)} size='sm'>
                      <TrashIcon />
                    </Button>
                  )}
                </HStack>
                {currentFileId === file.id && (
                  <Center
                    position='absolute'
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg='blackAlpha.800'>
                    <Spinner size='sm' />
                  </Center>
                )}
              </VStack>
            )
          }),
        )}
      </SimpleGrid>
    </Stack>
  )
}

export default PdfInput
