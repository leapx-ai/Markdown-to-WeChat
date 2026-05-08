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
          <div class="modal-header">
            <div>
              <p class="eyebrow">草稿管理</p>
              <h2>我的草稿</h2>
            </div>
            <button type="button" class="icon-button" aria-label="关闭" @click="close">×</button>
          </div>
          <div class="modal-body">
            <div class="draft-list-toolbar">
              <button type="button" class="wide-button" @click="createDraft">新建草稿</button>
              <button type="button" class="wide-button" @click="saveCurrentDraft">保存当前草稿</button>
            </div>
            <div class="draft-list-container">
              <div v-if="!draftStore.drafts.length" class="empty-state">
                <p>暂无草稿</p>
                <button type="button" class="empty-state-action" @click="createDraft">创建第一个草稿</button>
              </div>
              <div
                v-for="draft in draftStore.drafts"
                :key="draft.id"
                class="draft-item"
              >
                <div class="draft-item-info">
                  <div class="draft-item-name">{{ draft.name }}</div>
                  <div class="draft-item-meta">
                    更新于：{{ new Date(draft.updatedAt || draft.createdAt).toLocaleString('zh-CN') }}
                  </div>
                </div>
                <div class="draft-item-actions">
                  <button type="button" @click="loadDraft(draft.id)">加载</button>
                  <button type="button" @click="deleteDraft(draft.id)">删除</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
