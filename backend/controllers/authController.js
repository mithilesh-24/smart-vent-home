const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("[AUTH] Register attempt:", email);

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "An account with that email already exists." });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    console.log("[AUTH] User registered:", user.email);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error("[AUTH] Register error:", error.message);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[AUTH] Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = generateToken(user._id);

    console.log("[AUTH] User logged in:", user.email);

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: { id: req.user._id, name: req.user.name, email: req.user.email },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { register, login, getMe };
