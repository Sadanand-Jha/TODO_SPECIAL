import './loadENV.ts'
import app from './app.ts'
import { Server } from "socket.io";
import connectDB from './db/index.ts'
import path from "path";
import Todo from './model/todo.model.ts';
import http from "http";

connectDB()

const PORT = 4000
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  console.log("Client connected:", socket.id, "User:", userId);

  // join a room for this user
  socket.join(userId);
});

Todo.watch().on("change", async (change) => {
  const todos = await Todo.find();

  // for each connected socket, emit only their todos
  io.sockets.sockets.forEach((socket) => {
    const userId = socket.handshake.query.userId as string;
    const myTodos = todos.filter(todo => todo.owner === userId);
    io.to(socket.id).emit("todoUpdate", myTodos);
  });
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server running');
});