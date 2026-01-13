import User from "../models/Users.js";
export const getUsers=async(req,res)=>{
    try{
        const users=await User.find()
        return res.status(200).json({message:"Users fetched successfully",users})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server ERROR"})
    }
}
export const getSingleUser=async(req,res)=>{
    const userId=req.params.id
    try{
        const user=await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({message:"User fetched successfully",user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server ERROR"})
    }
}
// update user
export const updateUser=async(req,res)=>{
    const userId=req.params.id
    try{
        const user=await User.findByIdAndUpdate(userId,req.body)
        return res.status(200).json({message:"User updated successfully",user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server ERROR"})
    }
}
// to delete user
export const deleteUser=async(req,res)=>{
    const userId=req.params.id
    try{
        const user=await User.findByIdAndDelete(userId)
        return res.status(200).json({message:"User deleted successfully",user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server ERROR"})
    }
}