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
  <aside class="inspector" aria-label="兼容性提示">
    <div class="pane-title">
      <strong>创作助手</strong>
    </div>
    <div class="inspector-content">
      <div class="stats-grid">
        <div v-for="item in statsData" :key="item.label" class="stat-card">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="side-section">
        <h2>质量检查</h2>
        <div class="warnings">
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

      <div class="side-section">
        <h2>主题速览</h2>
        <div class="theme-cards">
          <button
            v-for="[key, theme] in themeList"
            :key="key"
            class="theme-card"
            :class="{ active: themeStore.currentThemeKey === key }"
            type="button"
            @click="selectTheme(key)"
          >
            <span class="theme-swatch" :style="{ background: theme.base.canvas || theme.base.bgSoft }">
              <span class="theme-swatch-line" :style="{ background: theme.base.accent }" />
              <span class="theme-swatch-line" :style="{ width: '18px', background: theme.base.border }" />
            </span>
            <span>
              <strong>{{ theme.name }}</strong>
              <span>{{ theme.description }}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="side-section">
        <h2>自定义主题</h2>
        <button type="button" class="wide-button" @click="openThemeEditor">
          编辑我的主题
        </button>
      </div>

      <div class="side-section">
        <h2>图片设置</h2>
        <label class="compact-field">
          <span>图片宽度</span>
          <select
            :value="settingsStore.imageSettings.width"
            @change="e => updateImageSetting('width', (e.target as HTMLSelectElement).value)"
          >
            <option value="100%">100%</option>
            <option value="92%">92%</option>
            <option value="80%">80%</option>
          </select>
        </label>
        <label class="compact-field">
          <span>圆角</span>
          <input
            type="range"
            min="0"
            max="16"
            :value="settingsStore.imageSettings.radius"
            @input="e => updateImageSetting('radius', Number((e.target as HTMLInputElement).value))"
          />
        </label>
        <label class="check-field">
          <input
            type="checkbox"
            :checked="settingsStore.imageSettings.caption"
            @change="e => updateImageSetting('caption', (e.target as HTMLInputElement).checked)"
          />
          <span>使用 alt 文本生成图注</span>
        </label>
      </div>

      <div class="side-section">
        <h2>预览布局</h2>
        <label class="compact-field">
          <span>缩放</span>
          <select v-model="settingsStore.previewZoom">
            <option value="0.86">86%</option>
            <option value="1">100%</option>
            <option value="1.12">112%</option>
          </select>
        </label>
        <button type="button" class="wide-button" @click="toggleFocus">
          {{ settingsStore.isFocusPreview ? '退出专注' : '专注预览' }}
        </button>
      </div>
    </div>
  </aside>
</template>
