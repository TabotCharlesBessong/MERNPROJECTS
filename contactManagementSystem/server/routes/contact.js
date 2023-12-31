
const router = require("express").Router()
const auth = require("../middlewares/auth")
const { validateContact } = require("../model/Contact")

router.post("/contact",auth,async(req,res) => {
  const {error} = validateContact(req.body)

  if(error){
    return res.status(400).json({ error: error.details[0].message });
  }

  const {name,address,email,phone} = req.body

  try {
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      postedBy: req.user._id,
    });
    const result = await newContact.save();

    return res.status(201).json({ ...result });
  } catch (error) {
    console.log(error)
  }
})

module.exports = router