import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/Users.js";
import Roles from "../models/Roles.js";
// Register user
export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, address, roles } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Field data is missing" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const buyerRole = await Roles.findOne({ roleName: "buyer" });
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
       roles: roles?.length ? roles : [buyerRole._id],
    });

    return res.status(201).json({newUser, userId: newUser._id, message: "User registered successfully"});
  } catch (err) {
    console.log(err);
    if(err){
      console.log(err)
    }
    else{
      alert(res.status(400)).json({message:"error"})
    }
    return res.status(400).json({ message: "Error while registering user!" });
  }
};
//Login User...

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("roles", "roleName");
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    const userObj = user.toObject();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        roles: userObj.roles.map((r) => r.roleName), 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...others } = userObj;

    // Set cookie with proper settings for localhost
    res.cookie("access_token", token, { 
      httpOnly: true,
      sameSite: 'lax',  // Important for localhost
      secure: false,    // Must be false for http://localhost
      path: '/',
      maxAge: 3600000   // 1 hour in milliseconds
    });

    res.status(200).json({
      message: "Login successful",
      user: others,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
