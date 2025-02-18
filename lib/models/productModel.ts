import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sold_by: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  original_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Array,
    default:[]
  },
  tags: {
    type: [String],
    default: [],
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

productSchema.index({ title: "text", description: "text" });

const Product =
  mongoose.models.products_datas ||
  mongoose.model("products_datas", productSchema);

export default Product;
