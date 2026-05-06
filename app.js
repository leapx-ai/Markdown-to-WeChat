"use strict";

const STORAGE_KEY = "wechat-md-draft";
const THEME_KEY = "wechat-md-theme";
const CODE_THEME_KEY = "wechat-md-code-theme";
const CUSTOM_THEME_KEY = "wechat-md-custom-theme";
const IMAGE_SETTINGS_KEY = "wechat-md-image-settings";
const PREVIEW_ZOOM_KEY = "wechat-md-preview-zoom";

const themes = {
  classic: {
    name: "经典微信",
    description: "稳妥通用，适合大多数公众号正文。",
    base: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: "#2f3033",
      accent: "#07c160",
      muted: "#7d858c",
      border: "#e7e7e7",
      bgSoft: "#f7fbf8",
      quoteBg: "#f5f7f6",
      h1Mode: "underline",
      headingMode: "bar",
      quoteMode: "bar",
    },
  },
  minimal: {
    name: "极简阅读",
    description: "留白克制，适合观点和长文。",
    base: {
      fontFamily:
        "'Optima', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#252525",
      accent: "#111111",
      muted: "#777777",
      border: "#e5e2dc",
      bgSoft: "#faf9f6",
      quoteBg: "#f4f2ed",
      h1Mode: "plain",
      headingMode: "plain",
      quoteMode: "soft",
    },
  },
  tech: {
    name: "技术博客",
    description: "清晰理性，代码和表格更突出。",
    base: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: "#263238",
      accent: "#006d77",
      muted: "#5f6b70",
      border: "#c9dadd",
      bgSoft: "#eef8f8",
      quoteBg: "#edf6f7",
      h1Mode: "panel",
      headingMode: "chip",
      quoteMode: "panel",
    },
  },
  business: {
    name: "商务蓝",
    description: "专业干净，适合报告和方案。",
    base: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: "#243042",
      accent: "#2468a2",
      muted: "#637083",
      border: "#d4e0ea",
      bgSoft: "#f0f6fb",
      quoteBg: "#eef5fb",
      h1Mode: "underline",
      headingMode: "bar",
      quoteMode: "soft",
    },
  },
  magazine: {
    name: "暖色杂志",
    description: "温和有层次，适合叙事和访谈。",
    base: {
      fontFamily:
        "'Songti SC', 'STSong', 'Noto Serif CJK SC', 'SimSun', serif",
      color: "#332b24",
      accent: "#b14f2a",
      muted: "#806f61",
      border: "#ead8c7",
      bgSoft: "#fff6ee",
      quoteBg: "#fff3e9",
      h1Mode: "center",
      headingMode: "plain",
      quoteMode: "soft",
    },
  },
  atelier: {
    name: "现代留白",
    description: "轻盈高级，标题和引用更舒展。",
    base: {
      fontFamily:
        "'Avenir Next', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#202426",
      accent: "#2f6f73",
      muted: "#6d7678",
      border: "#dfe7e6",
      bgSoft: "#f6faf9",
      quoteBg: "#f2f7f6",
      h1Mode: "plain",
      headingMode: "chip",
      quoteMode: "panel",
    },
  },
  ink: {
    name: "墨韵东方",
    description: "沉静雅致，适合文化和随笔。",
    base: {
      fontFamily:
        "'Songti SC', 'STSong', 'Noto Serif CJK SC', 'SimSun', serif",
      color: "#23211d",
      accent: "#3b4b3a",
      muted: "#706b61",
      border: "#ddd7cc",
      bgSoft: "#fbfaf6",
      quoteBg: "#f4f1ea",
      h1Mode: "center",
      headingMode: "plain",
      quoteMode: "bar",
    },
  },
  finance: {
    name: "金融刊物",
    description: "稳重大气，适合分析和洞察。",
    base: {
      fontFamily:
        "'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#1d2733",
      accent: "#9a6a21",
      muted: "#68717d",
      border: "#e2d6bd",
      bgSoft: "#fbf7ee",
      quoteBg: "#f7f1e4",
      h1Mode: "panel",
      headingMode: "bar",
      quoteMode: "soft",
    },
  },
  product: {
    name: "产品简报",
    description: "结构明确，适合更新和复盘。",
    base: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: "#22272f",
      accent: "#4f6f52",
      muted: "#6f7782",
      border: "#dce4d8",
      bgSoft: "#f5f8f2",
      quoteBg: "#f1f6ee",
      h1Mode: "panel",
      headingMode: "chip",
      quoteMode: "panel",
    },
  },
  night: {
    name: "夜读深灰",
    description: "深色沉浸，适合夜读和专题。",
    base: {
      fontFamily:
        "'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#e8ecef",
      accent: "#8ab4a6",
      muted: "#b5bec5",
      border: "#3b454c",
      bgSoft: "#273038",
      quoteBg: "#2b343b",
      canvas: "#1f262c",
      h1Mode: "underline",
      headingMode: "chip",
      quoteMode: "panel",
    },
  },
  column: {
    name: "松弛专栏",
    description: "温暖自然，适合个人品牌表达。",
    base: {
      fontFamily:
        "'Hiragino Sans GB', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#2a2c2b",
      accent: "#9b5f45",
      muted: "#766f6a",
      border: "#eadfd8",
      bgSoft: "#fff8f3",
      quoteBg: "#fbefe7",
      h1Mode: "plain",
      headingMode: "bar",
      quoteMode: "soft",
    },
  },
};

