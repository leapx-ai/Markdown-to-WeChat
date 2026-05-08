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
  <section class="preview-pane" aria-label="微信公众号预览区">
    <div class="pane-title">
      <strong>微信预览</strong>
      <span>复制时会包含内联样式</span>
    </div>
    <div class="phone-frame">
      <article class="wechat-preview" :style="previewStyle" v-html="html" />
    </div>
  </section>
</template>
