import express from "express"

import authMiddleware from "#middlewares/auth"
import AuthController from "#controllers/AuthController"

/**
 * Auth APIs router.
 *
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/auth", authRouter)`.
 */
const authRouter = express.Router()

authRouter.post("/login", AuthController.login)
authRouter.post("/logout", authMiddleware, AuthController.logout)

export default authRouter
