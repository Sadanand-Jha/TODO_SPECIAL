'use client'
import React, { useContext, createContext, useState } from "react";

export interface todoType{
  deadline: Date,
  todo: string
}
interface todoContextType{
    todos: Array<todoType> | undefined,
    setTodos: React.Dispatch<React.SetStateAction<Array<object> | undefined>>
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
  const [todos, setTodos] = useState<Array<object> | undefined>(undefined);

  const value = { todos, setTodos };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// export default TodoContext

