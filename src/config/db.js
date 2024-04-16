import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/login";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connect mongoDB");
  } catch (err) {
    console.log(err);
  }
};
