import rateLimit from "express-rate-limit"
import {
  REQUEST_PER_MINUTE,
} from "#config/server.ts"

/**
 * Express middleware to rate limit incoming requests and mitigate basic DDoS attacks.
 * 
 * Allows up to configured {{ REQUEST_PER_MINUTE }} requests per minute per IP.
 * Responds with HTTP 429 if the limit is exceeded.
 */
const rateLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: REQUEST_PER_MINUTE, // limit to 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.statusCode = 429
    res.send({
      error: "Too many requests",
      success: false,
      message: "You have exceeded the rate limit. Please try again later."
    })
  }
})

export default rateLimiter
