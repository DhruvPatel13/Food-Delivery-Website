import mongoose from "mongoose";
import "dotenv/config.js";

export const connectDb = async () => {
  await mongoose
    .connect(
      `mongodb+srv://dhruv425:${process.env.MONGODB_PASSWORD}@cluster0.dghjg.mongodb.net/food-web`
    )
    .then(() => console.log("Connection with DB Successful!"));
};
