import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import upload from "#middlewares/multer"
import ProfileController from "#controllers/profile/UserController"
import notificationRouter from "#routes/api/profile/notifications"

/**
 * Profile APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/profile", profileRouter)`.
 */
const profileRouter = express.Router()

profileRouter.route("/")
  .get([
    authenticationMiddleware,
  ], ProfileController.getDetails)
  .patch([
    authenticationMiddleware,
  ], ProfileController.updateDetails)

profileRouter.put("/password", [
  authenticationMiddleware,
], ProfileController.updatePassword)

profileRouter.route("/picture")
  .put([
    authenticationMiddleware,
    upload.single("profilePicture"),
  ], ProfileController.updateProfilePicture)
  .delete([
    authenticationMiddleware,
  ], ProfileController.removeProfilePicture)

profileRouter.use("/notifications", notificationRouter)

export default profileRouter
