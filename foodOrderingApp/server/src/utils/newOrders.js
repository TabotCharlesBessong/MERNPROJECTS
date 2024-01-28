import { OrderStatus } from "../constant/orderStatus"
import { OrderModel } from "../models/order.model"

export const getNewOrderForCurrentUser = async (req) => {
  await OrderModel.findOne({user:req.user.id,status:OrderStatus.NEW})
}