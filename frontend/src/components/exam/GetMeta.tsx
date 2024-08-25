export default function GetMeta(content: string): string {
  const regex = /\$-META-\$([\s\S]*?)#-META-#/
  const match = content.match(regex)

  if (match && match[1]) {
    return match[1].trim()
  }

  return '' // 如果没有找到匹配项，返回空字符串
}
