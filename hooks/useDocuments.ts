import pb from '@/utils/pb'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import {useEffect} from 'react'

export const useDocuments = () => {
  const queryClient = useQueryClient()

  const {data: documents = []} = useQuery({
    queryKey: ['documents'],
    queryFn: () => pb.collection('analyzed_files').getFullList({}),
  })

  useEffect(() => {
    const subscription = pb
      .collection('analyzed_files')
      .subscribe('*', () => queryClient.invalidateQueries({queryKey: ['documents']}))

    return () => {
      subscription.then(unsub => unsub())
    }
  }, [queryClient])

  const {mutateAsync: uploadFile} = useMutation({
    mutationFn: (fileData: FormData) => pb.collection('analyzed_files').create(fileData),
  })

  const {mutateAsync: analyzeFile} = useMutation({
    mutationFn: (fileId: string) => axios.post('/api/process-pdf', {fileId}),
  })

  const {mutateAsync: deleteFile} = useMutation({
    mutationFn: (fileId: string) => pb.collection('analyzed_files').delete(fileId),
  })

  return {
    documents,
    uploadFile,
    analyzeFile,
    deleteFile,
  }
}
