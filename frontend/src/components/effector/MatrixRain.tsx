import React, { useRef, useEffect } from 'react'
import localFont from 'next/font/local'
const pixelText = localFont({
  src: '../../styles/fonts/fusion-pixel-12px-proportional-zh_hans.woff2',
})
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvas.getContext) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const txts = '01'
    const txtsArray = txts.split('')
    const fontSize = 30 // Adjust font size to limit columns
    const columns = Math.min(canvas.width / fontSize, 1000) // Limit columns to avoid too large array
    const drops = Array.from({ length: columns }, () => 0) // Initialize drops array

    const resizeCanvas = () => {
      if (canvas) {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
      }
    } // No useCallback needed here

    const draw = () => {
      // 设置背景颜色，使用半透明的黑色填充整个 canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 设置文本颜色为绿色
      ctx.fillStyle = '#0F0'
      // 设置字体样式和大小
      ctx.font = `${fontSize}px ${pixelText}`

      // 遍历 drops 数组，该数组存储了每个字符的垂直位置
      for (let i = 0; i < drops.length; i++) {
        // 从 txtsArray 中随机选择一个字符
        const text = txtsArray[Math.floor(Math.random() * txtsArray.length)]
        // 在 canvas 上绘制字符
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        // 检查字符是否到达屏幕底部或需要重置位置
        if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
          // 重置字符的位置
          drops[i] = 0
        }

        // 将字符向下移动，增加其垂直位置
        drops[i]++
      }
    }

    const animate = () => {
      draw()
      requestAnimationFrame(() => {
        // 在这里添加延时
        setTimeout(animate, 60) // 约 30 FPS
      })
    }

    resizeCanvas() // Set canvas size on mount
    window.addEventListener('resize', resizeCanvas)

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, []) // Empty dependency array ensures this effect runs only on mount

  return (
    <>
      {/* <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      /> */}
      <div className="relative h-full w-full overflow-hidden">
        <canvas
          className="fixed top-0 left-0 h-full w-full"
          ref={canvasRef}
          // style={{
          //   width: '100%',
          //   height: '100%',
          // }}
        />
      </div>
    </>
  )
}

export default MatrixRain
