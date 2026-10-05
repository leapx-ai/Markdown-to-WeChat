export function useSmartFormat() {
  function formatSegment(segment: string): string {
    return segment
      .replace(/([一-鿿])([a-zA-Z0-9])/g, '$1 $2')
      .replace(/([a-zA-Z0-9])([一-鿿])/g, '$1 $2')
      .replace(/([一-鿿])([0-9])/g, '$1 $2')
      .replace(/([0-9])([一-鿿])/g, '$1 $2')
      .replace(/([^-])--([^-])/g, '$1——$2')
      .replace(/\.\.\./g, '…')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/^(#{1,6})([^\s#])/gm, '$1 $2')
      .replace(/^([-+])(?![-+])([^\s])/gm, '$1 $2')
      .replace(/^(\*)(?!\*)([^\s])/gm, '$1 $2')
      .replace(/^(\d+\.)([^\s])/gm, '$1 $2')
  }

  // 代码围栏内的内容不做任何排版修复，避免破坏代码（如 `i--` 被改成 `i——`）
  function formatMarkdown(input: string): string {
    return input
      .split(/(```[\s\S]*?(?:```|$))/g)
      .map((part) => (part.startsWith('```') ? part : formatSegment(part)))
      .join('')
  }

  return { formatMarkdown }
}