const codeThemes = {
  light: {
    name: "浅色",
    background: "#f7f8fa",
    color: "#24292f",
    border: "#e6e8eb",
    keyword: "#8250df",
    string: "#116329",
    comment: "#6e7781",
    number: "#953800",
  },
  dark: {
    name: "深色",
    background: "#202733",
    color: "#f1f5f9",
    border: "#202733",
    keyword: "#c4b5fd",
    string: "#86efac",
    comment: "#94a3b8",
    number: "#fdba74",
  },
  paper: {
    name: "纸张",
    background: "#fbf5e9",
    color: "#4a3828",
    border: "#ead8c7",
    keyword: "#9a3412",
    string: "#4d7c0f",
    comment: "#8a7664",
    number: "#a16207",
  },
};

const sampleMarkdown = `# 用 Markdown 写公众号

这是一段适合微信公众号后台粘贴的排版预览。工具会把 Markdown 转成带 **内联样式** 的 HTML，复制后更容易保留样式。

## 为什么要做专用渲染

普通网页预览依赖 CSS class，但公众号编辑器会清洗样式。更稳的方式是：

- 将标题、段落、列表、引用转成微信友好的结构
- 把主题样式直接写到元素上
- 将外链整理成文末脚注

> 复制前先看右侧预览；如果包含本地图片或很宽的表格，兼容性面板会提示你。

## 代码块

\`\`\`js
function copyToWechat(html) {
  return navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([html.replace(/<[^>]+>/g, "")], { type: "text/plain" })
    })
  ]);
}
\`\`\`

## 表格

| 能力 | 第一版 | 说明 |
| --- | --- | --- |
| 主题切换 | 支持 | 内置 11 套主题 |
| 链接脚注 | 支持 | 更适合微信正文 |
| 富文本复制 | 支持 | 写入 text/html |

查看参考：[Markdown 中文网](https://markdown.com.cn/)。
`;

const templates = {
  productUpdate: {
    name: "产品更新",
    content: `# 产品更新：本周我们改进了什么

## 一句话总结

这次更新主要围绕体验、效率和稳定性展开，帮助用户更快完成核心任务。

## 新增能力

- 能力一：说明它解决的问题
- 能力二：说明适合的使用场景
- 能力三：说明用户能感知到的变化

## 使用建议

> 如果你经常处理类似任务，建议先从这个入口开始尝试。

## 下一步

我们会继续优化反馈链路，也欢迎把你的使用建议告诉我们。`,
  },
  techArticle: {
    name: "技术文章",
    content: `# 技术实践：从问题到方案

## 背景

先说明业务或技术背景，以及为什么这个问题值得解决。

## 问题拆解

- 约束一
- 约束二
- 风险点

## 实现方案

\`\`\`js
function example(input) {
  return input.trim();
}
\`\`\`

## 取舍

> 好的技术方案不是堆能力，而是在约束内做清晰选择。

## 总结

用三到五句话总结经验，方便读者带走。`,
  },
  insight: {
    name: "行业洞察",
    content: `# 行业观察：一个正在发生的变化

## 核心判断

用一句话写出本文最重要的判断。

## 变化从哪里来

1. 需求侧变化
2. 供给侧变化
3. 技术或渠道变化

## 对谁影响最大

| 对象 | 影响 | 建议 |
| --- | --- | --- |
| 用户 | 体验变化 | 关注真实需求 |
| 企业 | 成本结构变化 | 调整资源投入 |

## 结语

把观点收束到可行动的建议。`,
  },
  eventReview: {
    name: "活动复盘",
    content: `# 活动复盘：目标、过程与结果

## 活动目标

- 目标一
- 目标二

## 关键数据

| 指标 | 结果 | 备注 |
| --- | --- | --- |
| 参与人数 |  |  |
| 转化率 |  |  |

## 做得好的地方

## 可以改进的地方

## 下次行动

1. 明确负责人
2. 明确时间点
3. 明确验证方式`,
  },
  readingNote: {
    name: "读书笔记",
    content: `# 读书笔记：书名

## 这本书解决什么问题

用自己的话概括，而不是复述目录。

## 最有启发的一句话

> 在这里放一句你想反复咀嚼的话。

## 三个收获

- 收获一
- 收获二
- 收获三

## 我会如何使用

把阅读转成一个具体行动。`,
  },
};

