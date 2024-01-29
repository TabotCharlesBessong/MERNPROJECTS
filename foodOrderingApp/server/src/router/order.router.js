import { Router } from "express";
import auth from "../middleware/auth.mid.js";
import handler from "express-async-handler";
import { BAD_REQUEST } from "../constant/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constant/orderStatus.js";
import { getNewOrderForCurrentUser } from "../utils/newOrders.js";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0)
      return res.status(BAD_REQUEST).send("Cart is empty");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();
    res.send(order._id);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order)
    else res.status(BAD_REQUEST).send();
  })
);

export default router;
