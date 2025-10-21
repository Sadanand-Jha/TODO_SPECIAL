import mongoose from 'mongoose'
import Todo from '../model/todo.model.ts';


const connectDB = async () => {

    
    try {
        mongoose.connect(process.env.MONGO_DB_URI!)
        // console.log("MongoDB CONNECTED!")

        // Watch for changes in the 'todos' collection
        const changeStream = Todo.watch();

        changeStream.on("change", (change) => {
            // console.log("Change detected:", change);
            // Example: Send update to frontend via WebSocket
        });
    } catch (error) {
        // console.log("Mongodb connection FAILED!")
    }
}


export default connectDB