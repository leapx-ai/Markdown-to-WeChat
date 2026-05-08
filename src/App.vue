<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'
import { useUiStore } from '@/stores/ui'
import { renderMarkdown } from '@/utils/markdownRenderer'
import { useMarkdownAnalyzer } from '@/composables/useMarkdownAnalyzer'
import { useMarkdownWarnings } from '@/composables/useMarkdownWarnings'
import { useClipboard } from '@/composables/useClipboard'
import { useSmartFormat } from '@/composables/useSmartFormat'
import { useExport } from '@/composables/useExport'
import { sampleMarkdown } from '@/config/templates'
import AppHeader from '@/components/AppHeader.vue'
import EditorPane from '@/components/EditorPane.vue'
import PreviewPane from '@/components/PreviewPane.vue'
import InspectorPane from '@/components/InspectorPane.vue'
import PreflightModal from '@/components/modals/PreflightModal.vue'
import ThemeEditorModal from '@/components/modals/ThemeEditorModal.vue'

const editorStore = useEditorStore()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const ui = useUiStore()
const { copyRenderedHtml } = useClipboard()
const { formatMarkdown } = useSmartFormat()
const { exportHtml } = useExport()

const content = computed({
  get: () => editorStore.content,
  set: (v) => editorStore.setContent(v),
})

const { stats } = useMarkdownAnalyzer(content)
const { warnings, preflightCounts } = useMarkdownWarnings(content)

const renderedHtml = computed(() => {
  return renderMarkdown(
    content.value,
    themeStore.themeBase,
    themeStore.currentCodeTheme,
    settingsStore.wechatElements,
  )
})

function loadSample() {
  editorStore.setContent(sampleMarkdown)
  ui.showToast('已加载示例内容')
}

function handleExport() {
  const html = renderMarkdown(editorStore.content, themeStore.themeBase, themeStore.currentCodeTheme, settingsStore.wechatElements)
  exportHtml(html)
  ui.showToast('HTML 已导出')
}

watch(() => content.value, (v, oldV) => {
  if (oldV === '' && v.length > 0) {
    const formatted = formatMarkdown(v)
    if (formatted !== v) {
      editorStore.setContent(formatted)
    }
  }
})

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (ui.activeModals.preflight) { ui.closeModal('preflight'); return }
      if (ui.activeModals.themeEditor) { ui.closeModal('themeEditor'); return }
      if (ui.showSettings) { ui.showSettings = false; return }
      return
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      const hasBlocking = warnings.value.some(w => w.level === 'danger')
      if (hasBlocking) {
        ui.openModal('preflight')
      } else {
        copyRenderedHtml(renderedHtml.value)
      }
    }
  })
})
</script>

<template>
  <AppHeader :rendered-html="renderedHtml" :warnings="warnings" :stats="stats" @export-html="handleExport" />
  <!-- Overlay to close assistant panel on outside click -->
  <div
    v-show="ui.showSettings"
    class="fixed inset-0 z-[35]"
    @click="ui.showSettings = false"
  />
  <InspectorPane
    v-show="ui.showSettings"
    :stats="stats"
    :warnings="warnings"
    class="fixed right-4 top-[72px] z-40 w-[280px] shadow-xl"
    style="max-height: calc(100dvh - 80px);"
  />
  <main
    class="grid gap-4 p-4 min-h-0 grid-cols-[minmax(320px,1fr)_minmax(360px,520px)]"
    style="height: calc(100dvh - 64px)"
  >
    <EditorPane v-model="content" @load-sample="loadSample" />
    <PreviewPane :html="renderedHtml" />
  </main>

  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="fixed bottom-5 right-5 z-[1000] flex flex-col gap-2">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="px-5 py-3 rounded-md bg-surface shadow-xl text-sm font-medium max-w-[360px] leading-relaxed"
        :class="toast.type === 'success' ? 'text-success' : 'text-danger'"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </Teleport>

  <PreflightModal :warnings="warnings" :counts="preflightCounts" :html="renderedHtml" />
  <ThemeEditorModal />

</template>
