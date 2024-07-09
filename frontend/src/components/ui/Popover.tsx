// import React, { useEffect, useState } from 'react'
import '@/src/styles/popover.css'

// interface PopoverProps {
//   level: 'info' | 'success' | 'warning' | 'error'
//   content: React.ReactNode
//   onClose: () => void
//   autoClose: boolean
//   closeDelay: number // 只在 autoClose 为 true 时使用
// }

// const Popover: React.FC<PopoverProps> = ({
//   level,
//   content,
//   onClose,
//   autoClose,
//   closeDelay,
// }) => {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     // 只在 autoClose 为 true 时设置定时器
//     if (autoClose && isVisible) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onClose() // 调用 onClose 回调函数
//       }, closeDelay)

//       return () => clearTimeout(timer) // 组件卸载时清除定时器
//     }
//   }, [autoClose, isVisible, closeDelay])

//   if (!isVisible) return null // 如果不可见，则不渲染弹窗

//   const className = `popover popover-${level}`

//   const handleClose = () => {
//     setIsVisible(false)
//     onClose() // 调用 onClose 回调函数
//   }

//   return (
//     <div className={className}>
//       <div className="popover-header">
//         <span className="popover-title">消息</span>
//         <button className="popover-close" onClick={handleClose}>
//           &times;
//         </button>
//       </div>
//       <div className="popover-body">{content}</div>
//     </div>
//   )
// }

// export default Popover

import React, { useState, useEffect } from 'react'

// Popover 组件的属性接口
interface PopoverProps {
  level: 'info' | 'success' | 'warning' | 'error'
  content: React.ReactNode
  onClose: () => void // 父组件提供的关闭弹窗的回调函数
  closeDelay: number // 自动关闭的延迟时间，0 表示手动关闭
}

const Popover: React.FC<PopoverProps> = ({
  level,
  content,
  onClose,
  closeDelay,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (closeDelay > 0) {
      // 如果 closeDelay 大于 0，设置定时器自动关闭弹窗
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose() // 调用父组件提供的 onClose 回调函数
      }, closeDelay)

      return () => clearTimeout(timer) // 组件卸载时清除定时器
    }
  }, [closeDelay, onClose])

  // 弹窗的类名，根据 level 属性动态生成
  const className = `popover popover-${level}`

  if (!isVisible) return null // 如果不可见，则不渲染弹窗

  const handleManualClose = () => {
    setIsVisible(false)
    onClose() // 手动关闭时调用 onClose 回调函数
  }

  return (
    <div className={className}>
      <div className="popover-header">
        <span className="popover-title">消息</span>
        {/* 根据 closeDelay 的值决定是否显示关闭按钮 */}
        {closeDelay !== 0 && (
          <button className="popover-close" onClick={handleManualClose}>
            &times;
          </button>
        )}
      </div>
      <div className="popover-body">{content}</div>
    </div>
  )
}

export default Popover
