import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],

  totalAmount: {
    type: Number,

  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },
  
  sellerId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true
},

});

export default mongoose.model("Order", OrderSchema);
