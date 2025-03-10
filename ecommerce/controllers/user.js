import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import  jwt  from 'jsonwebtoken';


//REGISTER
export const register =async(req,res)=>{
  const {name,email,password}=req.body;
  let user = await User.findOne({email});
  if(user) return res.json({message:"Userrrrr already exists",success:false});
  const hashPassword= await bcrypt.hash(password,10);
  user = await User.create({
    name,email,password:hashPassword,
  })
  return res.json({message:`User ${user.name} created successfully`,success:true});
}
//LOGIN
export const login=async(req,res)=>{
  const {name,email,password}=req.body;
  let user = await User.findOne({email});
  if(!user) return res.json({message:"Account not exist",success:false});
  const validatePassword = await bcrypt.compare(password,user.password);
  if(!validatePassword) return res.json({message:"Incorrect password",success:false});
  const token = jwt.sign({userId:user._id,},"1234",{expiresIn:"1d"});
  return res.json({message:`welcome ${user.name}`,token,success:true});
}