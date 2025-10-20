'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import './mycss.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../functions/api"
import { useTodo } from "@/context/TodoContext"

export default function InputWithButton() {
  const [content, setContent] = useState("")
  const [deadline, setDeadline] = useState<Date | null>(null)

  const url = `http://localhost:4000`

  

  // context api

    const {setTodos} = useTodo()


  const addTodo = async (): Promise<void> => {
    if (!content.trim()) return alert("Please enter a todo meow 😺")

    const data = {
      content,
      deadline: deadline 
    }

    try {
      const response = await api.post(`${url}/api/v1/todo/addtodo`, data, {
        withCredentials: true
      })
      console.log('this is response from add todo', response)
      console.log("Response:", response.data.data.todo)
      setTodos((prev) => [...(prev || []), {todo: data.content, deadline: data.deadline}])
      setContent("")  
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  return (
    <div className="input-wrapper w-full relative">
      <Input
        type="text"
        className="text-blue-500 placeholder-blue-500 selection:bg-white selection:text-blue-900 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
        placeholder="Got something to do? Type it here!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      
      <DatePicker
        selected={deadline}
        onChange={(date: Date | null) => setDeadline(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select deadline"
        className="font-semibold text-blue-800"
        portalId="root"
        withPortal
      />

      <Button
        type="button"
        variant="outline"
        className="btn"
        onClick={addTodo}
      >
        Add Todo
      </Button>
    </div>
  )
}
