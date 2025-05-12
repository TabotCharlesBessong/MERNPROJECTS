import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  // checking if the values are empty
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password regex validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // adding a rrandom avatar from avatar.iran.liara
    const idx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const user = new User({ fullName, email, password, profilePicture: avatar });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
     return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password); // Use comparePassword method
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const logout = async (req, res) => {
  try {
    // Invalidate the token or perform any necessary logout actions
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}