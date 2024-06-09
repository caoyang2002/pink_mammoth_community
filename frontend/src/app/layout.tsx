'use client'
import { PropsWithChildren } from 'react'
import { KeylessAccountProvider } from '@/src/context/KeylessAccountContext'
import AOS from 'aos'
import { useEffect } from 'react'
import 'aos/dist/aos.css'

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
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Rnm3DL87HNmPncIFwBLXPhy-WGFDXIyplSL4fRtnFsA"
        />
      </head>
      <body className="grow">
        <KeylessAccountProvider>{children}</KeylessAccountProvider>
      </body>
    </html>
  )
}
