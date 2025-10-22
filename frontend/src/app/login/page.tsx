'use client'

import Navbar from '../navbar/navbar_welcome'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import api from '../../../functions/api'
import { useAuth } from '@/context/AuthContext'
import { IUser } from '@/context/AuthContext'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post(`${url}/api/v1/auth/login`, { email, password }, { withCredentials: true })
            const user: IUser = {
                email: response.data.data.email,
                username: response.data.data.username
            }
            login(user)
            router.push('/todo')
        } catch (error) {
            console.error(error)
            alert('Login failed. Please check your credentials.')
        }
    }

    return (
        <div 
            className="relative flex items-center justify-center h-screen w-full font-inter overflow-hidden"
        >
            {/* Navbar */}
            <Navbar navbar_word='Register Now!' />

            {/* Background logo pattern */}
            <div
                className="mt-19 absolute inset-0 bg-[url('/logo.png')] bg-cover bg-center opacity-45"
                style={{
                    backgroundRepeat: 'repeat',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Gradient overlay for contrast */}
            <div className="absolute mt-19 inset-0 bg-gradient-to-b from-blue-900/60 to-blue-950/70"></div>

            {/* Login Box */}
            <div className="mt-12 relative h-120 z-10 w-8/9 max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600">Welcome Back 👋</h1>
                    <p className="text-gray-500 text-sm">
                        Organize your world, chase your goals, and conquer your day.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-500">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-blue-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="superman171@gmail.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-500">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-blue-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-blue-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="It's a secret"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-blue-400" /> : <Eye className="h-5 w-5 text-blue-400" />}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <a href="#" className="text-sm text-blue-400 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don’t have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline font-medium">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
