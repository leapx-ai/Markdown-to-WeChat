# Markdown to WeChat

微信公众号排版渲染工具。将 Markdown 实时转换为带**内联样式**的 HTML，复制后可直接粘贴到公众号后台，完整保留排版效果。

## 核心特性

- **Markdown 实时渲染** — 左侧编辑，右侧即时预览，编辑器与预览区之间支持拖拽调整宽度
- **内联样式输出** — 微信公众号编辑器会清洗外部 CSS，因此所有样式直接写入元素 `style` 属性，确保粘贴后样式不丢失
- **4 套内置主题 + 自定义主题编辑器** — 经典微信 / 极简黑白 / 暖调杂志 / 暗夜模式；支持调整主色、字号、行高、内容宽度、标题样式、引用块样式、正文对齐（左对齐 / 两端对齐）
- **3 种代码高亮风格** — 浅色 / 深色 / 纸张
- **质量检查面板** — 自动检测本地图片、空链接、未闭合代码块、多 H1、深层级标题、超长行 / 代码块等兼容性问题；`严重` 级问题会拦截一键复制，可在「创作助手」中点击定位到原文
- **本地图片批量替换** — 一键把本地 / 相对路径图片替换为线上 CDN 地址
- **智能排版** — 首次粘贴自动优化 CJK 与西文/数字间距、替换标点、规范标题与列表格式
- **外链脚注化** — 正文中的链接自动转为上标脚注，文末统一列出参考链接
- **公众号元素** — 文末可附加关注引导（公众号名称 + 引导语）
- **一键复制富文本** — 以 `text/html` 格式写入剪贴板（含纯文本兜底），公众号编辑器直接粘贴即可；也支持导出为 `.html` 文件

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Vite + TypeScript
- Pinia + `@vueuse/core`（状态管理与 localStorage 持久化）
- CodeMirror 6（Markdown 编辑器）
- Tailwind CSS v4（应用界面样式）
- 手写 Markdown 渲染器（不使用 marked 等库），输出**纯内联样式** HTML

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

> 项目没有测试。`npm run lint` 依次运行 oxlint 与 eslint（均带 `--fix`），会把 `docs/` 下压缩产物也纳入扫描并改写；提交前建议把 lint 范围限定在 `src/`，或单独提交 `docs/` 构建产物。

## 项目结构

```
src/
├── App.vue                 # 入口布局：编辑区 + 拖拽分隔条 + 预览区
├── main.ts                 # 应用初始化（Pinia）
├── components/
│   ├── AppHeader.vue       # 顶栏：统计信息、主题/代码主题切换、导出/复制
│   ├── EditorPane.vue      # CodeMirror 6 Markdown 编辑器
│   ├── PreviewPane.vue     # 渲染预览（支持缩放、内容宽度）
│   ├── InspectorPane.vue   # 右侧「创作助手」浮层面板
│   ├── modals/
│   │   ├── PreflightModal.vue    # 复制前预检（拦截危险项）
│   │   └── ThemeEditorModal.vue  # 自定义主题编辑器
│   └── ui/AppIcon.vue      # 图标组件
├── composables/
│   ├── useClipboard.ts     # 复制富文本（text/html + text/plain 兜底）
│   ├── useExport.ts        # 下载 .html 文件
│   ├── useImageReplace.ts  # 本地图片批量替换为 CDN 前缀
│   ├── useMarkdownAnalyzer.ts   # 字数/阅读时长等统计
│   ├── useMarkdownWarnings.ts   # 公众号兼容性预检警告
│   └── useSmartFormat.ts   # CJK 排版智能优化（首次粘贴）
├── stores/
│   ├── editor.ts           # 草稿内容 + CodeMirror view 引用
│   ├── theme.ts            # 主题/代码主题与自定义主题
│   ├── settings.ts         # 预览缩放 + 公众号元素
│   └── ui.ts               # 弹窗、Toast、创作助手面板
├── config/
│   ├── themes.ts           # 内置主题、代码高亮主题、自定义主题存储
│   └── templates.ts        # 示例内容（sampleMarkdown）
├── utils/
│   └── markdownRenderer.ts # 手写 Markdown 渲染器（核心，仅内联样式）
├── types/index.ts          # 全局类型定义
└── styles/main.css         # Tailwind v4 主题令牌与全局样式
```

## 使用说明

1. 在左侧编辑器中粘贴或输入 Markdown 内容（自动保存到浏览器本地，`wechat-md-` 前缀的 localStorage 键）
2. 在右侧预览区查看渲染效果；通过顶栏或「创作助手」切换主题与代码高亮
3. 点击右上角 **复制到公众号**，然后在公众号编辑器中粘贴
4. 通过右侧「创作助手」面板进行质量检查、切换外观主题、调整预览缩放、配置文末关注引导
5. 快捷键：`Ctrl / Cmd + Shift + C` 一键复制（有危险项时弹出预检）；`Esc` 关闭弹窗或面板

## 部署

本项目使用 GitHub Pages 部署。`vite.config.ts` 中已配置 `base: './'` 和 `outDir: 'docs'`，执行 `npm run build` 后提交 `docs/` 目录即可。

## 开发者说明

- 核心渲染逻辑全部在 `src/utils/markdownRenderer.ts`，不支持外部 Markdown 解析库
- 自定义主题保存在 localStorage（键 `wechat-md-custom-theme`），各存储键均带 `wechat-md-` 前缀
