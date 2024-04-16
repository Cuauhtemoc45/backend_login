import mongoose from "mongoose";
import { generateDate } from "../utils/date.util.js";

const productSchema = new mongoose.Schema({
  product_code: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },

  product_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: generateDate(),
  },
  product_status: {
    type: String,
    required: true,
    uppercase: true,
  },
  product_provider: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: String,
    default: "N/A",
  },
});

export default mongoose.model("Products", productSchema);
