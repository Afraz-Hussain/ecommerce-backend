import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:
  { type: String, 
    required: true},
  price: {
    type: Number, 
    required: true,
  },
  images: {
  type: [String],
  required: true
},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
  color: [
    {
      type: String
    }
  ],
  size: [
    {type:String}
  ],
  brand: String,
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      rating: Number,
      comment: String,
    },
  ],
  isFeatured: { type: Boolean, default: false },
  sellerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
