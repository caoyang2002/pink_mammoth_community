import './styles/style.css'
import './styles/globals.css'
import '@/src/app/styles/additional-styles/theme.css'

import { Body } from '@/src/app/home/Body'
import ClientOnly from '@/src/components/ClientOnly'
import localFont from 'next/font/local'

export const metadata = {
  title: 'Pink Mammoth',
  description: 'we are web3 community',
}

const kongtext = localFont({
  src: './../public/fonts/kongtext.ttf',
  variable: '--font-kongtext',
})

export default function Home() {
  return (
    <>
      <div className={kongtext.className}>
        <div className="fnt-inter antialiased tracking-tight">
          {/* flex min-h-screen flex-col items-center justify-between */}
          <ClientOnly>
            <Body />
          </ClientOnly>
        </div>
      </div>
    </>
  )
}
