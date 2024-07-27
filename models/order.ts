import { Schema, Document, model, Types } from "mongoose";
//test

interface OrderInterface extends Document {
  createdAt: Date;
  products: Types.ObjectId[];
  totalPrice: number;
  customer: Types.ObjectId;
}

const orderSchema = new Schema<OrderInterface>({
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const orderModel = model<OrderInterface>("Order", orderSchema);

export default orderModel;
