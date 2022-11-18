import { defineStore } from 'pinia'
import { http } from '../shared/HttpClient'

// const items = ref<Item[]>([])
//     const hasMore = ref(false)
//     const page = ref(0)
type ItemState = {
  items: Item[]
  hasMore: boolean
  page: number
}
type ItemActions = {
  reset: () => void
  _fetch: (first: boolean, startDate?: string, endDate?: string) => void
  fetchItems: (startDate?: string, endDate?: string) => void
  fetchNextPage: (startDate?: string, endDate?: string) => void
}

export const useItemStore = (id: string | string[]) =>
  defineStore<string, ItemState, {}, ItemActions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0,
    }),
    actions: {
      reset() {
        this.items = []
        this.hasMore = false
        this.page = 0
      },
      async _fetch(first, startDate, endDate) {
        if (!startDate || !endDate) {
          return
        }
        const response = await http.get<Resources<Item>>(
          '/items',
          {
            happen_after: startDate,
            happen_before: endDate,
            page: first ? 1 : this.page + 1,
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true,
          },
        )
        const { resources, pager } = response.data
        if (first) {
          this.items = resources
        } else {
          this.items.push(...resources)
        }

        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
      },
      async fetchNextPage(startDate, endDate) {
        this._fetch(false, startDate, endDate)
      },
      async fetchItems(startDate, endDate) {
        this._fetch(true, startDate, endDate)
      },
    },
  })()
