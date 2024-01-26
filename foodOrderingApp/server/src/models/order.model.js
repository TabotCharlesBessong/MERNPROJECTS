import { Schema, model } from "mongoose";
import { FoodModel } from "./food.model.js";
import { OrderStatus } from "../constant/orderStatus.js";

export const LatLngSchema = new Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  { _id: false }
);

export const OrderItemSchema = new Schema(
  {
    food: { type: FoodModel.schema, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

OrderItemSchema.pre("validate", (next) => {
  this.price = this.food.price * this.quantity;
  next();
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const OrderModel = model('order',orderSchema)