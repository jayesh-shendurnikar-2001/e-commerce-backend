const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * Stores registered user credentials
 * Password is automatically hashed before saving using bcrypt
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

/**
 * Pre-save middleware
 * Hashes the password before storing in the database
 * Only runs if the password field is modified
 */
userSchema.pre("save", async function (next) {
  // Check if password was changed or newly added
  // If NOT changed, skip hashing
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // Move to next step
  next();
});

/*
  Compare entered password with hashed password in DB
  Used during login
*/
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
