'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import { PropsWithChildren } from 'react'
import { KeylessAccountProvider } from '@/context/KeylessAccountContext'
export default function RootLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">
        {/* <PageIllustration /> */}

        <KeylessAccountProvider>{children}</KeylessAccountProvider>
        {/* {children} */}
      </main>

      <Footer />
    </>
  )
}
