# AGENTS.md

本文件为在本仓库中工作的 AI 编码代理提供项目指引。

## 项目概览

Markdown-to-WeChat 是一个 Vue 3 单页应用（SPA），将 Markdown 转换为**内联样式**的 HTML，用于粘贴到微信公众号（微信公众号）编辑器。微信公众号编辑器会清洗外部 CSS，因此所有样式必须内联——这是驱动整个架构的核心约束。

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Pinia 状态管理
- CodeMirror 6 作为 Markdown 编辑器
- Tailwind CSS v4，配合自定义 `@theme` 指令
- Vite（构建产物输出到 `docs/`，用于 GitHub Pages）
- TypeScript，通过 `vue-tsc` 检查

## 常用命令

```bash
# 开发服务器
npm run dev

# 生产构建（类型检查 + vite build）
npm run build

# 仅类型检查
npm run type-check

# Lint 并自动修复（依次运行 oxlint 与 eslint）
# 注意：两者都带 --fix，且会扫描整个仓库，包括 docs/（已构建、压缩的产物）。
# --fix 会改写 docs/ 并报出大量误报错误。
# 请把 lint 范围限定在 src/：npx oxlint src/  或  npx eslint src/ --cache
npm run lint

# 使用 Prettier 格式化
npm run format
```

本项目没有测试。

## 布局

编辑器与预览区在 `App.vue` 中左右并排（flex 布局），中间是拖拽分隔条；`editorWidth` 存在 ref 中，随鼠标拖拽更新。初始宽度按容器 50/50 计算。预览区使用 `flex-1`，内容以固定 `max-width` 居中，因此拉宽面板不会拉伸文章。

当编辑器为空时，一个不可交互的遮罩层（`pointer-events-none`）显示引导文案，内含独立的「加载示例」按钮（`pointer-events-auto`），这样点击空白区域会聚焦 CodeMirror 输入面，便于直接粘贴。

## 架构

### 自定义 Markdown 渲染器

最重要的文件是 `src/utils/markdownRenderer.ts`。这是一个**手写的 Markdown 解析器**（未使用 marked 等库），只输出**内联 `style` 属性**的 HTML。这是必需的，因为微信公众号编辑器会丢弃 class 名与外部样式表。

渲染器的关键行为：
- 链接被转换为上标脚注引用；文末统一追加「参考链接」区块，列出真实 URL。
- 代码块使用基于正则的手写语法高亮，依据语言维护关键字列表。
- 图片被包裹在 `<figure>` 中，可选 `<figcaption>` 说明文字。
- 支持表格、标题（H1–H4）、引用块、列表、任务列表与分割线。
- 可选的在文末追加「关注引导」CTA（公众号名称 + 引导语，在创作助手面板配置）。
- 段落文本对齐由主题驱动：`theme.textAlign === 'justify'` 时在 `<p>` 上输出 `text-align:justify`，否则省略该属性（默认左对齐）。

### 状态管理（Pinia）

- `editorStore` — Markdown 内容（通过 `@vueuse/core` 持久化到 `localStorage`）、保存状态标签、CodeMirror view 引用。
- `themeStore` — 当前主题与代码主题（已持久化）。支持内置主题加用户自定义的「custom」主题。`night` 是唯一深色画布主题。
- `settingsStore` — 预览缩放级别与公众号文末元素（`followEnabled`、`followName`、`followSlogan`）。
- `uiStore` — 弹窗状态、Toast 通知、创作助手面板可见性。

### 主题系统

主题定义在 `src/config/themes.ts`。内置 4 套主题（`classic`、`minimal`、`magazine`、`night`），外加用户自定义的 `custom` 主题。浅色主题共享 `defaultLightBase` 对象中的常用中性色，避免重复。每个主题的 `base` 对象包含：

- `h1Mode`：`'underline' | 'center' | 'panel' | 'plain'`
- `headingMode`：`'bar' | 'chip' | 'plain'`
- `quoteMode`：`'bar' | 'panel' | 'soft'`
- `textAlign`：`'left' | 'justify'`（作用于段落文本）

代码主题（`codeThemes`）定义语法高亮配色（3 套预设：light / dark / paper）。

自定义主题编辑器（`ThemeEditorModal.vue`）允许用户调整主色（单行 8 个预设色块加自定义取色器）、字体、字号、行高、内容宽度、上面三个模式开关以及正文对齐开关。改动实时生效；取消时恢复打开弹窗时保存的快照。弹窗使用 `max-h-[85vh]`，控制面板与预览区内部各自滚动。

