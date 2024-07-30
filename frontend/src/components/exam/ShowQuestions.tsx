import React from 'react'
import GetQuestionsJson from './GetQuestions'
import { Question } from './GetQuestions'
export interface SingleChoiceQuestionsProps {
  question: Question[]
  amount: number[]
}
/**
 *
 * @param param 单个问题 例如：{question:{title:"xxx",option:['a','b','c','d']}}
 * @returns 渲染单个问题
 */
export const SingleChoiceQuestions: React.FC<SingleChoiceQuestionsProps> = ({
  question,
  amount,
}) => {
  // 使用 slice 方法获取前 'amount' 个问题
  const limitedQuestions = question.slice(0, amount[0])

  return (
    <>
      <div>
        {/* 渲染限定数量的问题 */}
        {limitedQuestions.map((q, index) => (
          <div key={index}>
            <h3>{q.title}</h3>
            {q.options.map((option, idx) => (
              <div key={idx}>
                <label>
                  <input
                    className="ml-4 mr-2"
                    type="radio"
                    name={`question_${index}`}
                    value={option}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

interface MultipleChoiceQuestionsProps {
  partDetails: {
    section: string
    type: string
    questions: Array<{ question: string; options: string[] }>
  }
}

export const MultipleChoiceQuestions: React.FC<
  MultipleChoiceQuestionsProps
> = ({ partDetails }) => {
  return (
    <div>
      <h3>{partDetails.section}</h3>
      {/* {partDetails.questions.map((question, idx) => (
        <div key={idx}>
          <p>{question.question}</p>
          {question.options.map((option, optIdx) => (
            <label key={optIdx}>
              <input type="checkbox" name={question.question} /> {option}
            </label>
          ))}
        </div>
      ))} */}
    </div>
  )
}

interface DefaultQuestionsProps {
  partDetails: {
    section: string
    type: string
    // 可以添加其他需要的属性
  }
}

export const DefaultQuestions: React.FC<DefaultQuestionsProps> = ({
  partDetails,
}) => {
  // 这里可以添加默认情况下的渲染逻辑
  return (
    <div>
      <h3>{partDetails.section}</h3>
      <p>默认情况下的题目类型</p>
      {/* 根据需要渲染内容 */}
    </div>
  )
}

export default DefaultQuestions
