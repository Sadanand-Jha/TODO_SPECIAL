'use client'
import React, { useState, useEffect } from 'react'
import Content from './Content'
import { useRouter } from 'next/navigation';
import api from '../../../functions/api';
import Navbar from '../navbar/navbar_welcome';
import { useAuth } from '@/context/AuthContext';


function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter()


  // CONTEXT
  const { AuthUser, setAuthUser } = useAuth()
  const url = process.env.NEXT_PUBLIC_BACKEND_URL



  const logout = async () => {
    console.log("logout is pressed!")
    const res = await api.get(`${url}/api/v1/auth/logout`, {
      withCredentials: true
    })
    window.location.reload()
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("this is in the client side")
        const res = await api.get(`${url}/api/v1/auth/profile`, {
          withCredentials: true, // important: sends the cookie
        });
        console.log(res)
        setUser(res.data.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    if (!AuthUser) {
      fetchProfile();
    }
    else{
      setUser(AuthUser)
    }
  }, []);

  if (!user) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );


  return (
    <div className=''>
      {/* <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        <button className="bg-red-700 text-white rounded-xl p-2 cursor-pointer" onClick={logout}>Logout!</button>
      </div> */}
      <div>
        <Navbar navbar_word={user.username} />
      </div>
      <Content />
    </div>
    // </Layout>
  )
}

export default Page
