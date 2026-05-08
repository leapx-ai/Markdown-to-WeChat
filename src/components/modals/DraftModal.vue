<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useDraftStore } from '@/stores/draft'
import { useEditorStore } from '@/stores/editor'

const ui = useUiStore()
const draftStore = useDraftStore()
const editorStore = useEditorStore()

const isOpen = computed(() => ui.activeModals.draft)

function close() {
  ui.closeModal('draft')
}

function createDraft() {
  const name = window.prompt('请输入草稿名称：', `草稿 ${new Date().toLocaleString('zh-CN')}`)
  if (!name) return
  draftStore.addDraft(name, '# 新文档\n\n开始编写内容...')
  ui.showToast('新建草稿成功')
}

function saveCurrentDraft() {
  const name = window.prompt('请输入草稿名称：', `草稿 ${new Date().toLocaleString('zh-CN')}`)
  if (!name) return
  draftStore.addDraft(name, editorStore.content)
  ui.showToast('草稿已保存')
}

function loadDraft(id: number) {
  const draft = draftStore.loadDraft(id)
  if (!draft) return
  editorStore.setContent(draft.content)
  close()
  ui.showToast('草稿已加载')
}

function deleteDraft(id: number) {
  draftStore.deleteDraft(id)
  ui.showToast('草稿已删除')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="close">
        <section class="modal" role="dialog" aria-modal="true" style="min-width: 600px;">
          <div class="flex items-start justify-between gap-4 shrink-0 px-5 pt-5 pb-4">
            <div>
              <p class="text-[11px] font-semibold tracking-widest uppercase text-text-tertiary mb-0.5">草稿管理</p>
              <h2 class="text-lg font-semibold tracking-tight leading-tight">我的草稿</h2>
            </div>
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-text hover:bg-surface-hover text-xl border border-border-subtle hover:border-border bg-transparent transition-all"
              aria-label="关闭"
              @click="close"
            >
              ×
            </button>
          </div>
          <div class="p-4 overflow-y-auto">
            <div class="flex gap-2 mb-4">
              <button type="button" class="w-full h-9 px-3.5 rounded-md text-[13px] font-medium bg-transparent text-text border border-border-subtle hover:border-border hover:bg-surface-hover transition-all" @click="createDraft">新建草稿</button>
              <button type="button" class="w-full h-9 px-3.5 rounded-md text-[13px] font-medium bg-transparent text-text border border-border-subtle hover:border-border hover:bg-surface-hover transition-all" @click="saveCurrentDraft">保存当前草稿</button>
            </div>
            <div class="max-h-[400px] overflow-y-auto border border-border rounded-md">
              <div v-if="!draftStore.drafts.length" class="empty-state">
                <p>暂无草稿</p>
                <button type="button" class="mt-3 h-8 px-4 rounded-md text-[13px] font-medium bg-transparent text-text-secondary border border-border-subtle hover:border-border hover:text-text hover:bg-surface-hover transition-all" @click="createDraft">创建第一个草稿</button>
              </div>
              <div
                v-for="draft in draftStore.drafts"
                :key="draft.id"
                class="flex items-center justify-between gap-3 px-4 py-3 border-b border-border last:border-b-0"
              >
                <div class="flex-1 min-w-0">
                  <div class="font-semibold mb-1 truncate">{{ draft.name }}</div>
                  <div class="text-xs text-text-tertiary">
                    更新于：{{ new Date(draft.updatedAt || draft.createdAt).toLocaleString('zh-CN') }}
                  </div>
                </div>
                <div class="flex gap-2 shrink-0">
                  <button type="button" class="h-7 px-2 rounded-md text-xs font-medium bg-transparent text-text-secondary border border-border-subtle hover:border-border hover:text-text hover:bg-surface-hover transition-all" @click="loadDraft(draft.id)">加载</button>
                  <button type="button" class="h-7 px-2 rounded-md text-xs font-medium bg-transparent text-text-secondary border border-border-subtle hover:border-border hover:text-text hover:bg-surface-hover transition-all" @click="deleteDraft(draft.id)">删除</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
