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

    const { AuthUser, login } = useAuth()
    const url = `http://localhost:4000`
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await api.post(`${url}/api/v1/auth/login`, { email, password }, {
                withCredentials: true
            })
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
        <div className="flex flex-col lg:flex-row h-screen font-inter">
            {/* Left: Login form */}
            <Navbar navbar_word='Register Now!'/>
            <div className="flex-1 mt-20 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold text-blue-500">Welcome Back 👋</h1>
                        <p className="text-gray-500 text-sm">
                            Organize your world, chase your goals, and conquer your day.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-500">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md">
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
                            <div className="mt-1 relative rounded-md">
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
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-blue-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-blue-400" />
                                    )}
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
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative inline-block bg-white px-4 text-sm font-medium text-gray-500">
                            OR
                        </div>
                    </div>

                    {/* Signup link */}
                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <span>Don't have an Account?</span>
                        <a
                            href="/register"
                            className="font-medium text-blue-400 hover:underline ml-1"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>

            {/* Right: Image section */}
            <div
                className="hidden mt-18 lg:flex flex-1 items-center justify-center p-16"
                style={{
                    background: 'linear-gradient(225deg, #004e92 0%, #000428 100%)',
                }}
            >
                <div className="w-full max-w-xl text-white text-center space-y-8">
                    <img
                        src="/logo.png"
                        alt="Motivational illustration"
                        className="mx-auto rounded-2xl shadow-sm"
                    />
                    <p className="text-lg opacity-90 font-bold">
                        “The future depends on what you do today.”
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
