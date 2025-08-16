import mongoose from "mongoose"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

/**
 * Mongoose schema for admin users.
 * Includes name, unique email, hashed password, role, and timestamps.
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "SUPER_ADMIN",
      "ADMIN",
    ],
    required: true,
    default: "ADMIN"
  },
}, {
  timestamps: true,
})

/**
 * Hashes password before save if modified.
 * Prevents storing plain-text passwords.
 */
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next()

  try {
    const hashed = await bcrypt.hash(this.password, SALT_ROUNDS)
    this.password = hashed
    next()
  } catch (error) {
    next(error)
  }
})

/**
 * Mongoose model for the User schema.
 */
const User = mongoose.model("user", UserSchema)

export default User
