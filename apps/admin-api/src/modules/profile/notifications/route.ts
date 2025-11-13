import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import NotificationController from "#src/modules/profile/notifications/controller.ts"

/**
 * Notifications APIs router.
 * 
 * Used in the profile router (`src/modules/profile/route.ts`) via `profileRouter.use("/notifications", notificationRouter)`.
 */
const notificationRouter = express.Router()

notificationRouter.route("/")
  .get(authenticationMiddleware, NotificationController.list)
  .patch(authenticationMiddleware, NotificationController.updateReadStatusMultiple)
  .delete(authenticationMiddleware, NotificationController.deleteMultiple)

notificationRouter.get("/unread-count", authenticationMiddleware ,NotificationController.getUnreadCount)

notificationRouter.route("/:notificationId")
  .get(authenticationMiddleware, NotificationController.getById)
  .patch(authenticationMiddleware, NotificationController.updateReadStatus)
  .delete(authenticationMiddleware, NotificationController.delete)

export default notificationRouter
