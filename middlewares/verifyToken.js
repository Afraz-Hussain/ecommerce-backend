import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    console.log("Token found:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log("Decoded payload:", decoded);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};
