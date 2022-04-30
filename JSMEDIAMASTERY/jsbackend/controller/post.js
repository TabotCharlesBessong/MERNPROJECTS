
import postMessage from "../models/postMessage.js"

export const getPost = async (req,res)=>{
  // res.send('<h1>This works</h1>')
  try {
    const postMessages = await postMessage.find()
    console.log(postMessages)
    res.status(200).json(postMessages)
  } catch (error) {
    // console.log(error)
    res.status(404).json({message:error.message})
  }
}

export const createPost = async (req,res)=>{
  const post = req.body
  const newPost = new postMessage(post)
  // res.send('<h1>Create a post</h1>')
  try {
    await newPost.save
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message:error.message})
  }
}

// module.exports = {
//   getPost,
//   createPost
// }