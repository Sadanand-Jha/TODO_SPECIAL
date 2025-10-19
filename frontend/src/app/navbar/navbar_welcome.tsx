'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  navbar_word: string;
}

export default function Navbar({ navbar_word }: NavbarProps) {
  const router = useRouter()

  const routeit = () => {
    if(navbar_word == "Get Started! 🚀") router.push("/todo")
    else if(navbar_word == "Let's Go!") router.push("/todo")
    else router.push("/profile")
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700 transition-all duration-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        
        {/* Logo + Brand */}
        <a href="/todo" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo.png"
            height={45}
            width={45}
            alt="Doingo Logo"
            className="rounded-full hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent tracking-wide">
            Doingo
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-blue-700 font-semibold hover:text-blue-900 transition-colors">Home</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Services</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</a>
        </div>

        {/* Profile Button */}
        <button
          onClick={routeit}
          className="text-white bg-gradient-to-r cursor-pointer from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-6 py-2 transition-all duration-300 hover:scale-105 shadow-md"
        >
          {navbar_word}
        </button>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="md:hidden inline-flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}
