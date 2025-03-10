import express from "express";
import { addToCart, getAll } from "../controllers/cart.js";
const router = express.Router();
router.post("/add",addToCart);
router.get("/getall",getAll);
export default router;