import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({

  roleName: {
    type: String,
    required: true,
    unique: true,
    enum: ["superAdmin", "admin", "seller", "buyer", "user"],
  },
  description: {
    type: String,
    default: "",
  },
  permissions: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);
