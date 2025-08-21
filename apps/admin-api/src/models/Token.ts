import mongoose from "mongoose"
import crypto from "crypto"

type Token = mongoose.InferSchemaType<typeof TokenSchema> & mongoose.Document

interface TokenModel extends mongoose.Model<Token> {
  /**
   * Creates and saves a new token document for a given user.
   *
   * @param userId - The ID of the user to associate the token with.
   * @returns The saved token document.
   */
  addToken(userId: Token["userId"]): Promise<Token | null>
}

const EXPIRY_TIME = 2_59_20_00_000 // 30 days

/**
 * Mongoose schema for user tokens.
 * Stores user reference, token string, IP address, expiry date, and timestamps.
 */
const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
TokenSchema.index({ expiresAt: 1 }, {
  expireAfterSeconds: 0,
})

TokenSchema.statics.addToken = async function(userId: Token["userId"]) {
  const token = crypto.randomBytes(32).toString("hex")
  const userToken = new this({
    userId,
    token,
    expiresAt: new Date(Date.now() + EXPIRY_TIME),
  })
  userToken.save()
  return userToken
}

/**
 * Mongoose model for the Token schema.
 */
const Token = mongoose.model<Token, TokenModel>("token", TokenSchema)

export default Token
