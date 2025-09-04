import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import ProfileController from "#controllers/ProfileController"

/**
 * Profile APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/profile", profileRouter)`.
 */
const profileRouter = express.Router()

profileRouter.get("/", authenticationMiddleware, ProfileController.getUserDetails)

export default profileRouter
