import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer"
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import connectDB from "./config/db.js";
import AuthRoute from "./routes/auth_route.js"
import UserRoute from "./routes/user_route.js"
import RoleRoute from "./routes/role_route.js"
import CateRoute from "./routes/cate_route.js"
import CartRoute from "./routes/cart_route.js"
import OrderRoute from "./routes/order_route.js"
import ProductRoute from "./routes/product_route.js"

connectDB()

const corsOptions = {
  origin: ["https://ecommerce-frontend-bay-nine.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

app.use("/backend/auth",AuthRoute)
app.use("/backend/users",UserRoute)
app.use("/backend/roles",RoleRoute)
app.use("/backend/cate",CateRoute)
app.use("/backend/product",ProductRoute)
app.use("/backend/cart",CartRoute)
app.use("/backend/order",OrderRoute)



// to send email to seller  when user do checkout 
const transporter=nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
  user:"farazishah14@gmail.com",
  pass:"gbiiosykaunndzxq"
}

})

app.post("/sendmail",async(req,res)=>{
  const{to,subject,text}=req.body;
  try{
const info=await transporter.sendMail({
  from:"farazishah14@gmail.com",
  to,
  subject,
  text
})
  res.status(200).json({message:"Email sent successfully",info})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"Error sending email"})
  }
})

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});