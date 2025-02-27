import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();


mongoose.connect(process.env.URI,{
  dbName:"mernpractice"
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log(err));


const app =express();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dgp1xc81d', 
  api_key: '311249467182232', 
  api_secret: 'qT_BaIA9OwfeJT6p0CB2fj3eCtU'
});

app.get("/",(req,res)=>{
  res.render("index.ejs",{url:null});
})


const storage = multer.diskStorage({
  // destination: "./public/upload", // here the file will added here in public 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({ storage: storage });

//-------------- Below String should in Uppercase

const imageSchema = mongoose.Schema({
  filename:String,
  publicId:String,
  imgUrl:String
})
//*************Below mongoose.model("schemaname",yourschema);
const File = mongoose.model("cloudinary",imageSchema);

// below "/fileUpload" is the endpoint for post , upload.single('file') , here we allow upload of a single file at a time , and 'file' is the name in inpit field in form tag in html 
app.post('/fileUpload', upload.single('file'), async (req, res)=> {
    const file = req.file.path;
    const cloudinaryResponse = await cloudinary.uploader.upload(file , {
      folder:"express_practice"
    })
    // save to database
    await File.create({
      filename:file.originalname,
      publicId:cloudinaryResponse.public_id,
      imgUrl:cloudinaryResponse.secure_url,
    });
    res.render("index.ejs",{url:cloudinaryResponse.secure_url})

    // res.json({message:"file uploaded successfully",cloudinaryResponse})
})
const port=8080;
app.listen(port,(req,res)=>{
  console.log(`server running at port ${port}`)
})