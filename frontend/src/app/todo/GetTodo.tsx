'use client'
import { IUser, useAuth } from '@/context/AuthContext';
import api from '../../../functions/axios';
import React, { useEffect, useState } from 'react'
import io from "socket.io-client";


function TodoBox() {
    const [data, setData] = useState<{ todo: string; deadline?: string; owner?: string }[]>([])
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [user, setUser] = useState<IUser | undefined>(undefined)


  // context
    const {AuthUser, setAuthUser} = useAuth()

    useEffect(() => {
        
    }, [user]);

    async function fetchUser() {
        const res = await api.get("http://localhost:4000/api/v1/auth/profile", {
            withCredentials: true, // important: sends the cookie
        });
        console.log(res)
        setAuthUser({email: res.data.data.user.email, username: res.data.data.user.username})
        setUser(res.data.data.user)
    }

    useEffect(() => {
        if(!AuthUser){
          fetchUser();
        }
        else{
          setUser(AuthUser)
        }
    }, [])

    const fetchData = async () => {
        console.log(`this is the link ${url}/api/v1/todo/gettodo`)
        const response = await api.get(`${url}/api/v1/todo/gettodo`, {
            withCredentials: true
        })
        console.log(Object.values(response.data.data))
        setData(Object.values(response.data.data))
        setData((prevData) =>
            [...prevData].sort((a, b) =>
                new Date(a.deadline || '').getTime() - new Date(b.deadline || '').getTime()
            )
        );
    }

    // const url = process.env.NEXT_PUBLIC_BACKEND_URL

    const deleteTodo = async (index: number) => {
        const request = { owner: data[index].owner, todo: data[index].todo }
        console.log(request)
        const response = await api.delete(`${url}/api/v1/todo/deletetodo`, { data: request })
        console.log("this is response", response)
        fetchData()
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
  <div className="max-h-92 mt-20 flex flex-row justify-center">
    <div className="w-full max-h-[500px] overflow-y-auto  pr-2 hide-scrollbar">
      {data.map((item, index) => {
        const isOverdue = item.deadline && Date.now() > Date.parse(item.deadline);

        return (
          <div
            key={index}
            className={`group flex flex-row justify-between items-center p-4 m-4 rounded-2xl border shadow-md transition-all duration-300 cursor-pointer
              ${isOverdue
                ? "bg-blue-800 text-white border-blue-900 font-semibold"
                : "bg-blue-100 border-blue-300 hover:bg-blue-200"
              }`}
          >
            {/* Todo text */}
            <span className="flex-1 text-lg font-medium px-2 truncate">
              {item.todo}
            </span>

            {/* Deadline */}
            <span
              className={`text-sm px-3 py-2 rounded-md 
                ${isOverdue ? "bg-blue-900 text-white" : "bg-blue-200 text-blue-800"}`}
            >
              {item.deadline
                ? new Date(item.deadline).toISOString().split("T")[0]
                : "No deadline"}
            </span>

            {/* Delete button */}
            <button
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => deleteTodo(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  </div>
);


}

export default TodoBox