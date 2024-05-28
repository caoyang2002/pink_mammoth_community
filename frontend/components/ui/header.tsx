"use client";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import "../../app/css/additional-styles/theme.css";
import { useState } from "react";

// Navbar
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    // <header className="absolute w-full z-30">

    <header className="fixed w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <nav className="flex items-center  md:flex md:grow w-full bg-blue bg-opacity-100 p-4">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link href="/" className="block" aria-label="Cruip">
                <svg
                  className="w-8 h-8 fill-pink text-purple-600"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="pink"
                >
                  {/* <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" /> */}
                  <path d="M 0 30 H 10 V 40 H 20 V 20 H 30 V 10 H 40 V0 H 60 V10 H 70 V 20 H 80 V 30 H 90 V 40 H 100 V 80 H 90 V 70 H 70 V 80 H 60 V 70 H 50 V 80 H 40 V 60 H 30 V 50 H 0 V 30 L 0 30" />
                  <rect x="40" y="20" width="10" height="10" fill="#000000" />
                </svg>
              </Link>
            </div>

            {/* Desktop navigation */}
            {/* <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-pink-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out ">
                  登陆
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-pink-600 hover:bg-pink-700 ml-3">
                  注册
                </Link>
              </li>
            </ul>
          </nav> */}

            {/* Desktop sign in links */}
            {/* Navigation links */}
            <ul className="hidden md:flex items-center space-x-6">
              <li
                className="menu-item relative"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <a
                  href="#"
                  className="text-gray-700 hover:text-pink-600 transition duration-150 ease-in-out"
                >
                  Home
                </a>
                {/* 添加子菜单容器 */}
                <div className="hidden absolute top-full left-0 py-2 bg-white shadow-md">
                  <a
                    href="#"
                    className="block px-4 py-1 text-gray-700 hover:text-pink-600"
                  >
                    Submenu Item 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-1 text-gray-700 hover:text-pink-600"
                  >
                    Submenu Item 2
                  </a>
                  {/* 更多子菜单项... */}
                </div>
              </li>
              {/* 其他菜单项 */}
            </ul>
            {/* 用户 */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-pink-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  登陆
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="btn-sm text-white bg-pink-600 hover:bg-pink-700 ml-3"
                >
                  注册
                </Link>
              </li>
            </ul>

            {/* Menu button for small screens */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="block text-gray-800 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 汉堡菜单图标 */}
                </svg>
              </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                {/* Mobile menu content */}
                <ul className="bg-white absolute top-0 left-0 right-0 mt-16 p-4 shadow-md">
                  <li>
                    <Link
                      href="/signin"
                      className="block py-2 text-pink-600 hover:text-gray-200 transition duration-150 ease-in-out"
                    >
                      登陆
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block py-2 text-pink-600 hover:text-gray-200 transition duration-150 ease-in-out"
                    >
                      注册
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