### 应用外壳与组件

`App.vue` 组合布局：`EditorPane`（CodeMirror）与 `PreviewPane` 并排、中间拖拽分隔条，外加浮动的 `InspectorPane`（创作助手，从顶栏开关）和两个弹窗（`PreflightModal`、`ThemeEditorModal`）。`AppHeader.vue` 承载统计信息、主题 / 代码主题切换器以及「导出」/「复制到公众号」操作。

- `PreviewPane` 通过 `transform: scale(previewZoom)` 缩放渲染后的 HTML，并用主题的 `width`（默认 420px）约束宽度。
- 复制由顶栏按钮或 `Ctrl/Cmd + Shift + C` 快捷键触发；`Esc` 关闭弹窗与创作助手面板。
- 存在 `danger` 级别警告时，`PreflightModal` 会代替复制操作弹出；`ThemeEditorModal` 提供自定义主题构建器。

### 警告 / 预检系统

`src/composables/useMarkdownWarnings.ts` 分析当前 Markdown，针对常见公众号兼容性问题生成警告（danger / warn / info）：本地图片、空链接、未闭合代码围栏、多个一级标题、过深标题层级、外链、表格过多、超长行、超长代码块、标题密度过低。

`danger` 级别的阻塞警告会阻止一键复制，改为弹出预检弹窗。创作助手面板中的每条警告卡片可点击，并把 CodeMirror 光标跳转到问题所在位置（`InspectorPane.vue` 中的 `locateWarning`）。

`src/composables/useImageReplace.ts` 支撑「本地图片批量替换」功能：找出 URL 不是 `http(s)://` 的图片，重写为 `{cdnPrefix}/{filename}`。

### 智能排版

`src/composables/useSmartFormat.ts` 在首次粘贴时应用 CJK 排版修复：在中日韩字符与拉丁字母/数字之间补空格、把独立 `--` 替换为破折号、`...` 替换为省略号、折叠多余空行、规范标题与列表间距。

**重要：** 列表间距规则刻意保守，以避免破坏 Markdown 语法。它使用负向先行断言跳过构成分割线（`---`、`***`、`++++` 等）或行内加粗（`**text**`）的 `*`、`-`、`+` 序列。如果修改这些正则，请同时用列表项和分割线语法验证。

### 剪贴板与导出

`useClipboard` 把渲染后的 HTML（包装成完整 HTML 文档）以 `text/html` 格式复制，并提供纯文本兜底。`useExport` 触发下载同一个 HTML 文件。

## 样式约定

- 应用界面使用 Tailwind CSS v4 工具类。自定义设计令牌定义在 `src/styles/main.css` 的 `@theme` 下。
- 深色模式通过 `<html>` 上的 `.dark` class 切换；预览画布的深色主题是 `night` 主题（并非 Tailwind 的深色模式）。
- 渲染出的预览 HTML **只能使用内联样式**——绝不要给 `renderMarkdown` 的输出添加 class 名。
- 应用使用统一的按钮样式：主操作用 `bg-[#18181b] text-white border border-[#18181b]`，次操作用 `bg-surface text-text border border-border`。

## 文件别名

`@/` 映射到 `./src/`（配置在 `vite.config.ts` 与 `tsconfig.app.json`）。

## 重要注意事项

- `vite.config.ts` 设置了 `base: './'` 和 `outDir: 'docs'`，以便在 GitHub Pages 上运行。
- `tsconfig.app.json` 开启了 `noUncheckedIndexedAccess: true`，用于提升安全性。
- 项目不使用传统 Markdown 解析库；对 Markdown 支持的修改必须在 `src/utils/markdownRenderer.ts` 中进行。
- `src/utils/markdownRenderer.ts` 带有 `// @ts-nocheck`，因为 `tsconfig.app.json` 开启的 `noUncheckedIndexedAccess` 会在解析器的数组/索引访问处产生大量误报。如果重构该文件并移除该指令，必须守卫每一处 `lines[i]`、正则捕获组和栈顶访问。
- 所有 `localStorage` 键都以 `wechat-md-` 为前缀。
- `docs/` 是已提交的构建产物（GitHub Pages）。不要手工编辑；用 `npm run build` 重新生成。lint 的 `--fix` 会破坏它——把 lint 限定在 `src/`。
