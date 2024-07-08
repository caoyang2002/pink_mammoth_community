'use client'
import React, { useEffect } from 'react'
import AOS from 'aos'

const Developing = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="space-y-4" data-aos="fade-up" data-aos-duration="1000">
        <p className="text-lg" data-aos="fade-down" data-aos-delay="500">
          哎呀，这里还在装修呢...
        </p>
        <div
          className="img-coming-soon"
          data-aos="flip-left"
          data-aos-duration="1000"
        >
          {/* 在这里添加有趣的插图或动画 */}
        </div>

        <div
          className="notfound-btn-container"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <a className="notfound-btn text-pink-400 " href="/">
            返回首页
          </a>
        </div>
      </div>
    </div>
  )
}

export default Developing
