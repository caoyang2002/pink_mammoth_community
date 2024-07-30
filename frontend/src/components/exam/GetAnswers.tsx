export interface Answer {
  sort: number
  option: string[]
}

/**
 * 获取答案对象
 * @param content 原始试题内容
 * @returns 答案对象 [{"sort": 1,"option": ["E"]}, {"sort": 2,"option": ["E","F"]}]
 */
export function GetAnswerArray(content: string): Answer[] {
  const answers = GetAnswers(content)
  const regexNumber = /(\d+)\.\s+([A-Z,\s]+)/g
  const results: Answer[] = []

  let match
  while ((match = regexNumber.exec(answers)) !== null) {
    results.push({
      sort: parseInt(match[1], 10),
      option: match[2].trim().split(/,\s*/),
    })
  }

  return results
}

/**
 * 获取答案字符串
 * @param content
 * @returns
 */
export function GetAnswers(content: string): string {
  const regex = /\$-ANSWER-\$([\s\S]*?)#-ANSWER-#/
  const match = content.match(regex)

  if (match && match[1]) {
    return match[1].trim()
  }

  return 'none' // 如果没有找到匹配项，返回 'none'
}
