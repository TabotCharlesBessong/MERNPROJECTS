
import express from 'express'
import { getPost,createPost } from '../controller/post.js'

const router = express.Router()

router.get('/',getPost)
router.get('/',createPost)

export default router