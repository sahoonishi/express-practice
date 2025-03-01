import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
  name:{type:String,require:true},
  email:{type:String,require:true},
  phone:{type:String,require:true},
  user:{type:mongoose.Schema.Types.ObjectId},
})

export const Contact = mongoose.model("Contact",contactSchema);