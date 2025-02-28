import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { register } from "./Controller/User.js";
// import bcrypt from './node_modules/bcryptjs/index.d';
dotenv.config();

const app = express();
app.use(express.json());

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
app.post("/api/user/register",register);
