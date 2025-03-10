import bcrypt from "bcryptjs"; 
import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";
export const register = async(req,res)=>{
  // console.log("body is ",req.body);
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

// LOGIN 
export const login=async(req,res)=>{
  const {email , password}=req.body;
  if(!email || !password){
    return res.json({message:"ALL fields required",success:false});
  }
  let user = await User.findOne({email});
  if(!user) return res.json({message:"User does't exist",success:false});
  const validatePassword = await bcrypt.compare(password,user.password);
  if(!validatePassword) return res.json({message:"Invalid password",success:false});
  const token = jwt.sign({userId:user._id},"1232",{
    expiresIn:"1d"
  });
  res.json({message:`Welcome ${user.name}`,token,success:true});// here we passed tokenn for frontend 

}