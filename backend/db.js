import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
const MONGO_URI = "mongodb+srv://ayushmaurya3596:Ayush21@cluster0.gnbc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
