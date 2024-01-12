import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI || "").then(() => {
    console.log("Connected to database :: MongoDB");
  });
};

export default dbConnection;
