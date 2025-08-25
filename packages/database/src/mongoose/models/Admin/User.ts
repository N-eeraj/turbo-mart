import mongoose from "mongoose"
import bcrypt from "bcrypt"

type Admin = mongoose.InferSchemaType<typeof AdminSchema> & mongoose.Document

interface AdminModel extends mongoose.Model<Admin> {
  /**
   * Authenticates an admin by email and password.
   *
   * This static method looks up a admin by their email and compares the provided
   * password with the stored hashed password using bcrypt.
   *
   * @param credentials - The login credentials.
   * - `email` - The admin's email.
   * - `password` - The admin's password.
   * @returns - Returns the admin document if authentication succeeds, otherwise null.
   *
   * @example
   * const admin = await Admin.authenticate({ email: "admin@example.com", password: "secret" });
   * if (!admin) {
   *   // handle invalid login
   * }
   */
  authenticate(credentials: LoginCredentials): Promise<Admin | null>
}

interface LoginCredentials {
  email: string
  password: string
}

const SALT_ROUNDS = 10

/**
 * Mongoose schema for admin users.
 * Stores name, unique email, hashed password, role, and timestamps.
 */
const AdminSchema = new mongoose.Schema({
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
AdminSchema.pre("save", async function(next) {
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
 * Set toObject transformer to return only required values
 */
AdminSchema.set("toObject", {
  transform: function (_doc, { _id, email, name, role }) {
    return {
      id: _id.toString(),
      email,
      name,
      role,
    }
  }
})

AdminSchema.statics.authenticate = async function({ email, password }: LoginCredentials) {
  const admin = await this.findOne({
    email,
  })
  if (!admin) return null

  const isMatch = await bcrypt.compare(password, admin.password)
  return isMatch ? admin : null
}

/**
 * Mongoose model for the Admin schema.
 */
const Admin = mongoose.model<Admin, AdminModel>("Admin", AdminSchema)

export default Admin
