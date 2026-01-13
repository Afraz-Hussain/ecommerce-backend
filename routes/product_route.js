import express from "express"

const router = express.Router();
import { createproduct, deleteproduct, 
   filterProducts, 
   similarProducts, 
   updateproduct, viewAllproducts, viewproducts, 
   viewsingleproduct }  from "../controllers/Products.js";
import { verifyToken }from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyAdmin.js";
import { upload } from "../middlewares/uploadImg.js";


// only seller can create shop and add product

router.post("/createproduct",verifyToken,verifyRole(["seller"]),upload.array("images",3),createproduct)
router.get("/viewproducts",viewproducts)
router.get("/viewAllproducts",viewAllproducts)
router.get("/single/:id",viewsingleproduct)
router.put("updateproduct/:id",verifyToken,verifyRole(["seller","superAdmin"]),updateproduct)
router.delete("/deleteproduct/:id",verifyToken,verifyRole(["seller","superAdmin"]),deleteproduct)
//for filteration of products..
router.get("/filterproducts", filterProducts)
// for finding products based on same category
router.get("/sameproducts/:pid",similarProducts)
export default router