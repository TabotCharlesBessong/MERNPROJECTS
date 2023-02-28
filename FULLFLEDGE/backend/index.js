import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'

dotenv.config()
const port = 5000

const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.get('/',(req,res) => {
  res.send({message:'Hello world'})
})

const startServer = async () => {
  try{
    // connect to the database....
    connectDB(process.env.MONGO_URL)
    app.listen(port,() => console.log(`Server has started on port number ${port}`))
  }catch(error){
    console.log(error)
  }
}

startServer()
