'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import './mycss.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../functions/axios"

export default function InputWithButton() {
  const [content, setContent] = useState("")
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const url = `http://localhost:4000`

  // 🧠 Debounce typing
  useEffect(() => {
    const delay = setTimeout(() => {
      if (content.trim().length > 2) {
        fetchSuggestions(content)
      } else {
        setSuggestions([])
      }
    }, 600)
    return () => clearTimeout(delay)
  }, [content])

  const fetchSuggestions = async (text: string) => {
    setLoadingSuggestions(true)
    try {
      const res = await api.post(`${url}/api/v1/openai/suggest`, { text })
      setSuggestions(res.data.suggestions)
    } catch (err) {
      console.error("AI suggest error:", err)
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const addTodo = async (): Promise<void> => {
    if (!content.trim()) return alert("Please enter a todo meow 😺")

    const data = {
      content,
      deadline: deadline ? deadline.toISOString() : null
    }

    try {
      const response = await api.post(`${url}/api/v1/todo/addtodo`, data, {
        withCredentials: true
      })
      console.log("Response:", response.data)
      setContent("")
      setDeadline(null)
      setSuggestions([])
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

      {loadingSuggestions && <p className="text-sm text-gray-400">Thinking...</p>}

      {suggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg z-10">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setContent(s)
                setSuggestions([])
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}

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
