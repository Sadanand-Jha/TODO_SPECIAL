import mongoose from 'mongoose'


const connectDB = async () => {

    
    try {
        mongoose.connect(process.env.MONGO_DB_URI!)
        // console.log("MongoDB CONNECTED!")
        
    } catch (error) {
        // console.log("Mongodb connection FAILED!")
    }
}


export default connectDB