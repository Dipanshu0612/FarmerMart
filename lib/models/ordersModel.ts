import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  products_details: {
    type: Array,
    required: true,
  },
  user_details: {
    type: Object,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
  seller_location: {
    type: String,
    required: true,
  },
  order_status: {
    type: String,
    default: "Pending",
  },
  ordered_at: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ordersSchema.index({ products_details: "text" });

const Order =
  mongoose.models.orders_datas || mongoose.model("orders_datas", ordersSchema);

export default Order;
