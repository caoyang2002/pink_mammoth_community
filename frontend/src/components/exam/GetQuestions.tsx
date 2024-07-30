import GetMeta from './GetMeta'
//@ts-ignore
import * as yaml from 'js-yaml'

// 获取所有问题
/**
 *
 * @param content 原始问题内容
 * @returns 问题字符串
 */
function GetAllQuestions(content: string): string {
  const regex = /\$-QUESTION-\$([\s\S]*?)#-QUESTION-#/
  const match = content.match(regex)
  if (match && match[1]) {
    const allQuestion = match[1].trim()
    return allQuestion
  }
  return ''
}

// 获取所有问题分类
/**
 * @param content 原始问题内容
 * @returns 问题类别数组
 */
function GetAllQuestionClass(content: string): string[] {
  // console.log('allquestion', allQuestion)
  // 匹配问题类型
  const meta = GetMeta(content)
  // 元数据中的问题标题
  const metaData = yaml.load(meta)
  const questions = metaData.part_score
  const questionClass = questions.map((question: any) => {
    // console.log(question.section)
    return question.section
  })
  // console.log('sections:', questionClass)
  return questionClass
}
/**
 * {title:string,option:string[]}
 */
export interface Question {
  title: string
  options: string[]
}
/**
 * @param allQuestion 完整问题字符串
 * @returns 问题 json 对象
 */
function GetQuestionsObj(allQuestion: string): Question[] {
  const questions: Question[] = []
  const lines = allQuestion.split('\n')
  let currentQuestion: Question | null = null

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

    const titleMatch = trimmedLine.match(/^(\d+)\.\s(.+)/)
    if (titleMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion)
      }
      currentQuestion = {
        title: trimmedLine,
        options: [],
      }
    } else if (currentQuestion) {
      const optionMatch = trimmedLine.match(/^[A-E]\.\s(.+)/)
      if (optionMatch) {
        currentQuestion.options.push(trimmedLine)
      }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion)
  }

  return questions
}

//--------------------
export interface QuestionType {
  type: string
  amount: number
}
/**
 * 获取问题数量
 * @param content 原始问题内容
 * @returns 对象{type:"string",amount:number}
 */
export function GetQuestionsAmount(content: string): QuestionType[] {
  const question = GetAllQuestions(content)
  const typeRegex =
    /([\u4e00-\u9fa5]+、[^\n]*)(?=\n\d+\.)|(\d+、[\w\u4e00-\u9fa5]+)/g
  const types = question.match(typeRegex) || []
  const result: QuestionType[] = []

  let currentType = ''
  let questionCount = 0
  let lastIndex = 0

  for (let i = 0; i <= types.length; i++) {
    const currentMatch = types[i]
    const currentIndex = question.indexOf(currentMatch, lastIndex)

    if (currentType) {
      const subString = question.slice(
        lastIndex,
        currentIndex !== -1 ? currentIndex : undefined
      )
      questionCount = (subString.match(/\n\d+\./g) || []).length

      result.push({ type: currentType, amount: questionCount })
    }

    if (currentMatch) {
      currentType = currentMatch
      questionCount = 0
      lastIndex = currentIndex + currentMatch.length
    }
  }
  console.log('amount:', result)

  return result
}

/**
 *
 * @param content 试题原始内容
 * @returns 分类后的问题内容数组
 */
export function GetQuestionCategory(content: string): string[] {
  const allQuestion = GetAllQuestions(content)
  const allQuestionClass = GetAllQuestionClass(content)

  // 分类后的问题列表
  const questionsList = []
  // 从allQuestionClass的第一个元素开始，使用它作为分隔符分割question字符串
  for (let i = 0; i < allQuestionClass.length; i++) {
    // 如果不是最后一个元素，找到当前元素和下一个元素之间的内容
    if (i < allQuestionClass.length - 1) {
      const startIndex =
        allQuestion.indexOf(allQuestionClass[i]) + allQuestionClass[i].length
      const endIndex = allQuestion.indexOf(allQuestionClass[i + 1])
      const section = allQuestion.substring(startIndex, endIndex).trim()
      questionsList.push(section)
    } else {
      // 如果是最后一个元素，从当前元素到最后
      const startIndex =
        allQuestion.indexOf(allQuestionClass[i]) + allQuestionClass[i].length
      const section = allQuestion.substring(startIndex).trim()
      questionsList.push(section)
    }
  }
  return questionsList
}

// const questions = parseQuestions(allQuestion)
// console.log(JSON.stringify(questions, null, 2))

// --------------
/**
 *
 * @param content 原始问题内容
 * @returns 问题 json 对象
 */
export default function GetQuestionsJson(content: string): Question[] {
  const allQuestion = GetAllQuestions(content)
  // const allQuestionClass = GetAllQuestionClass(content)
  const questionObj = GetQuestionsObj(allQuestion)
  console.log('questionObj:', questionObj)
  const questionCategory = GetQuestionCategory(content)

  console.log('questionCategory:', questionCategory)

  // --------
  return questionObj
}

//   return '' // 如果没有找到匹配项，返回空字符串
// }
