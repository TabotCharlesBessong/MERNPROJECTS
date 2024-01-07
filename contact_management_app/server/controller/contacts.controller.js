import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Contact from "../model/contactModel.js";

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  console.log(req.body);

  const newContact = new Contact({
    user: req.user._id,
    name,
    email,
    phoneNo1,
    phoneNo2,
    address,
    selectedImage,
  });

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

export const getContact = asyncHandler(async (req, res) => {
  const {id} = req.params
  const contact = await Contact.findById(id);
  res.json(contact);
});

export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Incorrect ID");
  }
  await Contact.findByIdAndDelete(id);
  res.json({ message: "Contact deleted successfully." });
});

export const deleteMultiContact = asyncHandler(async (req, res) => {
  if (req.body.length > 0) {
    await Contact.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: "Contacts are deleted successfully." });
  } else {
    res.status(400).json({ message: "No Ids found" });
  }
});

export const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No contact with id: ${id}`);

  const existContact = await Contact.findById(id);
  existContact.name = name || existContact.name;
  existContact.email = email || existContact.email;
  existContact.phoneNo1 = phoneNo1 || existContact.phoneNo1;
  existContact.phoneNo2 = phoneNo2 || existContact.phoneNo2;
  existContact.address = address || existContact.address;
  existContact.selectedImage = selectedImage || existContact.selectedImage;

  const updatedContact = await existContact.save();

  res.json(updatedContact);
});
