'use client'
import React, { useState, useEffect } from 'react'
import GetMeta from './GetMeta'
import { Answer, GetAnswerArray } from './GetAnswers'
import GetQuestions, { GetQuestionsAmount, QuestionType } from './GetQuestions'
//@ts-ignore
import * as yaml from 'js-yaml'
import {
  SingleChoiceQuestions,
  MultipleChoiceQuestions,
  ToFQuestions,
} from './ShowQuestions'
import { Question } from './GetQuestions'
import { GetQuestionCategory } from './GetQuestions'
import Popover from '../ui/Popover'

const Rendering = () => {
  const [fileContent, setFileContent] = useState<string>('')
  const [answers, setAnswers] = useState<Answer[]>([])
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
          setAnswers(GetAnswerArray(data))
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
                    <div>
                      {/* <p>{part.section}</p> */}
                      {
                        // 获取问题数量

                        // 根据 part.section 的值来决定渲染什么内容
                        part.section === '一、单选题' ? (
                          <>
                            {' '}
                            <p>{part.section}</p>
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
                          </>
                        ) : part.section === '二、多选题' ? (
                          <>
                            <p>{part.section}</p>
                            <MultipleChoiceQuestions
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
                          </>
                        ) : part.section === '三、判断题' ? (
                          <>
                            <p>{part.section}</p>
                            <ToFQuestions
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
                          </>
                        ) : (
                          <p>ERROR</p>
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
      <div className="bg-gray ">
        <h2>答案</h2>

        {question.map((questionData, questionIndex) => {
          const answer = answers.find((a) => a.sort === questionIndex + 1)

          return (
            <div key={questionIndex}>
              {questionData.title}
              {answer ? (
                <p>答案：{answer.option.join(', ')}</p>
              ) : (
                <p>暂无答案</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // 处理答案是否显示
  const handleFinish = () => {
    setShowAnswers(true)
  }
  const handleCheck = () => {
    setShowAnswers(false)
  }
  return (
    <div>
      {renderQuestionAndMeta()}
      {/* {questions.map(renderQuestion)} */}
      <Popover
        level="info"
        content="开始答题"
        onClose={handleCheck}
        // autoClose={true} // 设置为 true 表示自动关闭
        closeDelay={5000} // 设置为 5 秒后自动关闭
      />
      <button
        className="border-2 pt-1 pd-1 pl-1 pr-1 hover:bg-pink-300 hover:text-black"
        onClick={handleFinish}
      >
        完成答题
      </button>
      {showAnswers && renderAnswers()}
    </div>
  )
}

export default Rendering
