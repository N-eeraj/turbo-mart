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

const notificationRouter = express.Router()

notificationRouter.route("/")
  .get([
    authenticationMiddleware,
  ], ProfileController.getNotifications)
  .patch([
    authenticationMiddleware,
  ], ProfileController.setNotificationReadStatusBulk)
  .delete([
    authenticationMiddleware,
  ], ProfileController.deleteNotificationBulk)

notificationRouter.route("/:id")
  .patch([
    authenticationMiddleware,
  ], ProfileController.setNotificationReadStatus)
  .delete([
    authenticationMiddleware,
  ], ProfileController.deleteNotification)

profileRouter.use("/notifications", notificationRouter)

export default profileRouter
