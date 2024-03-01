import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/user.router"

dotenv.config()

const URI = process.env.MONGO_URI as string

const app = express();
const port = process.env.PORT as string || 5000

// register a middleware
app.use(cors({
  credentials:true,
  origin:["http://localhost:5137"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("src/public"))

app.use("/api/user",userRouter)


mongoose.connect(URI).then(() => {
  console.log('database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(port, () => {
  console.log(`The server is running on port number ${port}....`);
});
