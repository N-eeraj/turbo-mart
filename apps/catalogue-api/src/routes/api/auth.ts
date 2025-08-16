import express from "express"

import AuthController from "#controllers/AuthController"

/**
 * Auth APIs router.
 *
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/auth", authRouter)`.
 */
const authRouter = express.Router()

authRouter.post("/login", AuthController.login)

export default authRouter
