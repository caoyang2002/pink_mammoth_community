'use client'
import React, { useState, useEffect } from 'react'
import GetMeta from './GetMeta'
import GetAnswers from './GetAnswers'
import GetQuestions, { GetQuestionsAmount, QuestionType } from './GetQuestions'
//@ts-ignore
import * as yaml from 'js-yaml'
import {
  SingleChoiceQuestions,
  MultipleChoiceQuestions,
  DefaultQuestions,
  SingleChoiceQuestionsProps,
} from './ShowQuestions'
import { Question } from './GetQuestions'
import { GetQuestionCategory } from './GetQuestions'

const questions = [
  {
    type: 'single',
    question: '什么是Web3？',
    options: [
      '一种新的互联网协议',
      '一个去中心化的应用程序平台',
      '一种加密货币',
      '以上都不是',
    ],
    answer: 'E',
  },
  // ... 其他题目
]

// const answers = [
//   'E',
//   'E',
//   'E',
//   'E',
//   'B',
//   'E',
//   'A',
//   'A',
//   'A',
//   // ... 其他答案
// ]

const Rendering = () => {
  const [fileContent, setFileContent] = useState<string>('')
  const [answers, setAnswers] = useState<string>('')
  const [meta, setMeta] = useState<string>('')
  const [question, setQuestions] = useState<Question[]>([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [questionCategory, setQuestionCategory] = useState<string[]>([])
  const [questionAmount, setQuestionAmount] = useState<QuestionType[]>([])
  useEffect(() => {
    const loadFile = async () => {
      // 假设你想获取的文件名是 "example.txt"
      const examName = '1.txt'
      const response = await fetch(`/api/exam?examName=${examName}`, {
        method: 'GET', // 确保是GET请求
      })

      if (response.ok) {
        const data = await response.text()
        setFileContent(data)

        if (data) {
          setMeta(GetMeta(data))
          setAnswers(GetAnswers(data))
          setQuestions(GetQuestions(data))
          setQuestionCategory(GetQuestionCategory(data))
          setQuestionAmount(GetQuestionsAmount(data))
        }
      } else {
        setFileContent('Error loading file')
      }
    }

    loadFile()
  }, []) // 空依赖数组意味着这个 effect 只会在组件挂载后运行一次

  // console.log('meta:', meta)
  // console.log('answers:', answers)
  // 加载yaml-meta
  const metaData = yaml.load(meta)
  // console.log('title:', metaData)
  //TODO

  // 加载 yaml-questions
  // const questionData = yaml.load(question)
  // console.log('question: ', questionData)

  // 渲染试题元数据
  const renderQuestionAndMeta = () => {
    return (
      <div>
        {metaData ? (
          <div>
            <div className="flex justify-center text-center">
              <div className="text-left w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">{metaData.title}</h1>
                <p className="mb-2">总分: {metaData.total_score}</p>
                <p>答题时间: {metaData.Maximum} 分钟</p>
                <p>--------------------------------------</p>

                {metaData.part_score.map((part: any, index: any) => (
                  <div key={index}>
                    <p>{part[0]}</p>
                    <div>
                      {/* <p>{part.section}</p> */}
                      {
                        // 获取问题数量

                        // 根据 part.section 的值来决定渲染什么内容
                        part.section === '一、单选题' ? (
                          <SingleChoiceQuestions
                            question={question.map((data) => {
                              return {
                                title: data.title,
                                options: data.options,
                              }
                            })}
                            amount={questionAmount.map((data) => {
                              // console.log('amount', data.amount)
                              return data.amount
                            })}
                          />
                        ) : // <p>{questionCategory[0]}</p>
                        // <SingleChoiceQuestions questions={question} />
                        part.section === '二、多选题' ? (
                          <MultipleChoiceQuestions partDetails={part} />
                        ) : (
                          // 默认情况下渲染的内容
                          <DefaultQuestions partDetails={part} />
                        )
                      }
                    </div>

                    {/* <p>类型: {part.type}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  // 渲染答案
  const renderAnswers = () => {
    return (
      <div>
        <h2>答案</h2>
        {questions.map((question, index) => (
          <div key={index}>
            {question.question}
            {answers[index] === '正确' ? '√' : 'x'}
          </div>
        ))}
      </div>
    )
  }

  // 处理答案是否显示
  const handleFinish = () => {
    setShowAnswers(true)
  }

  return (
    <div>
      {renderQuestionAndMeta()}
      {/* {questions.map(renderQuestion)} */}
      <button onClick={handleFinish}>完成答题</button>
      {showAnswers && renderAnswers()}
    </div>
  )
}

export default Rendering