const markdownInput = document.querySelector("#markdownInput");
const preview = document.querySelector("#preview");
const workspace = document.querySelector(".workspace");
const templateSelect = document.querySelector("#templateSelect");
const insertTemplateBtn = document.querySelector("#insertTemplateBtn");
const themeSelect = document.querySelector("#themeSelect");
const codeThemeSelect = document.querySelector("#codeThemeSelect");
const copyBtn = document.querySelector("#copyBtn");
const exportBtn = document.querySelector("#exportBtn");
const loadSampleBtn = document.querySelector("#loadSampleBtn");
const saveState = document.querySelector("#saveState");
const copyState = document.querySelector("#copyState");
const stats = document.querySelector("#stats");
const warnings = document.querySelector("#warnings");
const themeCards = document.querySelector("#themeCards");
const preflightModal = document.querySelector("#preflightModal");
const preflightSummary = document.querySelector("#preflightSummary");
const preflightList = document.querySelector("#preflightList");
const closePreflightBtn = document.querySelector("#closePreflightBtn");
const cancelPreflightBtn = document.querySelector("#cancelPreflightBtn");
const confirmCopyBtn = document.querySelector("#confirmCopyBtn");
const openThemeEditorBtn = document.querySelector("#openThemeEditorBtn");
const themeEditorModal = document.querySelector("#themeEditorModal");
const closeThemeEditorBtn = document.querySelector("#closeThemeEditorBtn");
const customAccentInput = document.querySelector("#customAccentInput");
const customTextInput = document.querySelector("#customTextInput");
const customSoftInput = document.querySelector("#customSoftInput");
const customHeadingModeSelect = document.querySelector("#customHeadingModeSelect");
const customFontSizeInput = document.querySelector("#customFontSizeInput");
const customLineHeightInput = document.querySelector("#customLineHeightInput");
const saveThemeBtn = document.querySelector("#saveThemeBtn");
const resetThemeBtn = document.querySelector("#resetThemeBtn");
const imageWidthSelect = document.querySelector("#imageWidthSelect");
const imageRadiusInput = document.querySelector("#imageRadiusInput");
const imageCaptionToggle = document.querySelector("#imageCaptionToggle");
const previewZoomSelect = document.querySelector("#previewZoomSelect");
const toggleFocusBtn = document.querySelector("#toggleFocusBtn");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function styleText(style) {
  return Object.entries(style)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value}`)
    .join(";");
}

function inline(tag, content, style = {}, attrs = {}) {
  const attrText = Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ` ${key}="${escapeHtml(String(value))}"`)
    .join("");
  const styleAttr = Object.keys(style).length ? ` style="${styleText(style)}"` : "";
  return `<${tag}${styleAttr}${attrText}>${content}</${tag}>`;
}

function selfClosing(tag, style = {}, attrs = {}) {
  const attrText = Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ` ${key}="${escapeHtml(String(value))}"`)
    .join("");
  const styleAttr = Object.keys(style).length ? ` style="${styleText(style)}"` : "";
  return `<${tag}${styleAttr}${attrText}>`;
}

function loadImageSettings() {
  const fallback = { width: "100%", radius: 6, caption: true };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(IMAGE_SETTINGS_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveImageSettings() {
  localStorage.setItem(
    IMAGE_SETTINGS_KEY,
    JSON.stringify({
      width: imageWidthSelect.value,
      radius: Number(imageRadiusInput.value),
      caption: imageCaptionToggle.checked,
    }),
  );
}

function imageHtml(alt, src, settings = loadImageSettings()) {
  const image = selfClosing(
    "img",
    {
      display: "block",
      width: settings.width,
      maxWidth: "100%",
      height: "auto",
      margin: "18px auto 8px",
      borderRadius: `${settings.radius}px`,
    },
    { src, alt },
  );
  if (!settings.caption || !alt) return image;
  return inline(
    "figure",
    image +
      inline("figcaption", escapeHtml(alt), {
        margin: "0 0 18px",
        color: "#8a8f98",
        fontSize: "13px",
        lineHeight: "1.6",
        textAlign: "center",
      }),
    { margin: "0 0 18px" },
  );
}

function highlightCode(code, lang, codeTheme) {
  const escaped = escapeHtml(code);
  const color = codeTheme.keyword || "#7c3aed";
  const stringColor = codeTheme.string || "#0f766e";
  const commentColor = codeTheme.comment || "#8a8f98";
  const numberColor = codeTheme.number || "#b45309";
  const keywordSets = {
    js: "await break case catch class const continue default delete do else export extends finally for function if import in instanceof let new return switch throw try typeof var void while yield async",
    ts: "await break case catch class const continue default delete do else export extends finally for function if import in instanceof let new return switch throw try typeof var void while yield async interface type enum implements private public readonly",
    css: "display position color background margin padding border grid flex width height font transform transition",
    html: "section article div span p h1 h2 h3 img a table tr td th",
  };
  const normalized = (lang || "js").toLowerCase();
  const keywords = keywordSets[normalized] || keywordSets.js;
  return escaped
    .replace(/(&lt;!--[\s\S]*?--&gt;|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) =>
      inline("span", match, { color: commentColor }),
    )
    .replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, (match) =>
      inline("span", match, { color: stringColor }),
    )
    .replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => inline("span", match, { color: numberColor }))
    .replace(new RegExp(`\\b(${keywords.split(" ").join("|")})\\b`, "g"), (match) =>
      inline("span", match, { color, fontWeight: "700" }),
    );
}

function parseInline(text, links) {
  let value = escapeHtml(text);

  value = value.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_, alt, src) =>
    imageHtml(alt, src),
  );

  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_, label, href) => {
    const id = links.findIndex((item) => item.href === href);
    const index = id >= 0 ? id + 1 : links.push({ label, href });
    return `${label}<sup style="color:#888;font-size:12px;">[${index}]</sup>`;
  });

  value = value.replace(/`([^`]+)`/g, (_, code) =>
    inline(
      "code",
      code,
      {
        padding: "2px 5px",
        borderRadius: "4px",
        background: "#f0f2f4",
        color: "#c43d3d",
        fontFamily: "Menlo, Monaco, Consolas, monospace",
        fontSize: "0.92em",
      },
    ),
  );
  value = value.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return value;
}

