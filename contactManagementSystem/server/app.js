const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = require("./config/db")
// const auth = require("./middlewares/auth")

const app = express()
const port = process.env.PORT || 5500

// middlewares
app.use(express.json())
app.use(morgan("tiny"))
app.use(require("cors")())

// routes
app.use("/api",require("./routes/auth"))
app.use("/api", require("./routes/contact"));

app.listen(port,() => {
  connectDB()
  console.log(`The server is running on port ${port}...`)
})