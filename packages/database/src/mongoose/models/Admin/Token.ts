import mongoose from "mongoose"
import crypto from "crypto"

export type AdminToken = mongoose.HydratedDocument<mongoose.InferSchemaType<typeof AdminTokenSchema>>
export type Token = Omit<AdminToken, "admin">

interface AdminTokenModel extends mongoose.Model<AdminToken> {
  /**
   * Creates and saves a new token document for a given user.
   * 
   * @param adminId - The ID of the user to associate the token with.
   * @returns The saved token document.
   */
  addToken(adminId: AdminToken["admin"]): Promise<AdminToken | null>
}

const EXPIRY_TIME = 2_59_20_00_000 // 30 days

/**
 * Mongoose schema for user tokens.
 * Stores user reference, token string, IP address, expiry date, and timestamps.
 */
const AdminTokenSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
})

/**
 * TTL index to auto-delete documents after `expiresAt`.
 * Documents expire immediately after the `expiresAt` date.
 */
AdminTokenSchema.index({ expiresAt: 1 }, {
  expireAfterSeconds: 0,
})

/**
 * Set toObject transformer to return only token and expiresAt fields
 */
AdminTokenSchema.set("toObject", {
  transform: function (_doc, { token, expiresAt }) {
    return {
      value: token,
      expiresAt,
    }
  }
})

AdminTokenSchema.statics.addToken = async function(adminId: AdminToken["admin"]) {
  const token = crypto.randomBytes(32).toString("hex")
  const userToken = new this({
    admin: adminId,
    token,
    expiresAt: new Date(Date.now() + EXPIRY_TIME),
  })
  userToken.save()
  return userToken
}

/**
 * Mongoose model for the AdminToken schema.
 */
const AdminToken = mongoose.model<AdminToken, AdminTokenModel>("AdminToken", AdminTokenSchema, "adminTokens")

export default AdminToken
