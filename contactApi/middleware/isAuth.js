import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
export const isAuth=async(req,res,next)=>{
  const token = req.header("Auth");
  // console.log(token);
  if(!token) return res.json({message:"login first"});
  const tokendata=jwt.verify(token,"1232");
  const id = tokendata.userId;
  const user = await User.findById(id);
  if(!user) return res.json({message:"not found"});
  req.user=user;
  next();
}