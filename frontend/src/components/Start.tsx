'use client'
import VideoThumb from '@/src/public/images/hero-image-01.jpg'

// 这是默认显示的页面
export default function Start() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Illustration behind hero content */}
        <div
          className="absolute left-0 bottom-0 -ml-20 hidden lg:block pointer-events-none"
          aria-hidden="true"
          data-aos="fade-up"
          data-aos-delay="400"
        ></div>

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Pink Mammoth
            </h1>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Hi，这里是粉红猛犸，我们是一个 Web3 社区，致力于传播 Web3
              的技术与前沿信息。
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a
                  className="btn text-white bg-pink-400 hover:bg-pink-600 w-full mb-4 sm:w-auto sm:mb-0"
                  href="#"
                >
                  <p>开始</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
