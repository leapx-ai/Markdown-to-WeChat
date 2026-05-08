<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useClipboard } from '@/composables/useClipboard'
import type { WarningItem, PreflightCounts } from '@/types'

const props = defineProps<{
  warnings: WarningItem[]
  counts: PreflightCounts
  html: string
}>()

const ui = useUiStore()
const { copyRenderedHtml } = useClipboard()

const isOpen = computed(() => ui.activeModals.preflight)

function close() {
  ui.closeModal('preflight')
}

async function confirmCopy() {
  close()
  await copyRenderedHtml(props.html)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="close">
        <section class="modal" role="dialog" aria-modal="true">
          <div class="modal-header">
            <div>
              <p class="eyebrow">Preflight</p>
              <h2>复制前预检</h2>
            </div>
            <button type="button" class="icon-button" aria-label="关闭" @click="close">×</button>
          </div>
          <div class="preflight-summary">
            <div class="preflight-pill">
              <strong>{{ counts.danger }}</strong>
              <span>严重</span>
            </div>
            <div class="preflight-pill">
              <strong>{{ counts.warn }}</strong>
              <span>提醒</span>
            </div>
            <div class="preflight-pill">
              <strong>{{ counts.info }}</strong>
              <span>信息</span>
            </div>
          </div>
          <div class="preflight-list">
            <div
              v-for="(w, i) in warnings"
              :key="i"
              class="warning"
              :class="w.level"
            >
              {{ w.text }}
            </div>
            <div v-if="!warnings.length" class="empty-state">
              <p>预检通过，当前内容没有明显的公众号兼容性风险</p>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="close">取消</button>
            <button type="button" class="primary" @click="confirmCopy">
              {{ counts.danger ? '仍然复制' : '继续复制' }}
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
