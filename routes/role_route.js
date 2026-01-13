import express from "express"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyAdmin.js";
import { assignRole, CreateRole } from "../controllers/role.js";
const router = express.Router();
// superAdmin can create and assign roles
router.post("/createrole",verifyToken,verifyRole(["superadmin"]),CreateRole)
// for assigning role
router.post("/assignrole",verifyToken,verifyRole(["superadmin"]),assignRole)
export default router
