import express from "express"
import cors from "cors"
import dotenv from "dotenv"
<<<<<<< HEAD:foodOrderingApp/server/src/server.js
import foodRouter from "../src/router/food.js"
=======
import foodRouter from "./router/food.router.js"
import path from "path"
>>>>>>> a80e021fbb3430998d22681c25d7fd649be6ef90:foodOrderingApp/server/server.js

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({credentials:true,origin:['http://localhost:5173']}))
<<<<<<< HEAD:foodOrderingApp/server/src/server.js
app.use(express.static("../public"));
=======
// app.use(express.static(path.join(__dirname,'public')))
>>>>>>> a80e021fbb3430998d22681c25d7fd649be6ef90:foodOrderingApp/server/server.js
app.use('/api/foods',foodRouter)

app.listen(port,() => {
  console.log(`Port is running on port number ${port}...`)
})