import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import AuthController from "#controllers/AuthController"

/**
 * Auth APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/auth", authRouter)`.
 */
const authRouter = express.Router()

authRouter.post("/login", AuthController.login)

authRouter.post("/logout", authenticationMiddleware, AuthController.logout)

authRouter.post("/forgot-password", AuthController.forgotPassword)
authRouter.post("/reset-password", AuthController.resetPassword)

export default authRouter
