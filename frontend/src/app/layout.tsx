'use client'
import '@/src/styles/style.css'
import '@/src/styles/globals.css'
//--------------
import { PropsWithChildren } from 'react'
import { KeylessAccountProvider } from '@/src/context/KeylessAccountContext'
import AOS from 'aos'
import { useEffect } from 'react'
import 'aos/dist/aos.css'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

import { PetraWallet } from 'petra-plugin-wallet-adapter' // petra 钱包适配器插件
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react' // aptos 的钱包适配器 react 组件
import React from 'react'

const wallets = [new PetraWallet()]
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
          name="pink mammoth"
          content="Where the wild world of NFTs comes alive in pink!"
        />
      </head>
      <body className="grow">
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
          <Header />

          {children}
          <Footer />
        </AptosWalletAdapterProvider>
      </body>
    </html>
  )
}
