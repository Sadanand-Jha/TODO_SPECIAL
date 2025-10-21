import React from 'react'
import AddTodo from './AddTodo'
import TodoBox from './GetTodo'
// import Navbar from '../navbar/navbar_todo'

function Content() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <main className="w-full max-w-4xl flex flex-col items-center gap-10">
        
        {/* Add Todo Input */}
        <section className="w-full flex justify-center">
          <AddTodo />
        </section>

        {/* Todo List */}
        <section className="w-full">
          <TodoBox />
        </section>

      </main>
    </div>
  );
}
export default Content
