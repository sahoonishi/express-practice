import mongoose from "mongoose";

const productSchema = mongoose.Schema({}, { strict: false });
export const Product = mongoose.model("Product", productSchema);
