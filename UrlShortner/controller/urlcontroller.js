import {Url} from "../model/url.js";
import shortid from "shortid";
export const shortController = async(req,res)=>{
  const longUrl = req.body.longUrl;
  const shortUrl = shortid.generate();
  const shorturl = `http://localhost:8080/${shortUrl}`;
  const newUrl = new Url ({shortUrl,longUrl});

  await newUrl.save();
  res.render("index.ejs" , {shorturl});

}
export const longController = async(req,res)=>{

  const shortcode = req.params.shortUrl;
  const longcode = await Url.findOne({shortUrl:shortcode});
  if(longcode){
    res.redirect(longcode.longUrl);
  }else{
    res.json({message:"Invalid shorten code"})
  }
}