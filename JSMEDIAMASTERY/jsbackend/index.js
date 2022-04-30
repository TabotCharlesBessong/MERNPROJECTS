
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoute from './routes/post.js'

const app = express()
const port = process.env.PORT || 5000

// routes

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',postRoute)


const MONGO_URI = 'mongodb+srv://Task1:Project11@node-task-manager.echz8.mongodb.net/TASKMANAGER?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> 
  app.listen(port,()=> console.log(`The server is running on port ${port}... `) )
 ).catch((err)=>{
  console.log(err.message)
})