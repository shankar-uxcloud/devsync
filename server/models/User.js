import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // ============================================
    // USER NAME
    // ============================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // EMAIL
    // ============================================
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ============================================
    // PASSWORD
    // ============================================
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // ============================================
    // PROFILE AVATAR
    // ============================================
    avatar: {
      type: String,
      default: "",
    },

    // ============================================
    // DEVSync ROLE
    // ============================================
    role: {
      type: String,
      enum: ["student", "developer", "mentor", "client"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// ============================================
// HASH PASSWORD BEFORE SAVING
// ============================================

userSchema.pre("save", async function (next) {
  // Don't hash password again when another
  // field is updated.
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

// ============================================
// COMPARE PASSWORD DURING LOGIN
// ============================================

userSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

// ============================================
// USER MODEL
// ============================================

const User = mongoose.model(
  "User",
  userSchema
);

export default User;