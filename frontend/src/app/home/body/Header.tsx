'use client'
import Link from 'next/link'
import WalletButtons from '@/src/components/WalletButtons'
import PinkMammothLogo from '@/src/static/PinkMammothLogo'
// import '@/src/app/styles/additional-styles/theme.css'
// import '@/src/app/styles/style.css'

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
          href="/learning"
          style={{ textDecoration: 'none' }}
          className="text-white text-xs hover:text-pink-600 transition duration-150 ease-in-out"
        >
          <p>学习</p>
        </a>

        <div className="flex items-center justify-end grow">
          <WalletButtons />
        </div>
      </nav>
    </header>
  )
}
