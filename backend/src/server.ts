import './loadENV'
import app from './app'
import connectDB from './db/index'



const PORT = 4000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => console.error("error ", error))






// import connectDB from "./db/index.js";
// import dotenv from "dotenv";
// import { app } from "./app.js";

// dotenv.config();


// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 5000, () => {
//         console.log("Server running on port 5000");
//     });
// })
// .catch(
//     (error) => console.error("Error connecting to MongoDB", error)
// )   (error) => console.error("Error connecting to MongoDB", error)
// )