import mongoose from "mongoose"
import bcrypt from "bcrypt"

type User = mongoose.InferSchemaType<typeof UserSchema>

interface UserModel extends mongoose.Model<User> {
  /**
   * Authenticates a user by email and password.
   *
   * This static method looks up a user by their email and compares the provided
   * password with the stored hashed password using bcrypt.
   *
   * @param credentials - The login credentials.
   * - email - The user's email.
   * - password - The user's password.
   * @returns - Returns the user document if authentication succeeds, otherwise null.
   *
   * @example
   * const user = await User.authenticate({ email: "admin@example.com", password: "secret" });
   * if (!user) {
   *   // handle invalid login
   * }
   */
  authenticate(credentials: LoginCredentials): Promise<User | null>
}

interface LoginCredentials {
  email: string
  password: string
}

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

UserSchema.statics.authenticate = async function({ email, password }: LoginCredentials) {
  const user = await this.findOne({
    email,
  })
  if (!user) return null

  const isMatch = await bcrypt.compare(password, user.password)
  return isMatch ? user : null
}

/**
 * Mongoose model for the User schema.
 */
const User = mongoose.model<User, UserModel>("user", UserSchema)

export default User
