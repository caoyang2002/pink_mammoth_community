// pages/index.js 或其他客户端组件文件
'use client'
import React, { useState, useEffect } from 'react'

const Rendering = () => {
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    const loadFile = async () => {
      // 假设你想获取的文件名是 "example.txt"
      const examName = '1.txt'
      const response = await fetch(`/api/exam?examName=${examName}`, {
        method: 'GET', // 确保是GET请求
      })

      console.log(response)
      if (response.ok) {
        const data = await response.text()
        setFileContent(data)
      } else {
        setFileContent('Error loading file')
      }
    }

    loadFile()
  }, []) // 空依赖数组意味着这个 effect 只会在组件挂载后运行一次

  return (
    <div className="text-white">
      <h1>文本文件内容</h1>
      <p>{fileContent}</p>
      {/* <pre>{fileContent}</pre> */}
    </div>
  )
}

export default Rendering
