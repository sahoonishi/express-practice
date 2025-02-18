import mongoose from "mongoose"
const urlSchema = new mongoose.Schema({
  shortUrl:String,
  longUrl:String
})
export const Url = mongoose.model("shorturls" , urlSchema);