import type { Theme, CodeTheme, CustomThemeSettings } from '@/types'

export const themes: Record<string, Theme> = {
  classic: {
    name: '经典微信',
    description: '稳妥通用，适合大多数公众号正文。',
    base: {
      color: '#2f3033',
      muted: '#7d858c',
      border: '#e7e7e7',
      bgSoft: '#f7fbf8',
      quoteBg: '#f5f7f6',
      accent: '#07c160',
      h1Mode: 'underline',
      headingMode: 'bar',
      quoteMode: 'bar',
    },
  },
  minimal: {
    name: '极简黑白',
    description: '纯黑白灰，克制留白，适合观点长文。',
    base: {
      color: '#1a1a1a',
      accent: '#1a1a1a',
      muted: '#888888',
      border: '#e0e0e0',
      bgSoft: '#fafafa',
      quoteBg: '#f5f5f5',
      h1Mode: 'plain',
      headingMode: 'plain',
      quoteMode: 'soft',
    },
  },
  night: {
    name: '暗夜模式',
    description: '深色沉浸，适合夜间阅读。',
    base: {
      color: '#e4e8ec',
      accent: '#7ecba1',
      muted: '#9aa3ad',
      border: '#3d4852',
      bgSoft: '#1e272f',
      quoteBg: '#232d36',
      canvas: '#161c22',
      h1Mode: 'underline',
      headingMode: 'chip',
      quoteMode: 'panel',
    },
  },
}

export const codeThemes: Record<string, CodeTheme> = {
  light: {
    name: '浅色',
    background: '#f6f8fa',
    color: '#1f2328',
    border: '#d0d7de',
    keyword: '#6f42c1',
    string: '#0d7a56',
    comment: '#7a8490',
    number: '#cf222e',
  },
  dark: {
    name: '深色',
    background: '#1e1e2e',
    color: '#cdd6f4',
    border: '#2a2a3c',
    keyword: '#cba6f7',
    string: '#a6e3a1',
    comment: '#6c7086',
    number: '#fab387',
  },
  paper: {
    name: '纸张',
    background: '#faf6ed',
    color: '#4a3828',
    border: '#e6d5c3',
    keyword: '#92400e',
    string: '#3f6212',
    comment: '#8c7b6b',
    number: '#b45309',
  },
}

export const CUSTOM_THEME_KEY = 'wechat-md-custom-theme'
export const THEME_KEY = 'wechat-md-theme'
export const CODE_THEME_KEY = 'wechat-md-code-theme'
export const LAST_LIGHT_THEME_KEY = 'wechat-md-last-light-theme'

const defaultLightBase = {
  color: '#2f3033',
  muted: '#7d858c',
  border: '#e7e7e7',
  bgSoft: '#f7fbf8',
  quoteBg: '#f5f7f6',
}

export function getCustomThemeSettings(): CustomThemeSettings {
  const fallback: CustomThemeSettings = {
    accent: '#07c160',
    fontSize: 16,
    lineHeight: 1.8,
    width: 420,
    h1Mode: 'underline',
    headingMode: 'bar',
    quoteMode: 'bar',
    fontFamily: '',
    textAlign: 'left',
  }
  try {
    const stored = localStorage.getItem(CUSTOM_THEME_KEY)
    if (stored) return { ...fallback, ...JSON.parse(stored) }
    return fallback
  } catch {
    return fallback
  }
}

export function applyCustomThemeSettings(): Theme {
  const custom = getCustomThemeSettings()
  return {
    name: '我的主题',
    description: '根据你的配色、字号和行宽保存。',
    base: {
      fontFamily: custom.fontFamily,
      ...defaultLightBase,
      accent: custom.accent,
      h1Mode: custom.h1Mode,
      headingMode: custom.headingMode,
      quoteMode: custom.quoteMode,
      fontSize: Number(custom.fontSize),
      lineHeight: Number(custom.lineHeight),
      width: Number(custom.width),
      textAlign: custom.textAlign,
    },
  }
}