function isTableStart(lines, index) {
  return (
    index + 1 < lines.length &&
    /\|/.test(lines[index]) &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
  );
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function paragraphStyle(theme) {
  return {
    margin: "0 0 16px",
    color: theme.color,
    fontSize: `${theme.fontSize || 16}px`,
    lineHeight: themeLineHeight(theme, 1.85),
    letterSpacing: "0",
  };
}

function themeFontSize(theme, delta = 0) {
  return `${(theme.fontSize || 16) + delta}px`;
}

function themeLineHeight(theme, fallback = 1.85) {
  return String(theme.lineHeight || fallback);
}

function h1Style(theme) {
  const baseSize = theme.fontSize || 16;
  const base = {
    margin: "0 0 24px",
    color: theme.color,
    fontSize: `${baseSize + 8}px`,
    lineHeight: "1.36",
    fontWeight: "700",
    letterSpacing: "0",
  };

  if (theme.h1Mode === "center") {
    return {
      ...base,
      textAlign: "center",
      padding: "8px 0 18px",
      borderBottom: `1px solid ${theme.border}`,
    };
  }

  if (theme.h1Mode === "panel") {
    return {
      ...base,
      padding: "18px 18px",
      border: `1px solid ${theme.border}`,
      borderRadius: "8px",
      background: theme.bgSoft,
    };
  }

  if (theme.h1Mode === "plain") {
    return {
      ...base,
      padding: "0 0 4px",
    };
  }

  return {
    ...base,
    padding: "0 0 12px",
    borderBottom: `2px solid ${theme.accent}`,
  };
}

function headingContent(content, theme) {
  if (theme.headingMode === "chip") {
    return inline("span", content, {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "6px",
      background: theme.bgSoft,
      color: theme.accent,
    });
  }

  if (theme.headingMode === "plain") {
    return inline("span", content, {
      display: "inline-block",
      paddingBottom: "3px",
      borderBottom: `1px solid ${theme.accent}`,
    });
  }

  return inline("span", content, {
    display: "inline-block",
    paddingLeft: "10px",
    borderLeft: `4px solid ${theme.accent}`,
  });
}

function quoteStyle(theme) {
  const base = {
    margin: "0 0 18px",
    color: theme.muted,
    fontSize: themeFontSize(theme, -1),
    lineHeight: themeLineHeight(theme, 1.8),
  };

  if (theme.quoteMode === "panel") {
    return {
      ...base,
      padding: "14px 15px",
      border: `1px solid ${theme.border}`,
      borderRadius: "8px",
      background: theme.quoteBg,
    };
  }

  if (theme.quoteMode === "soft") {
    return {
      ...base,
      padding: "13px 15px",
      borderRadius: "8px",
      background: theme.quoteBg,
    };
  }

  return {
    ...base,
    padding: "12px 14px",
    borderLeft: `4px solid ${theme.accent}`,
    background: theme.quoteBg,
  };
}

function renderMarkdown(markdown, theme, codeTheme) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const links = [];
  let html = "";
  let paragraph = [];
  let inCode = false;
  let codeLang = "";
  let codeBuffer = [];
  let listType = null;
  let listBuffer = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html += inline("p", parseInline(paragraph.join(" "), links), paragraphStyle(theme));
    paragraph = [];
  };

  const flushList = () => {
    if (!listBuffer.length || !listType) return;
    const tag = listType === "ol" ? "ol" : "ul";
    const items = listBuffer
      .map((item) =>
        inline("li", parseInline(item, links), {
          margin: "0 0 7px",
          paddingLeft: "2px",
          color: theme.color,
          fontSize: themeFontSize(theme),
          lineHeight: themeLineHeight(theme, 1.8),
        }),
      )
      .join("");
    html += inline(tag, items, {
      margin: "0 0 18px 22px",
      padding: "0",
      color: theme.color,
    });
    listType = null;
    listBuffer = [];
  };

  const flushCode = () => {
    const label = codeLang
      ? inline(
          "span",
          escapeHtml(codeLang),
          {
            display: "block",
            marginBottom: "8px",
            color: codeTheme.color,
            opacity: "0.64",
            fontSize: "12px",
            fontFamily: "Menlo, Monaco, Consolas, monospace",
          },
        )
      : "";
    html += inline(
      "pre",
      label + inline("code", highlightCode(codeBuffer.join("\n"), codeLang, codeTheme), {
        fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
        fontSize: "13px",
        lineHeight: "1.7",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }),
      {
        margin: "0 0 20px",
        padding: "14px 15px",
        borderRadius: "6px",
        border: `1px solid ${codeTheme.border}`,
        background: codeTheme.background,
        color: codeTheme.color,
        overflowX: "auto",
      },
    );
    codeBuffer = [];
    codeLang = "";
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();

    if (/^```/.test(line)) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
        codeLang = line.replace(/^```/, "").trim();
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(raw);
      continue;
    }

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const imageOnly = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/.exec(line);
    if (imageOnly) {
      flushParagraph();
      flushList();
      html += imageHtml(imageOnly[1], imageOnly[2]);
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      flushList();
      const headers = splitTableRow(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      i -= 1;
      const ths = headers
        .map((cell) =>
          inline("th", parseInline(cell, links), {
            padding: "9px 8px",
            border: `1px solid ${theme.border}`,
            background: theme.bgSoft,
            color: theme.color,
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "1.5",
            textAlign: "left",
          }),
        )
        .join("");
      const trs = rows
        .map((row) =>
          inline(
            "tr",
            row
              .map((cell) =>
                inline("td", parseInline(cell, links), {
                  padding: "9px 8px",
                  border: `1px solid ${theme.border}`,
                  color: theme.color,
                  fontSize: "14px",
                  lineHeight: "1.55",
                }),
              )
              .join(""),
          ),
        )
        .join("");
      html += inline(
        "section",
        inline(
          "table",
          inline("thead", inline("tr", ths)) + inline("tbody", trs),
          {
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          },
        ),
        {
          margin: "0 0 20px",
          overflowX: "auto",
        },
      );
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const baseSize = theme.fontSize || 16;
      const size = [0, baseSize + 8, baseSize + 4, baseSize + 2, baseSize][level];
      const marginTop = level === 1 ? "0" : "28px";
      const content = parseInline(heading[2], links);
      if (level === 1) {
        html += inline("h1", content, h1Style(theme));
      } else {
        html += inline(
          `h${level}`,
          headingContent(content, theme),
          {
            margin: `${marginTop} 0 14px`,
            color: theme.color,
            fontSize: `${size}px`,
            lineHeight: level === 4 ? themeLineHeight(theme, 1.45) : "1.45",
            fontWeight: "700",
          },
        );
      }
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      html += inline("blockquote", parseInline(line.replace(/^>\s?/, ""), links), quoteStyle(theme));
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      flushParagraph();
      flushList();
      html += selfClosing("hr", {
        height: "1px",
        border: "0",
        background: theme.border,
        margin: "26px 0",
      });
      continue;
    }

    const task = /^[-*+]\s+\[([ xX])]\s+(.+)$/.exec(line);
    const unordered = /^[-*+]\s+(.+)$/.exec(line);
    const ordered = /^\d+\.\s+(.+)$/.exec(line);
    if (task || unordered || ordered) {
      flushParagraph();
      const currentType = ordered ? "ol" : "ul";
      if (listType && listType !== currentType) flushList();
      listType = currentType;
      if (task) {
        const checked = /x/i.test(task[1]);
        listBuffer.push(`${checked ? "☑" : "☐"} ${task[2]}`);
      } else {
        listBuffer.push((unordered || ordered)[1]);
      }
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  if (inCode) flushCode();
  flushParagraph();
  flushList();

  if (links.length) {
    const linkItems = links
      .map((item, index) =>
        inline(
          "p",
          `[${index + 1}] ${escapeHtml(item.label)}：${escapeHtml(item.href)}`,
          {
            margin: "0 0 7px",
            color: theme.muted,
            fontSize: "13px",
            lineHeight: "1.6",
            wordBreak: "break-all",
          },
        ),
      )
      .join("");
    html += inline(
      "section",
      inline("p", "参考链接", {
        margin: "0 0 9px",
        color: theme.color,
        fontSize: "14px",
        fontWeight: "700",
      }) + linkItems,
      {
        margin: "28px 0 0",
        padding: "12px 0 0",
        borderTop: `1px solid ${theme.border}`,
      },
    );
  }

  return inline(
    "section",
    html || inline("p", "开始输入 Markdown，右侧会实时预览。", paragraphStyle(theme)),
    {
      color: theme.color,
      fontFamily: theme.fontFamily,
      background: theme.canvas,
      padding: theme.canvas ? "18px" : undefined,
      borderRadius: theme.canvas ? "8px" : undefined,
      fontSize: `${theme.fontSize || 16}px`,
      lineHeight: themeLineHeight(theme, 1.8),
      letterSpacing: "0",
    },
  );
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~\-|[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countReadableWords(text) {
  const chinese = text.match(/[\u4e00-\u9fff]/g) || [];
  const latin = text
    .replace(/[\u4e00-\u9fff]/g, " ")
    .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g) || [];
  return chinese.length + latin.length;
}

function analyzeMarkdown(markdown) {
  const text = stripMarkdown(markdown);
  const wordCount = countReadableWords(text);
  const headings = markdown.match(/^#{1,4}\s+.+$/gm) || [];
  const images = markdown.match(/!\[[^\]]*]\([^)]+\)/g) || [];
  const links = markdown.match(/(?<!!)\[[^\]]+]\((https?:\/\/[^)]+)\)/gi) || [];
  const codeBlocks = markdown.match(/```[\s\S]*?```/g) || [];
  const tableRows = markdown.match(/^\s*\|.+\|\s*$/gm) || [];
  return {
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 420)),
    headings: headings.length,
    images: images.length,
    links: links.length,
    codeBlocks: codeBlocks.length,
    tableRows: tableRows.length,
    paragraphs: markdown.split(/\n{2,}/).filter((item) => stripMarkdown(item)).length,
  };
}

