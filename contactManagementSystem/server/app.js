const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = require("./config/db")

const app = express()
const port = process.env.PORT || 5500

// middlewares
app.use(express.json())
app.use(morgan("tiny"))
app.use(require("cors")())

app.listen(port,() => {
  connectDB()
  console.log(`The server is running on port ${port}...`)
})