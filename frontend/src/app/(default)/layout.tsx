'use client'
import './styles/style.css'
import './styles/globals.css'
// import '@/src/app/styles/additional-styles/theme.css'
//--------------
import { PropsWithChildren } from 'react'
// import { KeylessAccountProvider } from '@/src/context/KeylessAccountContext'
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
      <body className="grow">{children}</body>
    </html>
  )
}
