'use client'
import Link from 'next/link'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import PinkMammothLogo from '@/src/static/PinkMammothLogo'
import '@/src/styles/wallet.css'
import Test from '@/src/components/test'
import { SparkleIcon } from 'lucide-react'
import Wallet from './Wallet'
import LanguageIcon from '../static/actionIcon/LanguageIcon'

// 顶部导航栏
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full pt-0 mb-0 bg-black">
      <nav className="flex items-center  md:flex md:grow w-full bg-blue bg-opacity-100 p-3">
        <div className="shrink-0 mr-4">
          <Link href="/" className="block" aria-label="back to home">
            <PinkMammothLogo />
          </Link>{' '}
        </div>
        <div
          className="flex items-center space-x-4"
          style={{ alignItems: 'center' }}
        >
          <a
            href="/learning"
            className="text-white text-lg hover:text-pink-600 transition duration-150 ease-in-out"
          >
            <p>学习</p>
          </a>
          <a
            href="/exam"
            className="text-white text-lg hover:text-pink-600 transition duration-150 ease-in-out"
          >
            <p>测试</p>
          </a>
        </div>

        <div className="flex items-center justify-end grow mr-16">
          <Wallet />
        </div>
        <div className="flex items-center justify-end  mr-4">
          <LanguageIcon />
        </div>
      </nav>
    </header>
  )
}
