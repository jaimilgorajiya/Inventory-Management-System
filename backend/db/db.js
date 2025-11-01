import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables");
      console.error("Please create a .env file with MONGO_URI=mongodb://localhost:27017/inventory-management");
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("MongoDB connected successfully");
    } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please check your MONGO_URI in .env file");
    process.exit(1);
  };
};
export default connectDB;