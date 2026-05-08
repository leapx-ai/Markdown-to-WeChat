import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Draft } from '@/types'

const DRAFTS_KEY = 'wechat-md-drafts'

export const useDraftStore = defineStore('draft', () => {
  const drafts = useStorage<Draft[]>(DRAFTS_KEY, [])

  const addDraft = (name: string, content: string): Draft => {
    const draft: Draft = {
      id: Date.now(),
      name,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    drafts.value = [draft, ...drafts.value]
    return draft
  }

  const deleteDraft = (id: number) => {
    drafts.value = drafts.value.filter((d) => d.id !== id)
  }

  const loadDraft = (id: number): Draft | undefined => {
    return drafts.value.find((d) => d.id === id)
  }

  return {
    drafts,
    addDraft,
    deleteDraft,
    loadDraft,
  }
})
