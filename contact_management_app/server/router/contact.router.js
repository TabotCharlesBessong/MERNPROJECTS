import express from "express"
import { createContact, deleteContact, deleteMultiContact, getContact, getContacts, updateContact } from "../controller/contacts.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",protect,createContact)
router.get("/",protect,getContacts)
router.get("/:id",protect,getContact)
router.delete("/:id",protect,deleteContact)
router.put("/:id",protect,updateContact)
router.post("/",protect,deleteMultiContact)

export default router