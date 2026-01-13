import Product from "../models/Products.js";
import mongoose from "mongoose";
export const createproduct=async(req,res)=>{
   const{title,description,price,category,color,size,brand}=req.body;

   try{
if(!title || !description || !price || !category ){
      return res.status(400).json({message:"All fields are required"})
   }

   // for images to get uploaded from multer using middlewear.

   const images = req.files.map(file =>
    file.path.replace(/\\/g, "/")
  );
  
   
   const newProduct=await  Product.create({
      title,
      description,
      price,
      images,
      category,
      color,
      size,
      brand,
      sellerId:req.user.id
   })
   return res.status(201).json({message:"Product created successfully",newProduct})
   }
   catch(err){
      res.status(500).json({message:err.message})
   }

}
export const deleteproduct=async(req,res)=>{
   const productId=req.params.id
   try{
      const removeProduct=await Product.findByIdAndDelete(productId)
      return res.status(200).json({message:"PRODUCT HAS BEEN DELETED."},removeProduct)
   }

   catch(err){
      return res.status(500).json({message:"Internal server error"})
   }


}
export const updateproduct=async(req,res)=>{
    const productId=req.params.id
    try{
        const product=await Product.findByIdAndUpdate(productId,req.body)
        return res.status(200).json({message:"Product has been  updated successfully",product})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server ERROR"})
    }
}
export const viewsingleproduct = async (req, res) => {
   const productId = req.params.id;
 
   try {
     const viewProd = await Product.findById(productId).populate("sellerId","username").populate("category","cateName");
     return res.status(200).json({
       message: "Product found successfully",
       data: viewProd,
     });
   } catch (err) {
     return res.status(500).json({ message: "Internal server error" });
   }
 };
 // to view products only added by that seller

export const viewproducts=async(req,res)=>{
   
   try{
      const viewProd=await Product.find({sellerId:req.user.id})
      return res.status(200).json({message:"Product has been found",data:viewProd})
   }
   catch(err){
      return res.status(500).json({message:"Internal server error"})
   }

}
// to view all products
export const viewAllproducts=async(req,res)=>{
   
   try{
      const viewProd=await Product.find().populate("category","cateName")
      return res.status(200).json({message:"Product has been found",data:viewProd})
   }
   catch(err){
      return res.status(500).json({message:"Internal server error"})
   }

}
// to filter products
export const filterProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice } = req.query;
    let query = {};
    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ message: "Invalid category id" });
      }
      query.category = new mongoose.Types.ObjectId(category);
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(query)
      .populate("category", "cateName");

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (err) {
    console.error("FILTER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
// filter product based on selected category will show when a product is open
export const similarProducts = async (req, res) => {
   const { pid } = req.params;
   
   try {
     // Find current product
     const currentProduct = await Product.findById(pid);

     if (!currentProduct) {
       return res.status(404).json({ message: "Product not found" });
     }

     const similarProducts = await Product.find({
       category: currentProduct.category, 
       _id: { $ne: pid }
     })
     .populate("category", "cateName")
     .limit(8);
 
     return res.status(200).json({
       success: true,
       message: "Similar products found",
       count: similarProducts.length,
       data: similarProducts
     });
 
   } catch (err) {
     console.error("Similar Products Error:", err);
     return res.status(500).json({ message: err.message });
   }
 };