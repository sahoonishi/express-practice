import bcrypt from "bcryptjs"; 
import { User } from "../Models/User.js";

export const register = async(req,res)=>{
  console.log("body is ",req.body);
  const {name , email , password}=req.body;
  if(!name || !email || !password) {
    return res.json({message:"ALL fields are required"});
  }
  let user = await User.findOne({email});
  if(user) return res.json({message:"already landed",success:false,user});
  const hashedPassword = await bcrypt.hash(password,10);
  user = await User.create({name , email , password:hashedPassword});
  res.json({message:"User landed",success:true,user});
}