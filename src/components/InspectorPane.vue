<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'
import { useSettingsStore } from '@/stores/settings'
import type { MarkdownStats, WarningItem } from '@/types'

const props = defineProps<{
  stats: MarkdownStats
  warnings: WarningItem[]
}>()

const themeStore = useThemeStore()
const ui = useUiStore()
const settingsStore = useSettingsStore()

const statsData = computed(() => [
  { label: '字数', value: props.stats.wordCount },
  { label: '阅读', value: `${props.stats.readingMinutes} 分钟` },
  { label: '标题', value: props.stats.headings },
  { label: '图片', value: props.stats.images },
])

const themeList = computed(() => Object.entries(themeStore.allThemes))

function selectTheme(key: string) {
  themeStore.currentThemeKey = key
}

function openThemeEditor() {
  ui.openModal('themeEditor')
}

function updateImageSetting(key: 'width' | 'radius' | 'caption', value: unknown) {
  settingsStore.updateImageSettings({ [key]: value })
}

function toggleFocus() {
  settingsStore.isFocusPreview = !settingsStore.isFocusPreview
}
</script>

<template>
  <aside
    class="animate-panel-3 flex flex-col min-h-0 rounded-2xl bg-surface shadow-sm overflow-hidden dark:border dark:border-border"
    aria-label="兼容性提示"
  >
    <div class="flex items-center justify-between gap-3 h-11 px-4 shrink-0 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary border-b border-border-subtle dark:border-border sticky top-0 z-[2] bg-surface">
      <strong class="text-text-secondary font-semibold">创作助手</strong>
    </div>
    <div class="flex-1 overflow-y-auto px-4 pb-5">
      <div class="grid grid-cols-2 gap-4 py-5 border-b border-border-subtle dark:border-border">
        <div v-for="item in statsData" :key="item.label">
          <strong class="block text-[22px] font-semibold tabular-nums tracking-tight leading-tight text-text">{{ item.value }}</strong>
          <span class="block mt-1 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">{{ item.label }}</span>
        </div>
      </div>

      <div class="pt-5">
        <h2 class="mb-3 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">质量检查</h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="(w, i) in warnings"
            :key="i"
            class="warning"
            :class="w.level"
          >
            {{ w.text }}
          </div>
          <div v-if="!warnings.length" class="empty-state">
            <p>当前内容没有明显的公众号兼容性风险</p>
          </div>
        </div>
      </div>

      <div class="pt-5 mt-5 border-t border-border-subtle dark:border-border">
        <h2 class="mb-3 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">主题速览</h2>
        <div class="flex flex-col gap-2 max-h-80 overflow-y-auto">
          <button
            v-for="[key, theme] in themeList"
            :key="key"
            class="flex items-center gap-3 w-full p-2.5 rounded-md text-left bg-transparent hover:bg-surface-hover transition-colors cursor-pointer border-none"
            :class="{ 'bg-surface-hover shadow-[inset_0_0_0_1.5px_var(--color-border)]': themeStore.currentThemeKey === key }"
            type="button"
            @click="selectTheme(key)"
          >
            <span
              class="w-9 h-9 rounded-md border border-border-subtle shrink-0 grid place-items-center overflow-hidden"
              :style="{ background: theme.base.canvas || theme.base.bgSoft }"
            >
              <span class="block w-5 h-[2.5px] rounded-full" :style="{ background: theme.base.accent }" />
              <span class="block w-[18px] h-[2.5px] rounded-full" :style="{ background: theme.base.border }" />
            </span>
            <span>
              <strong class="block text-[13px] font-medium leading-tight text-text">{{ theme.name }}</strong>
              <span class="block mt-0.5 text-xs leading-snug text-text-tertiary">{{ theme.description }}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="pt-5 mt-5 border-t border-border-subtle dark:border-border">
        <h2 class="mb-3 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">自定义主题</h2>
        <button
          type="button"
          class="w-full h-9 px-3.5 rounded-md text-[13px] font-medium hover:bg-surface-hover bg-transparent border-none"
          @click="openThemeEditor"
        >
          编辑我的主题
        </button>
      </div>

      <div class="pt-5 mt-5 border-t border-border-subtle dark:border-border">
        <h2 class="mb-3 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">图片设置</h2>
        <label class="grid gap-1.5 mb-3">
          <span class="text-xs font-medium text-text-secondary">图片宽度</span>
          <select
            :value="settingsStore.imageSettings.width"
            @change="e => updateImageSetting('width', (e.target as HTMLSelectElement).value)"
          >
            <option value="100%">100%</option>
            <option value="92%">92%</option>
            <option value="80%">80%</option>
          </select>
        </label>
        <label class="grid gap-1.5 mb-3">
          <span class="text-xs font-medium text-text-secondary">圆角</span>
          <input
            type="range"
            min="0"
            max="16"
            :value="settingsStore.imageSettings.radius"
            @input="e => updateImageSetting('radius', Number((e.target as HTMLInputElement).value))"
          />
        </label>
        <label class="flex items-center gap-2.5 text-[13px] text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            :checked="settingsStore.imageSettings.caption"
            @change="e => updateImageSetting('caption', (e.target as HTMLInputElement).checked)"
          />
          <span>使用 alt 文本生成图注</span>
        </label>
      </div>

      <div class="pt-5 mt-5 border-t border-border-subtle dark:border-border">
        <h2 class="mb-3 text-[11px] font-semibold tracking-widest uppercase text-text-tertiary">预览布局</h2>
        <label class="grid gap-1.5 mb-3">
          <span class="text-xs font-medium text-text-secondary">缩放</span>
          <select v-model="settingsStore.previewZoom">
            <option :value="0.86">86%</option>
            <option :value="1">100%</option>
            <option :value="1.12">112%</option>
          </select>
        </label>
        <button
          type="button"
          class="w-full h-9 px-3.5 rounded-md text-[13px] font-medium hover:bg-surface-hover bg-transparent border-none"
          @click="toggleFocus"
        >
          {{ settingsStore.isFocusPreview ? '退出专注' : '专注预览' }}
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  flex-shrink: 0;
}

input[type="checkbox"]:checked {
  background: var(--color-accent);
  border-color: var(--color-accent);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
