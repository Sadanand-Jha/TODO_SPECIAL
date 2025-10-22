import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import {OpenAI} from 'openai'
const app = express()

console.log("THIS IS CORS ORIGIN",process.env.CORS_ORIGIN)

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// console.log('i am printing ai ',openai)


app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true, 
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// console.log("THIS IS THE API KEY",process.env.OPENAI_API_KEY)

app.get('/', (req, res) => {
    res.send("Everything works fine")
})
app.use(cookieParser())
app.use(express.json())

import authRouter from './routes/auth.route'
app.use('/api/v1/auth', authRouter)

import todoRouter from './routes/todo.route'
app.use('/api/v1/todo', todoRouter)




export default app