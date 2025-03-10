import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import dotenv from "dotenv";
import cartrouter from "./routes/cart.js";
import { isAuth } from "./middlewares/Auth.js";
dotenv.config();
const app = express();
app.use(express.json());
const port = 3000;
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",isAuth,cartrouter);
mongoose
  .connect(process.env.URI, {
    dbName: "mernpractice",
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("i am express");
});
app.listen(port, (req, res) => {
  console.log(`server on ${port}`);
});
