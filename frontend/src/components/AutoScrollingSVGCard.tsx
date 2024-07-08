'use client'
import React, { useState, useEffect, useRef } from 'react'

interface AutoScrollingSVGCardProps {
  children: React.ReactNode
  intervalTime?: number
}

const AutoScrollingSVGCard: React.FC<AutoScrollingSVGCardProps> = ({
  children,
  intervalTime = 5000,
}) => {
  // 使用useState定义滚动位置状态，默认为 0
  const [scrollPosition, setScrollPosition] = useState(0)
  // 使用useRef创建对HTMLDivElement的引用
  const scrollRef = useRef<HTMLDivElement | null>(null)
  // 使用useRef记录容器宽度，初始化为0
  const containerWidth = useRef<number>(0)
  const childrenArray = React.Children.toArray(children)

  // 用于初始化容器宽度
  useEffect(() => {
    if (scrollRef.current) {
      containerWidth.current = scrollRef.current.clientWidth
    }
  }, [])
  // 用于设置自动滚动逻辑
  useEffect(() => {
    if (scrollRef.current && containerWidth.current > 0) {
      // 设置定时器，定时触发滚动
      const intervalId = setInterval(() => {
        const newPosition = scrollPosition - containerWidth.current
        setScrollPosition(newPosition)
      }, intervalTime)

      return () => clearInterval(intervalId)
    }
  }, [scrollPosition, intervalTime, containerWidth])
  // 定义滚动处理函数，当滚动到末尾时重置滚动位置

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft >= scrollWidth - clientWidth) {
        console.log('scollLeft', scrollLeft)
        scrollRef.current.scrollLeft = 0
      }
      // 当滚动到末尾时，将超出部分拼接到当前元素的最后面
      if (scrollLeft >= scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = Math.max(
          0,
          scrollWidth - clientWidth - containerWidth.current
        )
      }
    }
  }

  return (
    <>
      {/* <div className="scroll-container" ref={scrollRef} onScroll={handleScroll}>
        <div
          className="scroll-content"
          style={{
            width: '100%',
            transition: 'transform 5s ease',
            transform: `translateX(${scrollPosition}px)`,
          }}
        >
          {children}
        </div>
      </div> */}

      <div className="scroll-container" ref={scrollRef} onScroll={handleScroll}>
        <div
          className="scroll-content"
          style={{
            display: 'flex', // 使用flex布局来排列子元素
            width: `${(childrenArray.length + 1) * containerWidth.current}px`, // 计算总宽度
            transition: 'transform 5s ease', // 平滑滚动动画
            transform: `translateX(${scrollPosition}px)`, // 应用滚动位置的变换
          }}
        >
          {children}
          {/* 将第一个子元素复制并追加到子元素列表的末尾，实现循环效果 */}
          {React.Children.toArray(children).map((child, index) => (
            <div key={index + childrenArray.length}>{child}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AutoScrollingSVGCard
