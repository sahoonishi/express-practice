import { Contact } from "../Models/contact.js";


//CREATE CONTACT 
export const contactApi = async(req,res)=>{
  const {email,name,phone}=req.body;
  if(!name || !email || !phone) return res.json({message:"ALL fields required"});
  let contact = await Contact.create({
    name,email,phone,user:req.user
  });
  return res.json({message:"contact added",contact,success:true});
}
// GET ALL CONTACT
export const getAll = async(req,res)=>{
  let contacts = await Contact.find();
  if(!contacts) return res.json({message:"no contacts found",success:true});
  return res.json({message:"here are all contacs",contacts,success:false});
}
// GET SPECIFIC CONTACT
export const getContactById=async(req,res)=>{
  const id = req.params.contactid;
  let contact = await Contact.findById(id);
  if(!contact) return res.json({message:"no contact found",success:false});
  return res.json({message:"Found !!",contact,success:true})
}
// UPDATE CONTACT
export const updateContact=async(req,res)=>{
  const id=req.params.contactidupdate;
  const {name,email,phone,sex}=req.body;
  let updatedContact = await Contact.findByIdAndUpdate(id,{
    name,email,phone,sex:sex || "by"
  },{new:true,upsert:true});
  if(!updatedContact) return res.json({message:"not found",success:false})
    return res.json({message:"updated",updatedContact,success:true})
}
// DELETE CONTACT
export const deleteContact=async(req,res)=>{
  const id=req.params.id;
  
  let deleteContact=await Contact.findByIdAndDelete(id);
  if(!deleteContact) return res.json({message:"not found",success:false});
  res.json({
    message:"deleted successfully",deleteContact,success:true
  });
}