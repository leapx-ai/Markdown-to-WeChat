import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { ImageSettings } from '@/types'

const IMAGE_SETTINGS_KEY = 'wechat-md-image-settings'
const PREVIEW_ZOOM_KEY = 'wechat-md-preview-zoom'
const CUSTOM_TEMPLATES_KEY = 'wechat-md-custom-templates'

export const useSettingsStore = defineStore('settings', () => {
  const imageSettings = useStorage<ImageSettings>(IMAGE_SETTINGS_KEY, {
    width: '100%',
    radius: 6,
    caption: true,
  })

  const previewZoom = useStorage(PREVIEW_ZOOM_KEY, '1')
  const customTemplates = useStorage<Record<string, { name: string; content: string }>>(CUSTOM_TEMPLATES_KEY, {})

  const isFocusPreview = ref(false)

  const updateImageSettings = (settings: Partial<ImageSettings>) => {
    imageSettings.value = { ...imageSettings.value, ...settings }
  }

  const addCustomTemplate = (key: string, name: string, content: string) => {
    customTemplates.value = {
      ...customTemplates.value,
      [key]: { name, content },
    }
  }

  return {
    imageSettings: computed(() => imageSettings.value),
    previewZoom: computed(() => previewZoom.value),
    customTemplates: computed(() => customTemplates.value),
    isFocusPreview,
    updateImageSettings,
    addCustomTemplate,
  }
})
