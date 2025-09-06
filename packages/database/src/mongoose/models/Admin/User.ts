import mongoose from "mongoose"
import bcrypt from "bcrypt"

export type Admin = mongoose.HydratedDocument<mongoose.InferSchemaType<typeof AdminSchema>>
export type ObjectKeys = "email" | "name" | "role" | "permissions" | "createdAt"
export type AdminObject = Pick<Admin, ObjectKeys> & { id: Admin["_id"] }

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
 * Admin roles used for authorization and access control.
 *
 * @readonly
 * @enum
 * @property SUPER_ADMIN = 0 - Highest level admin with full privileges.
 * @property ADMIN = 1 - Standard admin with permission based access.
 */
export enum Roles {
  SUPER_ADMIN,
  ADMIN,
}

/**
 * Permission levels representing different management roles and access rights.
 *
 * @readonly
 * @enum
 * @property RETAILER_MANAGER = 0 - Permission to manage retailers.
 * @property CATALOGUE_MANAGER = 1 - Permission to manage product catalogues.
 * @property DELIVERY_PERSON_MANAGER = 2 - Permission to manage delivery personnel.
 * @property FINANCE_MANAGER = 3 - Permission to manage financial operations.
 * @property DATA_ANALYST = 4 - Permission to analyze data and generate reports.
 */
export enum Permissions {
  RETAILER_MANAGER,
  CATALOGUE_MANAGER,
  DELIVERY_PERSON_MANAGER,
  FINANCE_MANAGER,
  DATA_ANALYST,
}

/**
 * Mongoose schema for admin users.
 * Stores name, unique email, hashed password, role, permissions, and timestamps.
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
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: Object.values(Roles).map(Number),
    required: true,
    default: Roles.ADMIN,
  },
  permissions: {
    type: [
      {
        type: Number,
        enum: Object.values(Permissions).map(Number),
      }
    ],
    default: undefined,
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
    next(error as mongoose.CallbackError)
  }
})

/**
 * Transforms an Admin object by mapping internal `_id` to external `id` and returning only the required fields.
 * 
 * @param admin - The admin object to transform.
 * @returns The transformed admin object.
 */
export function transformUser({ _id, email, name, role, permissions, createdAt }: Admin): AdminObject {
  return {
    id: _id,
    email,
    name,
    role,
    permissions: permissions ?? [],
    createdAt,
  }
}

/**
 * Static model method to authenticate a user login.
 * 
 * @param credentials - User credentials
 * @returns The admin user if credentials are valid, else null
 */
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
