'use client'
import React, { useState } from 'react'
import api from '../../../functions/api'
import { useRouter } from 'next/navigation'
import Navbar from '../navbar/navbar_welcome'
import './mycss.css'
function RegisterPage() {
    const [step, setStep] = useState(1)

    // Step 1: Email
    const [email, setEmail] = useState("")

    // Step 2: OTP
    const [otp, setOtp] = useState("")

    // Step 3: Details
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [terms, setTerms] = useState(false)

    const route = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleEmailSubmit = async () => {
        if (!email) return alert("Please enter your email")
        try {
            await api.post(`${url}/api/v1/auth/getotp`, { email })
            setStep(2)
        } catch (error) {
            console.error(error)
            alert("Failed to send OTP")
        }
    }

    const handleOtpVerify = async () => {
        if (!otp) return alert("Enter OTP")

        try {
            await 
            setStep(3)
        } catch (error) {
            console.error(error)
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
            // const res = await api.post(`${url}/api/v1/auth/register`, formdata)
            // alert("Registration Successful")
            route.push('/login')
        } catch (error) {
            console.error(error)
            alert("Registration failed")
        }
    }

    return (
        <div className="bg-blue-100 min-h-screen flex justify-center items-center">
            <Navbar navbar_word='Home' />
            <div className="w-full max-w-md p-8 bg-white border border-blue-300 rounded-lg shadow-md transition ">
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-500 text-center">Enter your Email</h2>
                        <input
                            type="email"
                            placeholder="superman171@gmail.com"
                            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2  input-wrapper duration-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleEmailSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
                                className="w-1/2 p-3 border border-blue-300 rounded"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 p-3 border border-blue-300 rounded"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-3 border border-blue-300 rounded"
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
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
