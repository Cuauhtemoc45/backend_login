import mongoose from "mongoose";
import { generateDate } from "../utils/date.util.js";

const supplierSchema = new mongoose.Schema({
  supplier_id: {
    type: String,
    index: true,
    unique: true,
    maxLenght: 8,
  },
  supplier_fname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  supplier_lname: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
  },
  supplier_com_name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  supplier_phone: {
    type: String,
    required: true,
    maxLenght: 10,
  },
  supplier_email: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: generateDate(),
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

export default mongoose.model("Supplier", supplierSchema);
