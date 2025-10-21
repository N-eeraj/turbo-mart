import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import upload from "#middlewares/multer"
import ProfileController from "#src/modules/profile/controller.ts"
import notificationRouter from "#src/modules/profile/notifications/route.ts"

/**
 * Profile APIs router.
 * 
 * Used in the api router (`src/routes/api.ts`) via `apiRouter.use("/profile", profileRouter)`.
 */
const profileRouter = express.Router()

profileRouter.route("/")
  .get(authenticationMiddleware, ProfileController.getDetails)
  .patch(authenticationMiddleware, ProfileController.updateDetails)

profileRouter.patch(
  "/password",
  authenticationMiddleware,
  ProfileController.updatePassword
)

profileRouter.route("/picture")
  .put([
    authenticationMiddleware,
    upload.single("profilePicture"),
  ], ProfileController.setProfilePicture)
  .delete(authenticationMiddleware, ProfileController.removeProfilePicture)

profileRouter.use("/notifications", notificationRouter)

export default profileRouter
