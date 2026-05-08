<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { useEditorStore } from '@/stores/editor'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string]; loadSample: [] }>()

const editorHost = ref<HTMLDivElement>()
const editorStore = useEditorStore()
let view: EditorView | null = null

const saveLabel = ref('已自动保存')
const saveVisible = ref(false)
let saveTimer: ReturnType<typeof setTimeout> | null = null
let fadeTimer: ReturnType<typeof setTimeout> | null = null

function showSaveState(label: string) {
  saveLabel.value = label
  saveVisible.value = true
  if (saveTimer) clearTimeout(saveTimer)
  if (fadeTimer) clearTimeout(fadeTimer)
  saveTimer = setTimeout(() => {
    saveLabel.value = '已保存'
    fadeTimer = setTimeout(() => {
      saveVisible.value = false
    }, 2000)
  }, 600)
}

onMounted(() => {
  if (!editorHost.value) return
  view = new EditorView({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      markdown(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString())
          showSaveState('保存中...')
        }
      }),
    ],
    parent: editorHost.value,
  })
  editorStore.editorView = view as unknown
})

watch(() => props.modelValue, (v) => {
  if (view && v !== view.state.doc.toString()) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: v },
    })
  }
})
</script>

<template>
  <section class="animate-panel-1 flex flex-col min-h-0 rounded-2xl bg-surface shadow-sm overflow-hidden dark:border dark:border-border" aria-label="Markdown 编辑区">
    <div class="flex items-center justify-between gap-3 h-11 px-4 shrink-0 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary border-b border-border-subtle dark:border-border">
      <strong class="text-text-secondary font-semibold">Markdown</strong>
      <Transition name="fade">
        <span v-show="saveVisible" class="inline-flex items-center gap-1.5">
          <AppIcon v-if="saveLabel === '保存中...'" name="save" :size="12" />
          <AppIcon v-else name="checkCircle" :size="12" />
          {{ saveLabel }}
        </span>
      </Transition>
    </div>
    <div class="flex-1 min-h-0 relative overflow-hidden">
      <div ref="editorHost" class="absolute inset-0 font-mono text-sm leading-relaxed"></div>
      <Transition name="fade">
        <div
          v-if="!modelValue"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-text-tertiary select-none cursor-pointer"
          @click="emit('loadSample')"
        >
          <AppIcon name="fileText" :size="32" class="opacity-40" />
          <div class="text-center">
            <p class="text-[13px] font-medium text-text-secondary mb-1">粘贴 Markdown 内容开始排版</p>
            <p class="text-xs">或点击查看示例</p>
          </div>
        </div>
      </Transition>
    </div>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
