import express from "express"
import { createContact, deleteContact, deleteMultiContact, getContact, getContacts, updateContact } from "../controller/contacts.controller.js"

const router = express.Router()

router.post("/",createContact)
router.get("/",getContacts)
router.get("/:id",getContact)
router.delete("/:id",deleteContact)
router.put("/:id",updateContact)
router.post("/",deleteMultiContact)

export default router