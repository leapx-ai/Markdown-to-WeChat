export const sampleMarkdown = `# Markdown 排版演示

这是一段专为微信公众号优化的 **Markdown 渲染** 演示。工具会将内容转换成带 *内联样式* 的 HTML，复制后可直接粘贴到公众号后台。

## 文本格式与列表

支持常见的行内样式：

- **加粗**、*斜体*、~~删除线~~ 和 \`行内代码\`
- [Markdown 官方文档](https://markdown.com.cn/) 会自动转成文末脚注
- 任务列表：
  - [x] 主题切换
  - [ ] 深色模式

## 代码块

\`\`\`ts
interface Article {
  title: string;
  author: string;
  tags: string[];
}

function render(article: Article): string {
  return "<h1>" + article.title + "</h1>";
}
\`\`\`

## 表格

| 特性 | 状态 | 说明 |
|------|------|------|
| 主题系统 | 已支持 | 4 套内置主题 + 自定义 |
| 代码高亮 | 已支持 | 浅色 / 深色 / 纸张 |
| 智能排版 | 已支持 | 自动优化 CJK 间距 |

## 引用与分割线

> 好的排版是隐形的：它让读者专注于内容，而不是样式。

---

感谢体验！如果觉得有用，欢迎分享给你的朋友。
`
