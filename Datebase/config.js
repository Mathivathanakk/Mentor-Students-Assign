import mongoose from "mongoose";
import dotenv from 'dotenv';
 dotenv.config()

const mongodb_URL = process.env.MONGODB_URL;

export const connectDB = async (req, res) => {
  try {
    //console.log(mongodb_URL);
    const connection = await mongoose.connect(mongodb_URL);
    console.log("Mongodb connected successfully");
    return connection;
  } catch (error) {
    console.log(error);
   res.status(200).json({message:'Mongodb connection error'})
  }
};
