export default function GetMeta(content: string): string {
  // 首先检查 content 是否为字符串
  if (typeof content !== 'string') {
    console.error('GetMeta: content is not a string', content)
    return '' // 或者抛出一个错误，取决于你的错误处理策略
  }

  const regex = /\$-META-\$([\s\S]*?)#-META-#/
  const match = content.match(regex)

  if (match && match[1]) {
    return match[1].trim()
  }

  return '' // 如果没有找到匹配项，返回空字符串
}
