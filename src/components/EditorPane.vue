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
  <section class="editor-pane" aria-label="Markdown 编辑区">
    <div class="pane-title">
      <strong>Markdown</strong>
      <span>已自动保存</span>
    </div>
    <div ref="editorHost" id="markdownEditor"></div>
  </section>
</template>

<style scoped>
#markdownEditor {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

#markdownEditor :deep(.cm-editor) {
  height: 100%;
  background: var(--surface);
}

#markdownEditor :deep(.cm-scroller) {
  padding: 20px;
}

#markdownEditor :deep(.cm-gutters) {
  border-right: 1px solid var(--border-subtle);
  background: var(--surface);
}

#markdownEditor :deep(.cm-lineNumbers) {
  color: var(--text-tertiary);
  font-size: 12px;
}
</style>
