import { OrderStatus } from "../constant/orderStatus.js"
import { OrderModel } from "../models/order.model.js"

export const getNewOrderForCurrentUser = async (req) => {
  await OrderModel.findOne({user:req.user.id,status:OrderStatus.NEW})
}