import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://gerardoresendez040:cono5000@cluster0.i5d6vtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connect mongoDB");
  } catch (err) {
    console.log(err);
  }
};
