import {Router} from "express"
import auth from '../middleware/auth.mid.js'
import handler from 'express-async-handler'
import { BAD_REQUEST } from "../constant/httpStatus.js"
import { OrderModel } from "../models/order.model.js"
import { OrderStatus } from "../constant/orderStatus.js"

const router = Router()
router.use(auth)

router.post('/create',handler(async(req,res) => {
  const order = req.body

  if(order.items.length <= 0) return res.status(BAD_REQUEST).send('Cart is empty')

  await OrderModel.deleteOne({
    user:req.user.id,
    status:OrderStatus.NEW
  })

  const newOrder = new OrderModel({...order,user:req.user.id})
  await newOrder.save()
  res.send(newOrder)
}))

export default router