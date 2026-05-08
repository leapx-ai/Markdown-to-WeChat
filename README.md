# Markdown to WeChat

微信公众号排版渲染工具。将 Markdown 实时转换为带**内联样式**的 HTML，复制后可直接粘贴到公众号后台，完整保留排版效果。

## 核心特性

- **Markdown 实时渲染** — 左侧编辑，右侧即时预览
- **内联样式输出** — 微信公众号编辑器会清洗外部 CSS，因此所有样式直接写入元素 `style` 属性，确保粘贴后样式不丢失
- **6 套内置主题** + **自定义主题编辑器** — 支持调整主色、字号、行高、标题样式、引用块样式等
- **3 种代码高亮风格** — 浅色 / 深色 / 纸张
- **质量检查面板** — 自动检测本地图片、空链接、标题层级、代码块完整性等兼容性问题，支持一键定位
- **智能排版** — 自动优化 CJK 与西文/数字间距、替换标点符号、规范列表格式
- **外链脚注化** — 正文中的链接自动转为上标脚注，文末统一列出参考链接
- **一键复制富文本** — 以 `text/html` 格式写入剪贴板，公众号编辑器直接粘贴即可

## 技术栈

- Vue 3 (Composition API, `<script setup>`)
- Vite + TypeScript
- Pinia + `@vueuse/core` (状态管理与持久化)
- CodeMirror 6 (Markdown 编辑器)
- Tailwind CSS v4 (应用界面样式)

## 快速开始

```bash
# 安装依赖
npm install

# 开发服务
npm run dev

# 类型检查
npm run type-check

# 构建（输出到 docs/，用于 GitHub Pages）
npm run build

# 代码检查与格式化
npm run lint
npm run format
```

## 使用说明

1. 在左侧编辑器中粘贴或输入 Markdown 内容
2. 在右侧预览区查看渲染效果
3. 点击右上角 **复制到公众号**，然后在公众号编辑器中粘贴
4. 通过右侧「创作助手」面板切换主题、调整预览缩放、检查内容兼容性

## 部署

本项目使用 GitHub Pages 部署。`vite.config.ts` 中已配置 `base: './'` 和 `outDir: 'docs'`，执行 `npm run build` 后提交 `docs/` 目录即可。
