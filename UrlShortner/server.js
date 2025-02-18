import express, { urlencoded } from "express";
import mongoose from "mongoose";
import {shortController , longController} from "./controller/urlcontroller.js"

const app = express();
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://nishiofficial149:BdrprNZZdaDSUlRr@mernpractice.txlhs.mongodb.net/?retryWrites=true&w=majority&appName=mernpractice" , {
  dbName:"mernpractice"
}).then(()=>console.log("MongoDB conected")).catch((err)=>console.log(err));

const port = 8080;
app.get("/",(req,res)=>{
  res.render("index.ejs",{shorturl:null});
})
app.post("/short",shortController);
app.get("/:shortUrl" ,longController);

app.listen(port , (req,res)=>{
  console.log(`server running at ${port}`);
})