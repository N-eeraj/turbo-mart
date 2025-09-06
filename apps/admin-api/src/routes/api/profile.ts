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

profileRouter.route("/")
  .all([
    authenticationMiddleware,
  ])
  .get(ProfileController.getDetails)
  .patch(ProfileController.updateDetails)

profileRouter.put("/password", [
  authenticationMiddleware,
], ProfileController.updatePassword)

export default profileRouter
