const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = require("../middlewares/auth");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check for all missing fields
  if (!name || !email || !password)
    return res.status(400).json({ error: `Please enter all required field.` });

  // name validation.
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "name can only be less than 25 characters" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  // validation of password.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be atleast 6 characters long" });

  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res
        .status(400)
        .json({
          error: `a user with the email [${email}] already exists, so please try another email`,
        });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    const result = await newUser.save();

    return res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please enter all required fields!" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  try {
    const doesUserExists = await User.findOne({ email });

    if (!doesUserExists)
      return res.status(400).json({ error: "Invalid user email or password!" });

    // if we have the user
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExists.password
    );

    if(!doesPasswordMatch) return res.status(400).json({error:"Invalid email or password!"})

    const payload = {_id:doesUserExists._id}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:"1h"
    })

    const user = { ...doesUserExists._doc, password: undefined };
    return res.json(200).json({user})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error:error.message})
  }

  router.get("/me", auth, async (req, res) => {
    return res.status(200).json({ ...req.user._doc });
  });
});

module.exports = router;
