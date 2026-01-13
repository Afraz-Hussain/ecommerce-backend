import Roles from "../models/Roles.js";
import User from "../models/Users.js";
export const CreateRole = async (req, res) => {
    const { roleName, description, permissions } = req.body;
  
    try {
  
      if (!roleName || !description || !permissions) {
        return res.status(409).json("Invalid please give all details");
      }
  console.log(roleName,description,permissions)
      const new_role = await Roles.create({
        roleName,
        description,
        permissions
      });
  
      return res.status(201).json(new_role);
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  };
  
  // superAdmin can assign role to users
  export const assignRole=async(req,res)=>{
    const{userId,roleId}=req.body
    try{
        if(!userId||!roleId){
            return res.status(409).json("Invalid please give all details")
        }     
        
        const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
// if user is present then assign role

user.roles.push(roleId);
    await user.save();
    return res.status(200).json({ message: "Role assigned successfully", roles: user.roles });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
  }
