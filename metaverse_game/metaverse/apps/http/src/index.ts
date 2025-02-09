import express from 'express'
import { router } from './routes'
import dotenv from "dotenv"
import client from "@repo/db/client"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use("/api",router)

app.listen(port, () => {
  console.log(`The server is listening on ${port}...`)
})