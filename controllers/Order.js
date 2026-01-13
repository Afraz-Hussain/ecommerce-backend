import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import Order from "../models/Orders.js";
// to create order from cart

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    let itemadded = [];
    let sellerId = null;

    for (const items of cart.products) {
      const product = await Product.findById(items.productId);
      if (!product) continue;

      sellerId = product.sellerId;
      total += product.price * items.quantity;

      itemadded.push({
        productId: product._id,
        price: product.price,
        quantity: items.quantity,
      });
    }

    const newOrder = await Order.create({
      userId,
      items: itemadded,
      totalAmount: total,
      address,
      sellerId,
    });

    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({
      message: "Order has been placed successfully",
      order: newOrder,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 1. seller can change status from pending to received , shipped 

export const updateStatus=async(req,res)=>{
  const{status}=req.body
  const{orderId}=req.params
  try{
    if (!status || !['received', 'shipped', 'delivered', 'completed','cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
  }
const updateOrder=await Order.findByIdAndUpdate(orderId,{
  $set:{status:status}
},{new:true}

)
if(!updateOrder){
  return res.status(404).json({ message: "Order not found" });
}
return res.status(200).json({
  message: `Order status updated to ${status} successfully`,
  order: updateOrder
});
  }
  catch(err){
    return res.status(404).json({ message: "server Issue" });
  }
}
// user/buyer can cancle order if status is not marked as shipped

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const checkstatus = await Order.findById(orderId);

    if (!checkstatus) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (checkstatus.status === "shipped" || checkstatus.status === "delivered") {
      return res.status(400).json({ message: "Order cannot be cancelled as it has already been shipped" });
    }
    checkstatus.status = "cancelled";
    await checkstatus.save();

    return res.status(200).json({ 
      message: "your order has been cancelled",
      order: checkstatus 
    });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
