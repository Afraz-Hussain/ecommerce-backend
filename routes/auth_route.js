import express from "express"
import { LoginUser, Logout, RegisterUser } from "../controllers/auth.js";


const router = express.Router();

router.post("/createuser",RegisterUser)
router.post("/loginuser",LoginUser)
router.post("/logoutuser",Logout)


export default router