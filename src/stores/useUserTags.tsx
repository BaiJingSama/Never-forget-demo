import { defineStore } from 'pinia'
import { computed } from 'vue'

type UserState = {
  ItemKind: string
  ChartsKind: string
}

type UserActions = {
  ItemKindChange: (kind: 'expenses' | 'kind') => void
  ChartsKindChange: (kind: 'expenses' | 'kind') => void
}

export const useUserTags = defineStore<string, UserState, {}, UserActions>('User', {
  state: () => ({
    ItemKind: 'expenses',
    ChartsKind: 'expenses',
  }),
  actions: {
    ItemKindChange(kind) {
      this.ItemKind = kind
      localStorage.setItem('ItemKind', kind)
    },
    ChartsKindChange(kind) {
      this.ChartsKind = kind
      localStorage.setItem('ChartsKind', kind)
    },
  },
})
