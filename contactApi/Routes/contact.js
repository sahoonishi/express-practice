import express from "express";
import { contactApi, deleteContact, getAll, getContactById, updateContact } from "../Controller/contact.js";
const router = express.Router();
router.post("/new",contactApi);
router.get("/",getAll);
router.get("/:contactid",getContactById);
router.put("/:contactidupdate",updateContact);
router.delete("/:id",deleteContact);
export default router;