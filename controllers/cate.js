import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { cateName } = req.body;

    if (!cateName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check duplicate
    const exists = await Category.findOne({ cateName });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({
      cateName,
      createdBy: req.user.id,   // Logged-in user
    });

    return res.status(201).json(newCategory);
  } catch (err) {
    console.log("Create Category Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// --- Get All Categories ---
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("createdBy", "name email");
    return res.status(200).json(categories);
  } catch (err) {
    console.log("Get Category Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// --- Delete Category by ID ---
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.log("Delete Category Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// find by id single category
export const singlecategory=async(req,res)=>{
  const{id}=req.params;
  try{
    const findcat=await Category.findById(id)
    if (!findcat) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({message:"category fund",data:findcat})
  }
  catch(err){
    return res.status(500).json({message:"server error"})
  }

}