import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// =====================================================
// ALLOWED DEVSYNC ROLES
// =====================================================

const ALLOWED_ROLES = [
  "student",
  "developer",
  "mentor",
  "client",
];

// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // -------------------------------------------------
    // Validate required fields
    // -------------------------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // -------------------------------------------------
    // Validate password
    // -------------------------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // -------------------------------------------------
    // Normalize email
    // -------------------------------------------------

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -------------------------------------------------
    // Determine role
    // -------------------------------------------------

    const selectedRole = role || "student";

    if (!ALLOWED_ROLES.includes(selectedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid DevSync role.",
      });
    }

    // -------------------------------------------------
    // Check existing user
    // -------------------------------------------------

    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // -------------------------------------------------
    // Create user
    // Password will be hashed automatically by
    // the User model pre-save middleware.
    // -------------------------------------------------

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: selectedRole,
    });

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // -------------------------------------------------
    // Validate required fields
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password.",
      });
    }

    // -------------------------------------------------
    // Normalize email
    // -------------------------------------------------

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -------------------------------------------------
    // Find user
    //
    // password has select:false in User.js,
    // so explicitly request it here.
    // -------------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Check password
    // -------------------------------------------------

    const isMatch = await user.matchPassword(
      password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Check requested workspace role
    //
    // This prevents a Student account from logging
    // into the Developer/Mentor/Client workspace.
    // -------------------------------------------------

    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account belongs to the ${user.role} workspace.`,
      });
    }

    // -------------------------------------------------
    // Generate JWT
    // -------------------------------------------------

    const token = generateToken(user._id);

    // -------------------------------------------------
    // Successful login
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};