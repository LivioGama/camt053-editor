import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface Store {
  showOnlyCredit: boolean
  setShowOnlyCredit: (value: boolean) => void
  toggleShowOnlyCredit: () => void
  treatedMonths: string[]
  markMonthAsTreated: (month: string) => void
  unmarkMonthAsTreated: (month: string) => void
  projectedRevenue: number
  setProjectedRevenue: (value: number) => void
}

const store = create<Store>()(
  persist(
    set => ({
      showOnlyCredit: false,
      setShowOnlyCredit: (value: boolean) => set({showOnlyCredit: value}),
      toggleShowOnlyCredit: () => set(state => ({showOnlyCredit: !state.showOnlyCredit})),
      treatedMonths: [],
      markMonthAsTreated: (month: string) =>
        set(state => ({
          treatedMonths: [...state.treatedMonths, month],
        })),
      unmarkMonthAsTreated: (month: string) =>
        set(state => ({
          treatedMonths: state.treatedMonths.filter(m => m !== month),
        })),
      projectedRevenue: 0,
      setProjectedRevenue: (value: number) => set({projectedRevenue: value}),
    }),
    {
      name: 'camt053-editor',
    },
  ),
)

export default store
