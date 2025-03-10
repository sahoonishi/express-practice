import { Product } from "../models/product.js";
// import { Product } from './../models/product';

// ADD PRODUCT
export const addProduct=async(req,res)=>{

  try {
    let product = await Product.create(req.body);
    res.json({message:"Product created successfully",product,success:true});
    
  } catch (error) {
      res.json(error.message);    
  }
}
// GET ALL 
export const getAllProduct=async(req,res)=>{
  try {
    const products = await Product.find();
    if(!products) res.json({message:"No products found",success:false});
    res.json({message:"Here are the products",products,success:true});
  } catch (error) {
      res.json(error.message);    
  }
}
// GET PRODUCT BY ID
export const getProductById=async(req,res)=>{
  const id = req.params.id;

  try {
    let product = await Product.findById(id);
    if(!product) res.json({message:"Prodcut not found",success:true});
    res.json({message:"Product found",product,success:true});  
  } catch (error) {
      res.json(error.message);    
  }
}
// UPDATE
export const update=async(req,res)=>{
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
    if(!product) res.json({message:"Product not found",success:true});
    res.json({message:"Product updated successfully",product , success:true});
  } catch (error) {
  res.json(error.message);  
  }
}
// DELETE
export const deleteProduct=async(req,res)=>{
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    if(!product) res.json({message:"Product not found",success:true});
    res.json({message:"Product deleted successfully",product , success:true});
  } catch (error) {
  res.json(error.message);  
  }
}