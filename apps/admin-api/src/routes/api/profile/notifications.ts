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
  .get([
    authenticationMiddleware,
  ], NotificationController.getNotifications)
  .patch([
    authenticationMiddleware,
  ], NotificationController.setNotificationReadStatusBulk)
  .delete([
    authenticationMiddleware,
  ], NotificationController.deleteNotificationBulk)

notificationRouter.route("/:notificationId")
  .get([
    authenticationMiddleware,
  ], NotificationController.getNotificationsById)
  .patch([
    authenticationMiddleware,
  ], NotificationController.setNotificationReadStatus)
  .delete([
    authenticationMiddleware,
  ], NotificationController.deleteNotification)

export default notificationRouter
