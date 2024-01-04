import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import foodRouter from "./routers/food.routerr"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({credentials:true,origin:['http://localhost:5173']}))

app.use('/api/foods',foodRouter)

app.listen(port,() => {
  console.log(`Port is running on port number ${port}...`)
})