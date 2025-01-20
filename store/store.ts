import {observable} from '@legendapp/state'
import {configureObservableSync, syncObservable} from '@legendapp/state/sync'
import {ObservablePersistLocalStorage} from '@legendapp/state/persist-plugins/local-storage'

configureObservableSync({persist: {plugin: ObservablePersistLocalStorage}})

const showOnlyCredit = observable<boolean>(false)
const treatedMonths = observable<string[]>([])
const projectedRevenue = observable<number>(0)
const limitToYear = observable<boolean>(false)
const lastSelectedTab = observable<'xml' | 'pdf'>('xml')
const showOnlyProExpenses = observable<boolean>(false)
const showOnlyPersoExpenses = observable<boolean>(false)

const Store = {
  showOnlyCredit,
  treatedMonths,
  projectedRevenue,
  limitToYear,
  lastSelectedTab,
  showOnlyProExpenses,
  showOnlyPersoExpenses,
}

syncObservable(showOnlyCredit, {persist: {name: 'showOnlyCredit'}})
syncObservable(treatedMonths, {persist: {name: 'treatedMonths'}})
syncObservable(projectedRevenue, {persist: {name: 'projectedRevenue'}})
syncObservable(limitToYear, {persist: {name: 'limitToYear'}})
syncObservable(lastSelectedTab, {persist: {name: 'lastSelectedTab'}})
syncObservable(showOnlyProExpenses, {persist: {name: 'showOnlyProExpenses'}})
syncObservable(showOnlyPersoExpenses, {persist: {name: 'showOnlyPersoExpenses'}})

export default Store
