import {useCamt053} from '@/hooks/useCamt053'
import {Button} from '@chakra-ui/react'
import {saveAs} from 'file-saver'

const DownloadButton = () => {
  const {generateCamt053Xml} = useCamt053()

  const handleDownload = () => {
    const blob = new Blob([generateCamt053Xml()], {type: 'text/xml;charset=utf-8'})
    saveAs(blob, 'modified-camt053.xml')
  }

  return (
    <Button mt={4} colorScheme='blue' onClick={handleDownload}>
      Download Modified CAMT.053
    </Button>
  )
}

export default DownloadButton
