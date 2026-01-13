import express from "express";
import { createCategory, getCategories, deleteCategory,singlecategory } from "../controllers/cate.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Only admin + superAdmin can create category
router.post(
  "/createcate",
  verifyToken,
  verifyRole(["superadmin"])
,
  createCategory
);

// Get all categories 
router.get("/allcats",getCategories);
router.get("/cats/:id",singlecategory);
// Delete category (only admin & superAdmin)
router.delete(
  "/delete/:id",
  verifyToken,
  verifyRole(["admin", "superadmin"])
,
  deleteCategory
);

export default router;
