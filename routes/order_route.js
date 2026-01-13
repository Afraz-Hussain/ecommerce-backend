import express from "express";
import { verifyToken }from "../middlewares/verifyToken.js";
import { cancelOrder, createOrder, updateStatus } from "../controllers/Order.js"
import { verifyRole } from "../middlewares/verifyAdmin.js";
const router=express.Router()


router.post("/create",verifyToken,createOrder)// for user/buyer can make order from cart
router.put("/updatestatus/:orderId",verifyToken,verifyRole(["seller"]),updateStatus)
// only buyer can delete order
router.put("/cancelorder/:orderId",verifyToken,verifyRole(["buyer"]),cancelOrder)
export default router
