<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const isOpen = computed(() => ui.activeModals.shortcut)

function close() {
  ui.closeModal('shortcut')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="close">
        <section class="modal" role="dialog" aria-modal="true" style="min-width: 520px;">
          <div class="modal-header">
            <div>
              <p class="eyebrow">Shortcuts</p>
              <h2>快捷键</h2>
            </div>
            <button type="button" class="icon-button" aria-label="关闭" @click="close">×</button>
          </div>
          <div class="shortcut-grid">
            <div class="shortcut-item"><span>保存</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>S</kbd></span></div>
            <div class="shortcut-item"><span>复制到公众号</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd></span></div>
            <div class="shortcut-item"><span>加粗</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd></span></div>
            <div class="shortcut-item"><span>斜体</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>I</kbd></span></div>
            <div class="shortcut-item"><span>插入链接</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd></span></div>
            <div class="shortcut-item"><span>插入图片</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd></span></div>
            <div class="shortcut-item"><span>导出</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>E</kbd></span></div>
            <div class="shortcut-item"><span>显示快捷键</span><span class="shortcut-key"><kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>/</kbd></span></div>
          </div>
          <div class="modal-actions">
            <button type="button" class="primary" @click="close">知道了</button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
