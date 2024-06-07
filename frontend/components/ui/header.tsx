'use client'
import Link from 'next/link'
import '@/app/css/additional-styles/theme.css'
import WalletButtons from '../WalletButtons'
import PinkMammothLogo from '@/app/static/PinkMammothLogo'

// 顶部导航栏
export default function Header() {
  return (
    <header className="fixed w-full z-30 bg-black">
      <nav className="flex items-center  md:flex md:grow w-full bg-blue bg-opacity-100 p-4">
        <div className="shrink-0 mr-4">
          <Link href="/" className="block" aria-label="Cruip">
            <PinkMammothLogo />
          </Link>{' '}
        </div>
        <a
          href="#"
          style={{ textDecoration: 'none' }}
          className="text-gray-700 hover:text-pink-600 transition duration-150 ease-in-out"
        >
          <p style={{ fontWeight: 'bold' }}>Pink Mammoth Community</p>
        </a>
        <div className="flex items-center justify-end grow">
          <WalletButtons />
        </div>
      </nav>
    </header>
  )
}
