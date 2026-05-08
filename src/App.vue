<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useThemeStore } from '@/stores/theme'
import { useSettingsStore } from '@/stores/settings'
import { useUiStore } from '@/stores/ui'
import { renderMarkdown } from '@/utils/markdownRenderer'
import { useMarkdownAnalyzer } from '@/composables/useMarkdownAnalyzer'
import { useMarkdownWarnings } from '@/composables/useMarkdownWarnings'
import AppHeader from '@/components/AppHeader.vue'
import EditorPane from '@/components/EditorPane.vue'
import PreviewPane from '@/components/PreviewPane.vue'
import InspectorPane from '@/components/InspectorPane.vue'
import DraftModal from '@/components/modals/DraftModal.vue'
import PreflightModal from '@/components/modals/PreflightModal.vue'
import ThemeEditorModal from '@/components/modals/ThemeEditorModal.vue'
import ShortcutModal from '@/components/modals/ShortcutModal.vue'

const editorStore = useEditorStore()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const ui = useUiStore()

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
  )
})

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (ui.activeModals.shortcut) { ui.closeModal('shortcut'); return }
      if (ui.activeModals.preflight) { ui.closeModal('preflight'); return }
      if (ui.activeModals.themeEditor) { ui.closeModal('themeEditor'); return }
      if (ui.activeModals.draft) { ui.closeModal('draft'); return }
      return
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault()
      editorStore.saveDraft()
      ui.showToast('已保存')
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      ui.openModal('preflight')
    }
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault()
      ui.openModal('shortcut')
    }
  })
})
</script>

<template>
  <AppHeader />
  <main class="workspace" :class="{ 'focus-preview': settingsStore.isFocusPreview }">
    <EditorPane v-model="content" />
    <PreviewPane :html="renderedHtml" />
    <InspectorPane :stats="stats" :warnings="warnings" />
  </main>

  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast-${toast.type}`"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </Teleport>

  <DraftModal />
  <PreflightModal :warnings="warnings" :counts="preflightCounts" :html="renderedHtml" />
  <ThemeEditorModal />
  <ShortcutModal />
</template>

<style>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
