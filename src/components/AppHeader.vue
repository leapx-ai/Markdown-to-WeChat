<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'
import { useSmartFormat } from '@/composables/useSmartFormat'
import { useShare } from '@/composables/useShare'
import { sampleMarkdown } from '@/config/templates'

const editorStore = useEditorStore()
const themeStore = useThemeStore()
const ui = useUiStore()
const { formatMarkdown } = useSmartFormat()
const { createShareLink } = useShare()

const isDark = computed(() => themeStore.isDark)

function toggleDark() {
  themeStore.toggleDarkMode()
}

function handleSmartFormat() {
  const original = editorStore.content
  const formatted = formatMarkdown(original)
  if (formatted === original) return
  editorStore.setContent(formatted)
  ui.showToast('智能排版完成')
}

function loadSample() {
  editorStore.setContent(sampleMarkdown)
  ui.showToast('已加载示例内容')
}

async function handleShare() {
  const link = await createShareLink(editorStore.content)
  if (!link) return
  try {
    await navigator.clipboard.writeText(link)
    ui.showToast('分享链接已复制')
  } catch {
    window.prompt('分享链接已生成，请复制：', link)
  }
}

function handleCopy() {
  ui.openModal('preflight')
}
</script>

<template>
  <header class="flex items-center justify-between gap-4 h-16 px-5 sticky top-0 z-50 backdrop-blur-xl bg-white/72 dark:bg-[#09090b]/72 border-b border-border-subtle">
    <div>
      <p class="text-[11px] font-semibold tracking-widest uppercase text-text-tertiary mb-0.5">Markdown to WeChat</p>
      <h1 class="text-lg font-semibold tracking-tight leading-tight">微信公众号排版渲染工具</h1>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" class="w-9 h-9 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text text-base" aria-label="设置" @click="ui.toggleSettings">⚙️</button>
      <button type="button" class="w-9 h-9 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text text-base" aria-label="草稿管理" @click="ui.openModal('draft')">📝</button>
      <button type="button" class="w-9 h-9 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text text-base" aria-label="分享" @click="handleShare">🔗</button>
      <button type="button" class="w-9 h-9 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text text-base" aria-label="深色模式" @click="toggleDark">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
      <button type="button" class="h-9 px-3.5 rounded-md text-[13px] font-medium hover:bg-surface-hover" @click="handleSmartFormat">
        智能排版
      </button>
      <button type="button" class="h-9 px-3.5 rounded-md text-[13px] font-medium hover:bg-surface-hover" @click="loadSample">
        示例
      </button>
      <button type="button" class="h-9 px-3.5 rounded-md text-[13px] font-medium bg-accent text-accent-contrast hover:bg-accent-hover" @click="handleCopy">
        复制到公众号
      </button>
    </div>
  </header>
</template>

