<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps<{ html: string }>()

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()

const previewStyle = computed(() => ({
  transform: `scale(${settingsStore.previewZoom})`,
  maxWidth: `${themeStore.themeBase.width || 420}px`,
}))
</script>

<template>
  <section
    class="animate-panel-2 flex flex-col min-h-0 rounded-2xl overflow-hidden bg-bg shadow-none"
    aria-label="微信公众号预览区"
  >
    <div class="flex items-center justify-between gap-3 h-11 px-4 shrink-0 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary border-b border-border-subtle dark:border-border">
      <strong class="text-text-secondary font-semibold">微信预览</strong>
      <span class="text-[10px] text-text-tertiary hidden sm:inline">复制时会包含内联样式</span>
    </div>
    <div class="flex-1 min-h-0 overflow-auto p-6 flex items-start justify-center">
      <article
        class="w-full min-h-[calc(100%-48px)] p-8 pb-10 bg-surface rounded-2xl shadow-md dark:shadow-lg break-words origin-top"
        :style="previewStyle"
        v-html="html"
      />
    </div>
  </section>
</template>
