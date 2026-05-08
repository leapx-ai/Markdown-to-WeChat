<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useThemeStore } from '@/stores/theme'

const ui = useUiStore()
const themeStore = useThemeStore()

const isOpen = computed(() => ui.activeModals.themeEditor)

const accent = ref('#137565')
const color = ref('#1f2429')
const bg = ref('#ffffff')
const quoteBg = ref('#f5faf8')
const codeBg = ref('#f8fafc')
const borderColor = ref('#e4e8ee')
const headingMode = ref('bar')
const fontSize = ref(16)
const lineHeight = ref(180)
const width = ref(480)

function close() {
  ui.closeModal('themeEditor')
}

function save() {
  themeStore.setCustomTheme({
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    color: color.value,
    accent: accent.value,
    muted: '#68717d',
    border: borderColor.value,
    bgSoft: quoteBg.value,
    quoteBg: quoteBg.value,
    canvas: bg.value !== '#ffffff' ? bg.value : undefined,
    h1Mode: 'panel',
    headingMode: headingMode.value,
    quoteMode: 'soft',
    fontSize: fontSize.value,
    lineHeight: lineHeight.value / 100,
    width: width.value,
  })
  themeStore.currentThemeKey = 'custom'
  close()
}

function reset() {
  themeStore.resetCustomTheme()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="close">
        <section class="modal" role="dialog" aria-modal="true" style="min-width: 700px;">
          <div class="modal-header">
            <div>
              <p class="eyebrow">Theme Builder</p>
              <h2>自定义主题</h2>
            </div>
            <button type="button" class="icon-button" aria-label="关闭" @click="close">×</button>
          </div>
          <div class="theme-editor-body">
            <div>
              <h3>颜色配置</h3>
              <div class="theme-editor-grid">
                <label class="compact-field">
                  <span>主色</span>
                  <input v-model="accent" type="color" />
                </label>
                <label class="compact-field">
                  <span>正文色</span>
                  <input v-model="color" type="color" />
                </label>
                <label class="compact-field">
                  <span>背景色</span>
                  <input v-model="bg" type="color" />
                </label>
                <label class="compact-field">
                  <span>引用色</span>
                  <input v-model="quoteBg" type="color" />
                </label>
                <label class="compact-field">
                  <span>代码块背景</span>
                  <input v-model="codeBg" type="color" />
                </label>
                <label class="compact-field">
                  <span>边框色</span>
                  <input v-model="borderColor" type="color" />
                </label>
              </div>
              <h3>样式配置</h3>
              <div class="theme-editor-grid">
                <label class="compact-field">
                  <span>标题样式</span>
                  <select v-model="headingMode">
                    <option value="bar">侧边线</option>
                    <option value="chip">标签</option>
                    <option value="plain">下划线</option>
                    <option value="none">无样式</option>
                  </select>
                </label>
                <label class="compact-field">
                  <span>正文字号</span>
                  <input v-model="fontSize" type="range" min="14" max="20" />
                  <span class="theme-editor-value">{{ fontSize }}px</span>
                </label>
                <label class="compact-field">
                  <span>行高</span>
                  <input v-model="lineHeight" type="range" min="150" max="220" />
                  <span class="theme-editor-value">{{ (lineHeight / 100).toFixed(2) }}</span>
                </label>
                <label class="compact-field">
                  <span>内容宽度</span>
                  <input v-model="width" type="range" min="360" max="600" />
                  <span class="theme-editor-value">{{ width }}px</span>
                </label>
              </div>
            </div>
            <div>
              <h3>实时预览</h3>
              <div
                id="themePreview"
                :style="{
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '24px',
                  height: '500px',
                  overflowY: 'auto',
                  background: bg,
                }"
              >
                <h1 :style="{ margin: '0 0 16px', color: color }">标题示例</h1>
                <p :style="{ margin: '0 0 12px', lineHeight: '1.8', color: color, fontSize: `${fontSize}px` }">
                  这是正文内容示例，支持自定义字体大小和行高设置。
                </p>
                <blockquote
                  :style="{
                    margin: '16px 0',
                    padding: '12px 16px',
                    background: quoteBg,
                    borderLeft: `4px solid ${accent}`,
                    color: color,
                  }"
                >
                  这是引用块示例，使用主色作为左侧边框。
                </blockquote>
                <pre
                  :style="{
                    margin: '16px 0',
                    padding: '16px',
                    background: codeBg,
                    borderRadius: '8px',
                    overflowX: 'auto',
                  }"
                >
                  <code>function hello() {
  console.log('Hello World!')
}</code>
                </pre>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="reset">重置</button>
            <button type="button" @click="save" class="primary">保存并使用</button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
