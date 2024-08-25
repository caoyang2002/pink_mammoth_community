'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap' // 确保安装了 GSAP 和 TypeScript 类型定义

// interface ImgData {
//   node: HTMLDivElement
//   x: number
//   y: number
//   mov_x: number
//   mov_y: number
//   ani: any // TODO: 使用更具体的类型替代 'any'
// }

// interface PhotoboxProps {
//   // 如果有额外的 props，在这里定义
// }

// const Photobox: React.FC<PhotoboxProps> = ({ ...props }) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [imgData, setImgData] = useState<ImgData[]>([])

//   useEffect(() => {
//     if (containerRef.current) {
//       init(containerRef.current)
//     }
//   }, [])

//   const init = (container: HTMLDivElement) => {
//     // 初始化操作
//     if (!containerRef.current) return
//     // 使用 querySelectorAll 获取元素列表，并确保它们是 HTMLElement 类型
//     const imgs: HTMLElement[] = Array.from(
//       containerRef.current.querySelectorAll('.photos_line_photo')
//     ) as HTMLElement[]
//     // const container = containerRef.current as HTMLDivElement // 确保 container 是 HTMLDivElement 类型
//     // 现在 imgs 中的元素都有 offsetTop 和 offsetLeft 属性
//     const data: ImgData[] = imgs.map((img) => ({
//       node: img,
//       x: img.offsetLeft,
//       y: img.offsetTop,
//       mov_x: 0,
//       mov_y: 0,
//       ani: null, // 确保 ani 被赋予合适的类型，这里假设为 null
//     })) as ImgData[]

//     // 将数据存储在状态中
//     setImgData(data)

//     const standardWidth = 1440
//     const scaleNums = container.offsetWidth / standardWidth
//     container.style.transform = `scale(${scaleNums})`

//     gsap.to(imgs, {
//       transform: 'translate(0,0)',
//       duration: 0,
//       ease: 'power4.out',
//     })

//     window.addEventListener('resize', handleResize)
//     container.addEventListener('mousedown', handleMousedown)
//     container.addEventListener('mouseup', handleMouseUp)
//     container.addEventListener('mouseleave', handleMouseLeave)
//     container.addEventListener('mousemove', handleMouseMove)
//   }

//   const handleResize = () => {
//     if (containerRef.current) {
//       resize(containerRef.current)
//     }
//   }

//   const resize = (data: HTMLDivElement) => {
//     if (!containerRef.current) return
//     const imgs = Array.from(
//       containerRef.current.querySelectorAll('.photos_line_photo')
//     )
//     const container = containerRef.current
//     const standardWidth = 1440
//     let scaleNums = container.offsetWidth / standardWidth

//     // 更新 container 的 scale 并更新图片数据
//     container.style.transform = `scale(${scaleNums})`
//     imgs.forEach((img) => {
//       const imgData: any = imgData.find((data: any) => data.node === img)
//       if (imgData) {
//         imgData.x = img.offsetLeft
//         imgData.y = img.offsetTop
//       }
//     })
//     gsap.to(imgs, {
//       transform: `translate(0,0)`,
//       duration: 0,
//       ease: 'power4.out',
//     })
//   }

//   const handleMousedown = (event: React.MouseEvent<HTMLDivElement>) => {
//     const nativeEvent = event.nativeEvent
//     // 你的事件处理逻辑，使用 nativeEvent 来代替 event
//   }

//   const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
//     // 鼠标抬起事件处理
//     // 补全 mouseup 逻辑
//   }

//   const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
//     // 鼠标离开事件处理
//     // 补全 mouseleave 逻辑
//   }

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//     // 鼠标移动事件处理
//     move(event.clientX, event.clientY)
//   }

//   const move = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current || !imgData.length) return
//     if (!photobox.if_movable) return
//     const container = containerRef.current
//     const distanceX = (event.clientX - photobox.mouse_x) / photobox.scale_nums
//     const distanceY = (event.clientY - photobox.mouse_y) / photobox.scale_nums

//     imgData.forEach((img) => {
//       img.mov_x -= distanceX
//       img.mov_y -= distanceY

//       // 边界检查和修正
//       if (img.x + img.mov_x > container.offsetWidth) {
//         img.mov_x = container.offsetWidth - img.x
//       } else if (img.x + img.mov_x < 0) {
//         img.mov_x = -img.x
//       }

//       if (img.y + img.mov_y > container.offsetHeight) {
//         img.mov_y = container.offsetHeight - img.y
//       } else if (img.y + img.mov_y < 0) {
//         img.mov_y = -img.y
//       }

//       if (img.ani) {
//         img.ani.kill()
//       }
//       img.ani = gsap.to(img.node, {
//         x: img.mov_x,
//         y: img.mov_y,
//         duration: 0.5,
//         ease: 'power4.out',
//       })
//     })

//     photobox.mouse_x = event.clientX
//     photobox.mouse_y = event.clientY
//   }

//   // 在 useEffect 中添加事件监听器
//   useEffect(() => {
//     if (containerRef.current) {
//       const container = containerRef.current
//       container.addEventListener('mousedown', handleMousedown)
//       container.addEventListener('mouseup', handleMouseUp)
//       container.addEventListener('mouseleave', handleMouseLeave)
//       container.addEventListener('mousemove', handleMouseMove)

//       // 组件卸载时移除事件监听器
//       return () => {
//         container.removeEventListener('mousedown', handleMousedown)
//         container.removeEventListener('mouseup', handleMouseUp)
//         container.removeEventListener('mouseleave', handleMouseLeave)
//         container.removeEventListener('mousemove', handleMouseMove)
//       }
//     }
//   }, [])
function InfiniteSliding() {
  return (
    <div
      className="photos"
      // ref={containerRef}
      // onMouseDown={handleMousedown}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="photos">
        <div className="photos_line">
          <div className="photos_line_photo">
            <img src="/src/photos/photo (1).png" />
          </div>
          <div className="photos_line_photo">
            <img src="../photos/photo (2).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (3).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (4).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (5).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (6).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (7).png" />
          </div>
        </div>
        <div className="photos_line">
          <div className="photos_line_photo">
            <img src="photos/photo (8).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (9).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (10).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (11).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (12).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (13).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (14).png" />
          </div>
        </div>
        <div className="photos_line">
          <div className="photos_line_photo">
            <img src="photos/photo (15).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (16).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (17).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (18).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (19).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (20).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (21).png" />
          </div>
        </div>
        <div className="photos_line">
          <div className="photos_line_photo">
            <img src="photos/photo (22).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (23).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (24).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (25).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (26).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (27).png" />
          </div>
          <div className="photos_line_photo">
            <img src="photos/photo (28).png" />
          </div>
        </div>
      </div>
      {/* 插入你的图片或其他内容 */}
    </div>
  )
}

export default InfiniteSliding
