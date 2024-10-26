export interface Transaction {
  id?: string
  date: string
  amount: number
  description: string
  description_clean?: string
  currency: string
  type: 'debit' | 'credit'
}
