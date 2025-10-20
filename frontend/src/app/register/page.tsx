
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '../../../functions/api';
import { useRouter } from 'next/navigation';


function PAGE() {
    // varibles
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [terms, setTerms] = useState(false);

    // basic
    const route = useRouter()


    const url = `http://localhost:4000`

    const submitBtn = async () => {
        if (terms == false) {
            return;
        }
        const formdata = {
            email,
            password, 
            fullname: firstname + lastname
        }

        const response = await api.post(`${url}/api/v1/auth/register`, formdata)
        console.log(response)
    }



    const showpass = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div className="page bg-[#686279] h-screen flex flex-row justify-center items-center">
            <div className="bg-[#2c2638] h-[680px] w-8/12 rounded-xl shadow-2xl flex flex-row">



                {/* Right side form */}
                <div className="w-full p-10">
                    <h1
                        className="text-white text-5xl text-center pt-3 font-bold"
                        style={{ fontFamily: 'Arial' }}
                    >
                        Create an account
                    </h1>

                    <div
                        className="text-white pt-7 ml-3"
                        style={{ fontFamily: 'Arial' }}
                    >
                        Already have an account?
                        <Link href={'/login'} className="text-yellow-600 underline pl-2">
                            Log in
                        </Link>
                    </div>

                    <div className="mt-5 ml-3 space-y-8">
                        {/* First + Last name */}
                        <div className="flex space-x-8">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                className="w-1/2 p-3 rounded-md bg-[#3c364c] text-white
                           placeholder-gray-400 border border-transparent
                           focus:border-pink-600 focus:ring-2 focus:ring-[#6D54B5]
                           focus:placeholder-pink-400 duration-300"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />

                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                className="w-1/2 p-3 rounded-md bg-[#3c364c] text-white
                           placeholder-gray-400 border border-transparent
                           focus:border-pink-600 focus:ring-2 focus:ring-[#6D54B5]
                           focus:placeholder-pink-400 duration-300"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <input
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            className="w-full p-3 rounded-md bg-[#3c364c] text-white
                         placeholder-gray-400 border border-transparent
                         focus:border-pink-600 focus:ring-2 focus:ring-[#6D54B5]
                         focus:placeholder-pink-400 duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Password with show/hide toggle */}
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                maxLength={50}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pr-12 rounded-md bg-[#3c364c] text-white
                           placeholder-gray-400 border border-transparent
                           focus:border-pink-600 focus:ring-2 focus:ring-[#6D54B5]
                           focus:placeholder-pink-400 duration-300"
                            />
                            <button
                                type="button"
                                onClick={showpass}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-gray-400 hover:text-pink-500 cursor-pointer"
                            >
                                {showPassword ? "🙈" : "👀"}
                            </button>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" name="terms_condition" onChange={(e) => setTerms((prev) => !prev)} checked={terms} />
                            <span className="text-white text-xs">
                                I agree to the{" "}
                                <a href="#" className="text-blue-500 underline duration-300">
                                    Terms & Condition
                                </a>
                            </span>
                        </div>

                        {/* Submit button */}
                        <button
                            className="bg-[#6d54b5] text-white font-mono p-3 w-full
                         rounded-xl hover:bg-[#523b94] cursor-pointer"
                            onClick={submitBtn}
                        >
                            Submit
                        </button>

                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-600"></div>
                            <span className="px-3 text-gray-400 text-sm">Or register with</span>
                            <div className="flex-grow h-px bg-gray-600"></div>
                        </div>

                        {/* <div className='flex flex-row '>
                    <button onClick={googleRegister} className="flex items-center mr-20 ml-15 justify-center w-2/5 border border-gray-500 cursor-pointer rounded-md py-2 hover:bg-gray-700 transition">
                <FaGoogle className="text-red-500 mr-2" size={20} />
                <span className="text-white ">Google</span>
                </button>

                <button className="flex items-center justify-center w-2/5 border border-gray-500 rounded-md py-2 cursor-pointer hover:bg-gray-700 transition">
                <FaApple className="text-white mr-2" size={20} />
                <span className="text-white ">Apple</span>
                </button>

            </div> */}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PAGE