'use client'
import React, { useContext, createContext, useState } from "react";

export interface todoType{
  deadline: Date,
  todo: string
}
// 1. CRITICAL FIX: The setTodos action must manage the state type: Array<todoType>
interface todoContextType{
    todos: Array<todoType> | undefined,
    setTodos: React.Dispatch<React.SetStateAction<Array<todoType> | undefined>>
}
const TodoContext = createContext<todoContextType | undefined>(undefined)

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error( "todoContext is undefined!");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 2. FIX: The useState hook must explicitly use the correct type: Array<todoType>
  const [todos, setTodos] = useState<Array<todoType> | undefined>(undefined);

  const value = { todos, setTodos };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};