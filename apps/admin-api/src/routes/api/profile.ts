import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import upload from "#middlewares/multer"
import ProfileController from "#controllers/ProfileController"

/**
 * Profile APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/profile", profileRouter)`.
 */
const profileRouter = express.Router()

profileRouter.use([
  authenticationMiddleware,
])

profileRouter.route("/")
  .get(ProfileController.getDetails)
  .patch(ProfileController.updateDetails)

profileRouter.put("/password", ProfileController.updatePassword)

profileRouter.route("/picture")
  .put([
    upload.single("profilePicture"),
  ], ProfileController.updateProfilePicture)
  .delete(ProfileController.removeProfilePicture)

const notificationRouter = express.Router()

notificationRouter.route("/")
  .get(ProfileController.getNotifications)
  .patch(ProfileController.setReadNotificationStatusBulk)

notificationRouter.route("/:id")
  .patch(ProfileController.setReadNotificationStatus)

profileRouter.use("/notifications", notificationRouter)

export default profileRouter
