import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/User.js";
import contactRouter from "./Routes/contact.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/contact",contactRouter);


mongoose
  .connect(process.env.URI, {
    dbName: "mernpractice",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  

const port = 3000;
app.get("/", (req, res) => {
  res.send("I am Drugs");
});
app.listen(port, () => {
  console.log(`server on ${port}`);
});

// USER ROUTES

