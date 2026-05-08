<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'
import { useSmartFormat } from '@/composables/useSmartFormat'
import { useShare } from '@/composables/useShare'
import { useClipboard } from '@/composables/useClipboard'
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
  <header class="app-header">
    <div>
      <p class="eyebrow">Markdown to WeChat</p>
      <h1>微信公众号排版渲染工具</h1>
    </div>
    <div class="header-actions">
      <button type="button" class="icon-button" aria-label="设置" @click="ui.toggleSettings">
        ⚙️
      </button>
      <button type="button" class="icon-button" aria-label="草稿管理" @click="ui.openModal('draft')">
        📝
      </button>
      <button type="button" class="icon-button" aria-label="分享" @click="handleShare">
        🔗
      </button>
      <button type="button" class="icon-button" aria-label="深色模式" @click="toggleDark">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
      <button type="button" @click="handleSmartFormat">智能排版</button>
      <button type="button" @click="loadSample">示例</button>
      <button type="button" @click="handleCopy" class="primary">复制到公众号</button>
    </div>
  </header>
</template>
