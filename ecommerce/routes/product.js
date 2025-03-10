import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProductById, update } from "../controllers/product.js";
const router = express.Router();
router.post("/add", addProduct);
router.get("/getAll", getAllProduct);
router.get("/:id",getProductById);
router.put("/:id",update);
router.delete("/:id",deleteProduct);
export default router;
