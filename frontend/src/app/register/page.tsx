'use client'
import React, { useState } from 'react'
import api from '../../../functions/api'
import { useRouter } from 'next/navigation'
import Navbar from '../navbar/navbar_welcome'
import './mycss.css'

function RegisterPage() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [terms, setTerms] = useState(false)
    const [ROEmail, setROEmail] = useState(false)

    const route = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleEmailSubmit = async () => {
        if (!email) return alert("Please enter your email")
        try {
            await api.post(`${url}/api/v1/auth/getotp`, { email })
            setStep(2)
            setROEmail(true)
        } catch (error) {
            console.error(error)
            alert("Failed to send OTP")
        }
    }

    const handleOtpVerify = async () => {
        if (!otp) return alert("Enter OTP")

        try {
            await api.post(`${url}/api/v1/auth/verifyotp`, { otp, email })
            setStep(3)
        } catch (error) {
            console.error(`this is the error! `, error)
            alert("OTP verification failed")
        }
    }

    const handleRegister = async () => {
        if (!terms) return alert("You must accept the terms and conditions.")

        const formdata = {
            email,
            password,
            fullname: `${firstname} ${lastname}`,
        }

        try {
            const res = await api.post(`${url}/api/v1/auth/register`, formdata)
            console.log(`this is response`, res)
            route.push('/login')
        } catch (error) {
            console.error(error)
            alert("Registration failed")
        }
    }

    return (
        <div className="relative min-h-screen flex justify-center items-center font-inter overflow-hidden">
            {/* Navbar */}
            <Navbar navbar_word='Login' />

            {/* Tickmark background pattern */}
            <div
                className="absolute mt-19 inset-0 bg-[url('/logo.png')] bg-cover bg-center opacity-45"
                style={{
                    backgroundRepeat: 'repeat',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Blue overlay for contrast */}
            <div className="absolute mt-19 inset-0 bg-gradient-to-b from-blue-900/40 to-blue-950/60"></div>

            {/* Registration Card */}
            <div className="relative z-10 w-8/9 sm:w-full h-120 sm:h-full max-w-md p-8 bg-white/90 backdrop-blur-lg border border-blue-200 rounded-xl shadow-2xl">
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-600 text-center">Enter your Email</h2>
                        <div className='m-10'>
                            <span className=" text-center text-lg font-semibold text-gray-800">
                                <div>
                                    You bring the <span className="text-blue-600">DREAMS</span>.
                                </div>
                                <div>
                                    I’ll bring the <span className="text-green-600 text-center">TOOLS</span>.</div>
                            </span>
                        </div>
                        <span className='text-blue-500 font-semibold'>
                            Email
                        </span>
                        <input
                            type="email"
                            placeholder="eg. superman171@gmail.com"
                            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            readOnly={ROEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleEmailSubmit}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-700 text-center">Verify OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={handleOtpVerify}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
                        >
                            Verify
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-700 text-center">Set Your Details</h2>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-1/2 p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600"
                            >
                                {showPassword ? "🙈" : "👀"}
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={() => setTerms(!terms)}
                            />
                            <span className="text-sm text-gray-700">
                                I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
                            </span>
                        </div>

                        <button
                            onClick={handleRegister}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RegisterPage
