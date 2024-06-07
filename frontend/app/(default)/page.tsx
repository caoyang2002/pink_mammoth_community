export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}

import Index from '@/components'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

// 主界面
export default function Home() {
  return (
    <>
      <Index />
      <Features />
      <Zigzag />
      {/* <Testimonials /> */}
      <Newsletter />
    </>
  )
}
