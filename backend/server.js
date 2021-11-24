import express from 'express'
import data from './data.js'

const app = express();

app.get('/api/products',(req,res)=>{
  res.send(data.products)
})

app.get('/',(req,res)=>{
  res.send('Server is up and ready')
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`);
})