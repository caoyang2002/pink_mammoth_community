'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface TypewriterProps {
  originalText: string
  destination?: string
}
const Typewriter: React.FC<TypewriterProps> = ({
  originalText,
  destination,
}) => {
  const [text, setText] = useState('')
  // const navigate = useNavigate()
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < originalText.length - 1) {
        setText((prevText) => prevText + originalText[currentIndex])
        currentIndex++
      } else {
        clearInterval(interval)
        if (destination && destination.trim() !== '') {
          timerRef.current = window.setTimeout(() => {
            // navigate(destination)
          }, 1000) // 在1秒后跳转到目标页面
        }
      }
    }, 100)

    return () => {
      clearInterval(interval)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [originalText, destination])

  return (
    <div className="typewriter">
      <h1>{text}</h1>
    </div>
  )
}

export default Typewriter
