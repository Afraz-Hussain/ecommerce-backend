import mongoose from "mongoose";
import roleseeder from "../seeders/roleseeder.js";
import seedSuperAdmin from "../seeders/SuperAdminSeeder.js"
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" MongoDB connected successfully!");
    await roleseeder();
    await seedSuperAdmin();
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
