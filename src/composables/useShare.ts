import { useUiStore } from '@/stores/ui'

export function useShare() {
  const ui = useUiStore()

  async function createShareLink(content: string): Promise<string | null> {
    if (content.length > 3000) {
      ui.showToast('内容超过 3000 字，分享链接可能因过长而失效，建议导出文件分享', 'error')
      return null
    }
    const data = {
      content,
      title: '分享的 Markdown 文档',
      createdAt: new Date().toISOString(),
    }
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    return `${window.location.origin}${window.location.pathname}#share=${encoded}`
  }

  return { createShareLink }
}
