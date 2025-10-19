'use client'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../../functions/axios';
import { useAuth } from '@/context/AuthContext';
import { IUser } from '@/context/AuthContext';

function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {user, login} = useAuth()

    const url = `http://localhost:4000`

    const route = useRouter()


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Login attempted!');

        const objx = { email, password };
        try {
            const response = await api.post(`${url}/api/v1/auth/login`, objx, {
                withCredentials: true
            })
            const user1: IUser = {email: response.data.data.email, username: response.data.data.username}

            console.log("this is user 1", user1)
            console.log(response)
            login(user1)
            console.log("this is user from context ", user)
            route.push('/newpage')
        } catch (error) {

        }
    };
    return (
        <div className="flex flex-col lg:flex-row h-screen font-inter " style={{ fontFamily: 'sanserif' }}>
            {/* Left pane: Login form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-lg space-y-8">
                    {/* Logo and Welcome text */}


                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Welcome Back!</h1>
                        <p className="text-gray-600">
                            A picture is a poem without words. Start writing your story today.
                        </p>
                    </div>

                    {/* Form fields */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Social login buttons */}
                    <div className="relative text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative inline-block bg-gray-100 px-4 text-sm font-medium text-gray-500">
                            OR
                        </div>
                    </div>

                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <span>Don't have an Account? </span>
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">Sign Up</a>
                    </div>
                </div>
            </div>

            {/* Right pane: Marketing content */}
            <div className="hidden lg:flex flex-1 items-center justify-center p-16 rounded-l-lg" style={{ background: 'linear-gradient(225deg, #0f1d2c 0%, #064e6f 100%)' }}>
                <div className="w-full max-w-xl text-white space-y-8">
                    <img src="/imageforimega.jpeg" alt="" height={700} />
                </div>
            </div>
        </div>
    )
}

export default page