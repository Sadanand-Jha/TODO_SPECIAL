'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import api from '../../../functions/api'
import { Divide } from 'lucide-react'

interface NavbarProps {
  navbar_word: string;
}

export default function Navbar({ navbar_word }: NavbarProps) {
  const router = useRouter()


  const [loginR, setLoginR] = useState(false)

  // if (navbar_word == 'Register Now!' || navbar_word == 'Home') {
  //   setLoginR(true)
  // }


  const url = process.env.NEXT_PUBLIC_BACKEND_URL

  const { AuthUser, setAuthUser, logout } = useAuth()

  const routeit = () => {
    if (navbar_word === "Get Started! 🚀" || navbar_word === "Let's Go!") {
      router.push("/todo")
    }
    else if (navbar_word === 'Register Now!') {
      router.push('/register')
    }
    else {
      router.push("/profile")
    }
  }

  const lgtBtn = async () => {
    try {
      logout()
      const res = await api.get(`${url}/api/v1/auth/logout`)
      router.push("/login")
    } catch (error) {
      console.log(`issue from lgtbtn `, error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700 shadow-sm transition-all duration-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo + Brand */}
        <a href="/todo" className="flex items-center space-x-3">
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

        {/* Profile / Get Started Button */}
        <div>
          <button
            onClick={routeit}
            className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold rounded-lg text-sm px-6 py-2 transition-all duration-300 hover:scale-105 shadow-md focus:ring-4 focus:ring-blue-300"
          >
            {navbar_word}
          </button>
          {/* {!loginR && (
            <button
              onClick={lgtBtn}
              className="text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 font-semibold rounded-lg text-sm px-6 py-2 transition-all duration-300 hover:scale-105 shadow-md ml-8 focus:ring-4 focus:ring-blue-300"
            >
              Logout
            </button>
          )} */}

        </div>

      </div>
    </nav>
  )
}
