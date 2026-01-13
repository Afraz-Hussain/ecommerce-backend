import express from "express"
import { verifyToken } from "../middlewares/verifyToken.js";
import { clearCart, addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/Cart.js";
const router = express.Router();

// user can create it's cart by adding productId , quantity 
router.post("/create",verifyToken,addToCart)

router.put("/updatecart/:id",verifyToken,updateQuantity)

router.get("/gcart",verifyToken,getCart)

router.delete("/deletecart/:id",verifyToken,removeFromCart)

router.delete("/clearcart",verifyToken,clearCart)

export default router
