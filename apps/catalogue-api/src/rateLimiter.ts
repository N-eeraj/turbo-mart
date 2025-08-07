import rateLimit from "express-rate-limit"

const rateLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 60, // limit to 60 minutes per minute
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
