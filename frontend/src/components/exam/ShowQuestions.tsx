// import React from 'react'
import GetQuestionsJson from './GetQuestions'
import { Question } from './GetQuestions'
export interface SingleChoiceQuestionsProps {
  question: Question[]
  amount: number[]
}
import React, { useState } from 'react'

interface UserAnswer {
  title: string
  selectedOption: string
}

export const SingleChoiceQuestions: React.FC<SingleChoiceQuestionsProps> = ({
  question,
  amount,
}) => {
  const limitedQuestions = question.slice(0, amount[0])
  const [userAnswers, setAnswers] = useState<UserAnswer[]>([])

  const handleOptionChange = (
    questionTitle: string,
    selectedOption: string
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.title === questionTitle
      )
      if (existingAnswerIndex !== -1) {
        // 如果已经有答案，更新它
        const newAnswers = [...prevAnswers]
        newAnswers[existingAnswerIndex] = {
          title: questionTitle,
          selectedOption,
        }
        return newAnswers
      } else {
        // 如果是新答案，添加它
        return [...prevAnswers, { title: questionTitle, selectedOption }]
      }
    })
  }

  return (
    <>
      <div className="mt-4 mb-4">
        {limitedQuestions.map((question, index) => (
          <div className="mt-2" key={index}>
            <h3>{question.title}</h3>
            {question.options.map((option, idx) => (
              <div key={idx}>
                <label>
                  <input
                    className="ml-4 mr-2"
                    type="radio"
                    name={`question_${index}`}
                    value={option}
                    onChange={() => handleOptionChange(question.title, option)}
                    checked={
                      userAnswers.find((a) => a.title === question.title)
                        ?.selectedOption === option
                    }
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* 显示用户的选择 */}
      <div>
        <h4>您的选择：</h4>
        {userAnswers.map((answer, index) => (
          <p key={index}>
            {answer.title}: {answer.selectedOption}
          </p>
        ))}
      </div>
    </>
  )
}

/**
 *
 * @param param0
 * @returns
 */
export const MultipleChoiceQuestions: React.FC<SingleChoiceQuestionsProps> = ({
  question,
  amount,
}) => {
  // 使用 slice 方法获取前 'amount' 个问题
  const limitedQuestions = question.slice(amount[0], amount[0] + amount[1])

  console.log('mut:', limitedQuestions)
  return (
    <>
      <div className="mt-4 mb-4">
        {/* 渲染限定数量的问题 */}
        {limitedQuestions.map((question, index) => (
          <div className="mt-2" key={index}>
            <h3>{question.title}</h3>
            {question.options.map((option, idx) => (
              <div key={idx}>
                <label>
                  <input
                    className="ml-4 mr-2"
                    type="checkbox"
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

/**
 *
 * @param param0
 * @returns
 */
export const ToFQuestions: React.FC<SingleChoiceQuestionsProps> = ({
  question,
  amount,
}) => {
  // 使用 slice 方法获取前 'amount' 个问题
  const limitedQuestions = question.slice(
    amount[0] + amount[1],
    amount[0] + amount[1] + amount[2]
  )

  console.log('tof:', limitedQuestions)
  return (
    <>
      <div className="mt-4 mb-4">
        {/* 渲染限定数量的问题 */}
        {limitedQuestions.map((question, index) => (
          <div className="mt-2" key={index}>
            <h3>{question.title}</h3>
            {question.options.map((option, idx) => (
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

export default ToFQuestions
