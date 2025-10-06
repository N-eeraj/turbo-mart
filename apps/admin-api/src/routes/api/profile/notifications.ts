import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import NotificationController from "#controllers/profile/NotificationController"

/**
 * Notifications APIs router.
 * 
 * Used in the profile router (`src/routes/api/profile/index.ts`) via `profileRouter.use("/notifications", notificationRouter)`.
 */
const notificationRouter = express.Router()

notificationRouter.route("/")
  .get(authenticationMiddleware, NotificationController.list)
  .patch(authenticationMiddleware, NotificationController.updateReadStatusMultiple)
  .delete(authenticationMiddleware, NotificationController.deleteMultiple)

notificationRouter.route("/:notificationId")
  .get(authenticationMiddleware, NotificationController.getById)
  .patch(authenticationMiddleware, NotificationController.updateReadStatus)
  .delete(authenticationMiddleware, NotificationController.delete)

export default notificationRouter
