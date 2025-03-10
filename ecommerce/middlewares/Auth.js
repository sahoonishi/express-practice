import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAuth=async(req,res,next)=>{
  const token = req.header("Auth");
  try {
    if(!token) return res.json({message:"Login first",success:false});
    const validatetoken = jwt.verify(token,"1234");
    const id = validatetoken.userId;
    let user = User.findById(id);
    if(!user) res.json({message:"User not found",success:false});
    req.user = user;
    next();
  } catch (error) {
      res.json(error.message);   
  }
}
