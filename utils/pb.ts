import {isDev} from '@/utils/consts'
import PocketBase from 'pocketbase'

export const PB_URL = isDev
  ? process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8090'
  : 'https://pocketbase-camt053-editor.liviogama.com'
const pb = new PocketBase(PB_URL)

pb.autoCancellation(false)

export default pb
