import express from "express"
import { deleteUser, getSingleUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/getusers",verifyToken,verifyRole(["superAdmin","admin"]),getUsers)
router.get("/getsingleuser/:id",verifyToken,verifyRole(["superAdmin","admin"]),getSingleUser)
router.put("updateuser/:id",verifyToken,updateUser)
router.delete("deleteuser/:id",verifyToken,verifyRole(["superAdmin","admin"]),deleteUser)

export default router
