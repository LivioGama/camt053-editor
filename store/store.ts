import {observable} from '@legendapp/state'
import {configureObservableSync, syncObservable} from '@legendapp/state/sync'
import {ObservablePersistLocalStorage} from '@legendapp/state/persist-plugins/local-storage'

configureObservableSync({persist: {plugin: ObservablePersistLocalStorage}})

const showOnlyCredit = observable<boolean>(false)
const treatedMonths = observable<string[]>([])
const projectedRevenue = observable<number>(0)
const limitToYear = observable<boolean>(false)

const Store = {
  showOnlyCredit,
  treatedMonths,
  projectedRevenue,
  limitToYear,
}

syncObservable(showOnlyCredit, {persist: {name: 'showOnlyCredit'}})
syncObservable(treatedMonths, {persist: {name: 'treatedMonths'}})
syncObservable(projectedRevenue, {persist: {name: 'projectedRevenue'}})
syncObservable(limitToYear, {persist: {name: 'limitToYear'}})

export default Store
