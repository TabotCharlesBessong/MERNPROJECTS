import express from 'express';
const createUserRoute = () => {
  const router = express.Router()
  router.post("/register")
  return router
}

export default createUserRoute()