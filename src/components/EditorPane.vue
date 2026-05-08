<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { Compartment } from '@codemirror/state'
import { useThemeStore } from '@/stores/theme'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editorHost = ref<HTMLDivElement>()
const themeStore = useThemeStore()
let view: EditorView | null = null
const themeCompartment = new Compartment()

function getThemeExtension() {
  return themeStore.isDark ? oneDark : []
}

onMounted(() => {
  if (!editorHost.value) return
  view = new EditorView({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      markdown(),
      themeCompartment.of(getThemeExtension()),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString())
        }
      }),
    ],
    parent: editorHost.value,
  })
})

watch(() => props.modelValue, (v) => {
  if (view && v !== view.state.doc.toString()) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: v },
    })
  }
})

watch(() => themeStore.isDark, () => {
  if (!view) return
  view.dispatch({
    effects: themeCompartment.reconfigure(getThemeExtension()),
  })
})
</script>

<template>
  <section class="animate-panel-1 flex flex-col min-h-0 rounded-2xl bg-surface shadow-sm overflow-hidden dark:border dark:border-border" aria-label="Markdown 编辑区">
    <div class="flex items-center justify-between gap-3 h-11 px-4 shrink-0 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary border-b border-border-subtle dark:border-border">
      <strong class="text-text-secondary font-semibold">Markdown</strong>
      <span>已自动保存</span>
    </div>
    <div ref="editorHost" class="flex-1 min-h-0 overflow-hidden font-mono text-sm leading-relaxed"></div>
  </section>
</template>

<style scoped>
div :deep(.cm-editor) {
  height: 100%;
  background: var(--color-surface);
}
div :deep(.cm-scroller) {
  padding: 20px;
}
div :deep(.cm-gutters) {
  border-right: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
}
div :deep(.cm-lineNumbers) {
  color: var(--color-text-tertiary);
  font-size: 12px;
}
</style>