function renderStats(markdown) {
  const summary = analyzeMarkdown(markdown);
  stats.innerHTML = [
    ["字数", summary.wordCount],
    ["阅读", `${summary.readingMinutes} 分钟`],
    ["标题", summary.headings],
    ["图片", summary.images],
  ]
    .map(
      ([label, value]) =>
        `<div class="stat-card"><strong>${value}</strong><span>${label}</span></div>`,
    )
    .join("");
}

function buildWarnings(markdown) {
  const result = [];
  const localImages = markdown.match(/!\[[^\]]*]\((?!https?:\/\/)[^)]+\)/gi) || [];
  const links = markdown.match(/\[[^\]]+]\((https?:\/\/[^)]+)\)/gi) || [];
  const tables = markdown.match(/^\s*\|.+\|\s*$/gm) || [];
  const longLines = markdown.split("\n").filter((line) => line.length > 120);
  const emptyLinks = markdown.match(/\[[^\]]*]\(\s*\)/g) || [];
  const headings = markdown.match(/^#{1,6}\s+.*$/gm) || [];
  const h1Count = markdown.match(/^#\s+.+$/gm)?.length || 0;
  const h5Plus = markdown.match(/^#{5,6}\s+.+$/gm) || [];
  const codeBlocks = markdown.match(/```[\s\S]*?```/g) || [];
  const unclosedCodeFenceCount = (markdown.match(/```/g) || []).length;
  const veryLongCodeBlocks = codeBlocks.filter((block) => block.split("\n").length > 28);
  const summary = analyzeMarkdown(markdown);

  if (localImages.length) {
    result.push({
      level: "danger",
      text: "检测到本地或相对路径图片。公众号后台通常需要可访问的线上图片地址。",
    });
  }
  if (emptyLinks.length) {
    result.push({
      level: "danger",
      text: "存在空链接，请补全 URL 或删除链接标记。",
    });
  }
  if (unclosedCodeFenceCount % 2 !== 0) {
    result.push({
      level: "danger",
      text: "代码块围栏数量不成对，后续内容可能都会被当成代码。",
    });
  }
  if (h1Count > 1) {
    result.push({
      level: "warn",
      text: "检测到多个一级标题。公众号正文通常保留一个主标题更稳。",
    });
  }
  if (h5Plus.length) {
    result.push({
      level: "warn",
      text: "检测到五级或六级标题，微信正文里层级可能不明显，建议合并到四级以内。",
    });
  }
  if (links.length) {
    result.push({
      level: "info",
      text: `检测到 ${links.length} 个外链，复制时会自动转成文末脚注。`,
    });
  }
  if (tables.length > 4) {
    result.push({
      level: "warn",
      text: "表格内容较多，粘贴到公众号后建议检查手机端宽度。",
    });
  }
  if (longLines.length) {
    result.push({
      level: "warn",
      text: "存在较长单行内容，代码块或表格可能在微信里换行。",
    });
  }
  if (veryLongCodeBlocks.length) {
    result.push({
      level: "warn",
      text: "存在较长代码块，公众号阅读体验可能偏重，建议拆分或折叙。",
    });
  }
  if (summary.wordCount > 2800 && summary.headings < 3) {
    result.push({
      level: "info",
      text: "文章较长但标题层级较少，可以增加小标题帮助读者扫读。",
    });
  }
  if (!headings.length && summary.wordCount > 600) {
    result.push({
      level: "info",
      text: "正文超过 600 字但没有标题，建议增加小标题提升结构感。",
    });
  }
  return result;
}

function renderWarnings(markdown) {
  const items = buildWarnings(markdown);
  if (!items.length) {
    warnings.innerHTML = `<div class="warning ok">当前内容没有明显的公众号兼容性风险。</div>`;
    return;
  }
  warnings.innerHTML = items
    .map((item) => `<div class="warning ${item.level}">${item.text}</div>`)
    .join("");
}

function renderThemeCards() {
  themeCards.innerHTML = Object.entries(themes)
    .map(([key, theme]) => {
      const token = theme.base;
      return `
        <button class="theme-card ${themeSelect.value === key ? "active" : ""}" type="button" data-theme="${key}">
          <span class="theme-swatch" style="background:${token.canvas || token.bgSoft};">
            <span class="theme-swatch-line" style="background:${token.accent};"></span>
            <span class="theme-swatch-line" style="width:18px;background:${token.border};"></span>
          </span>
          <span>
            <strong>${theme.name}</strong>
            <span>${theme.description}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

function getCustomThemeSettings() {
  const fallback = {
    accent: "#137565",
    color: "#1f2429",
    bgSoft: "#f5faf8",
    headingMode: "bar",
    fontSize: 16,
    lineHeight: 1.85,
  };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(CUSTOM_THEME_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function applyCustomThemeSettings() {
  const custom = getCustomThemeSettings();
  themes.custom = {
    name: "我的主题",
    description: "根据你的字号、行高和主色保存。",
    base: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: custom.color,
      accent: custom.accent,
      muted: "#68717d",
      border: "#dfe7e6",
      bgSoft: custom.bgSoft,
      quoteBg: custom.bgSoft,
      h1Mode: "panel",
      headingMode: custom.headingMode,
      quoteMode: "soft",
      fontSize: Number(custom.fontSize),
      lineHeight: Number(custom.lineHeight),
    },
  };
}

function syncThemeEditor() {
  const custom = getCustomThemeSettings();
  customAccentInput.value = custom.accent;
  customTextInput.value = custom.color;
  customSoftInput.value = custom.bgSoft;
  customHeadingModeSelect.value = custom.headingMode;
  customFontSizeInput.value = String(custom.fontSize);
  customLineHeightInput.value = String(Math.round(custom.lineHeight * 100));
}

function saveCustomTheme() {
  const custom = {
    accent: customAccentInput.value,
    color: customTextInput.value,
    bgSoft: customSoftInput.value,
    headingMode: customHeadingModeSelect.value,
    fontSize: Number(customFontSizeInput.value),
    lineHeight: Number(customLineHeightInput.value) / 100,
  };
  localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(custom));
  applyCustomThemeSettings();
  populateSelects();
  themeSelect.value = "custom";
  localStorage.setItem(THEME_KEY, "custom");
  closeThemeEditor();
  render();
}

function resetCustomTheme() {
  localStorage.removeItem(CUSTOM_THEME_KEY);
  applyCustomThemeSettings();
  syncThemeEditor();
  render();
}

function openThemeEditor() {
  syncThemeEditor();
  themeEditorModal.hidden = false;
  document.body.classList.add("modal-open");
  customAccentInput.focus();
}

function closeThemeEditor() {
  themeEditorModal.hidden = true;
  if (preflightModal.hidden) document.body.classList.remove("modal-open");
}

function render() {
  const theme = themes[themeSelect.value].base;
  const codeTheme = codeThemes[codeThemeSelect.value];
  const html = renderMarkdown(markdownInput.value, theme, codeTheme);
  preview.innerHTML = html;
  renderStats(markdownInput.value);
  renderWarnings(markdownInput.value);
  renderThemeCards();
}

function populateSelects() {
  templateSelect.innerHTML = Object.entries(templates)
    .map(([key, template]) => `<option value="${key}">${template.name}</option>`)
    .join("");
  themeSelect.innerHTML = Object.entries(themes)
    .map(([key, theme]) => `<option value="${key}">${theme.name}</option>`)
    .join("");
  codeThemeSelect.innerHTML = Object.entries(codeThemes)
    .map(([key, theme]) => `<option value="${key}">${theme.name}</option>`)
    .join("");
  const storedTheme = localStorage.getItem(THEME_KEY) || "classic";
  themeSelect.value = themes[storedTheme] ? storedTheme : "classic";
  codeThemeSelect.value = localStorage.getItem(CODE_THEME_KEY) || "light";
}

function plainTextFromHtml(html) {
  const node = document.createElement("div");
  node.innerHTML = html;
  return node.innerText;
}

function getRenderedDocumentHtml() {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信公众号排版导出</title>
  </head>
  <body>
    ${preview.innerHTML}
  </body>
</html>`;
}

function getPreflightCounts(items) {
  return {
    danger: items.filter((item) => item.level === "danger").length,
    warn: items.filter((item) => item.level === "warn").length,
    info: items.filter((item) => item.level === "info").length,
  };
}

function openPreflightModal() {
  const items = buildWarnings(markdownInput.value);
  const counts = getPreflightCounts(items);
  preflightSummary.innerHTML = [
    ["严重", counts.danger],
    ["提醒", counts.warn],
    ["信息", counts.info],
  ]
    .map(
      ([label, value]) =>
        `<div class="preflight-pill"><strong>${value}</strong><span>${label}</span></div>`,
    )
    .join("");
  preflightList.innerHTML = items.length
    ? items.map((item) => `<div class="warning ${item.level}">${item.text}</div>`).join("")
    : `<div class="warning ok">预检通过，当前内容没有明显的公众号兼容性风险。</div>`;
  confirmCopyBtn.textContent = counts.danger ? "仍然复制" : "继续复制";
  preflightModal.hidden = false;
  document.body.classList.add("modal-open");
  confirmCopyBtn.focus();
}

function closePreflightModal() {
  preflightModal.hidden = true;
  if (themeEditorModal.hidden) document.body.classList.remove("modal-open");
}

async function copyRenderedHtml() {
  const html = preview.innerHTML;
  const fullHtml = getRenderedDocumentHtml();
  const plain = plainTextFromHtml(html);
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([fullHtml], { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" }),
        }),
      ]);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      const copyHost = document.createElement("div");
      copyHost.setAttribute("contenteditable", "true");
      copyHost.style.position = "fixed";
      copyHost.style.left = "-9999px";
      copyHost.style.top = "0";
      copyHost.innerHTML = html;
      document.body.appendChild(copyHost);
      const range = document.createRange();
      range.selectNodeContents(copyHost);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      copyHost.remove();
    } else {
      await navigator.clipboard.writeText(plain);
    }
    copyState.textContent = "已复制，可粘贴到公众号后台";
    copyBtn.textContent = "已复制";
  } catch (error) {
    copyState.textContent = "复制失败，请在浏览器权限中允许剪贴板";
    copyBtn.textContent = "复制失败";
  } finally {
    window.setTimeout(() => {
      copyBtn.textContent = "复制到公众号";
      copyState.textContent = "复制时会包含内联样式";
    }, 2400);
  }
}

function exportRenderedHtml() {
  const html = getRenderedDocumentHtml();
  const stamp = new Date()
    .toISOString()
    .slice(0, 16)
    .replace("T", "-")
    .replace(":", "");
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wechat-article-${stamp}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function insertTemplate() {
  const selected = templates[templateSelect.value];
  if (!selected) return;
  const hasContent = markdownInput.value.trim().length > 0;
  markdownInput.value = hasContent ? `${markdownInput.value.trim()}\n\n---\n\n${selected.content}` : selected.content;
  saveDraft();
  render();
  markdownInput.focus();
}

function restoreControls() {
  const imageSettings = loadImageSettings();
  imageWidthSelect.value = imageSettings.width;
  imageRadiusInput.value = String(imageSettings.radius);
  imageCaptionToggle.checked = Boolean(imageSettings.caption);
  previewZoomSelect.value = localStorage.getItem(PREVIEW_ZOOM_KEY) || "1";
  applyPreviewZoom();
}

function applyPreviewZoom() {
  const zoom = Number(previewZoomSelect.value);
  preview.style.transform = `scale(${zoom})`;
  preview.style.marginBottom = zoom < 1 ? "0" : `${Math.round((zoom - 1) * 460)}px`;
}

function updatePreviewZoom() {
  localStorage.setItem(PREVIEW_ZOOM_KEY, previewZoomSelect.value);
  applyPreviewZoom();
}

function updateImageControls() {
  saveImageSettings();
  render();
}

function togglePreviewFocus() {
  workspace.classList.toggle("focus-preview");
  toggleFocusBtn.textContent = workspace.classList.contains("focus-preview") ? "退出专注" : "专注预览";
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, markdownInput.value);
  saveState.textContent = "已自动保存";
}

function init() {
  applyCustomThemeSettings();
  populateSelects();
  markdownInput.value = localStorage.getItem(STORAGE_KEY) || sampleMarkdown;
  restoreControls();
  render();

  markdownInput.addEventListener("input", () => {
    saveState.textContent = "保存中...";
    render();
    window.clearTimeout(saveDraft.timer);
    saveDraft.timer = window.setTimeout(saveDraft, 250);
  });
  themeSelect.addEventListener("change", () => {
    localStorage.setItem(THEME_KEY, themeSelect.value);
    render();
  });
  themeCards.addEventListener("click", (event) => {
    const card = event.target.closest("[data-theme]");
    if (!card) return;
    themeSelect.value = card.dataset.theme;
    localStorage.setItem(THEME_KEY, themeSelect.value);
    render();
  });
  codeThemeSelect.addEventListener("change", () => {
    localStorage.setItem(CODE_THEME_KEY, codeThemeSelect.value);
    render();
  });
  loadSampleBtn.addEventListener("click", () => {
    markdownInput.value = sampleMarkdown;
    saveDraft();
    render();
  });
  insertTemplateBtn.addEventListener("click", insertTemplate);
  exportBtn.addEventListener("click", exportRenderedHtml);
  copyBtn.addEventListener("click", openPreflightModal);
  confirmCopyBtn.addEventListener("click", async () => {
    closePreflightModal();
    await copyRenderedHtml();
  });
  closePreflightBtn.addEventListener("click", closePreflightModal);
  cancelPreflightBtn.addEventListener("click", closePreflightModal);
  preflightModal.addEventListener("click", (event) => {
    if (event.target === preflightModal) closePreflightModal();
  });
  openThemeEditorBtn.addEventListener("click", openThemeEditor);
  closeThemeEditorBtn.addEventListener("click", closeThemeEditor);
  saveThemeBtn.addEventListener("click", saveCustomTheme);
  resetThemeBtn.addEventListener("click", resetCustomTheme);
  themeEditorModal.addEventListener("click", (event) => {
    if (event.target === themeEditorModal) closeThemeEditor();
  });
  imageWidthSelect.addEventListener("change", updateImageControls);
  imageRadiusInput.addEventListener("input", updateImageControls);
  imageCaptionToggle.addEventListener("change", updateImageControls);
  previewZoomSelect.addEventListener("change", updatePreviewZoom);
  toggleFocusBtn.addEventListener("click", togglePreviewFocus);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!preflightModal.hidden) closePreflightModal();
    if (!themeEditorModal.hidden) closeThemeEditor();
  });
}

init();
