import PocketBase from 'pocketbase'

export const PB_URL = 'http://127.0.0.1:8090'
const pb = new PocketBase(PB_URL)

pb.autoCancellation(false)

export default pb
