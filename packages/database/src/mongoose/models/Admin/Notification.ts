import mongoose from "mongoose"

import {
  NotificationType,
} from "#mongoose/enums/admin/notification"

export type InferredAdminNotificationSchemaType = mongoose.InferSchemaType<typeof AdminNotificationSchema>
export type AdminNotification = mongoose.HydratedDocument<InferredAdminNotificationSchemaType>
export type ObjectKeys = Exclude<keyof InferredAdminNotificationSchemaType, "admin" | "updatedAt">
export type AdminNotificationObject = Pick<AdminNotification, ObjectKeys> & { id: AdminNotification["_id"] }

/**
 * Mongoose schema for admin user notifications.
 */
const AdminNotificationSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  type: {
    type: Number,
    enum: Object.values(NotificationType).map(Number),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
  },
  readAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

AdminNotificationSchema.index({
  admin: 1,
  readAt: 1,
  createdAt: 1,
})

/**
 * Transforms an AdminNotification object by mapping internal `_id` to external `id` and returning only the required fields.
 * 
 * @param notification - The notification object to transform.
 * 
 * @returns The transformed notification object.
 */
export function transformNotification({
  _id,
  type,
  title,
  message,
  data,
  readAt,
  createdAt,
}: AdminNotification): AdminNotificationObject {
  const notification: AdminNotificationObject = {
    id: _id,
    type,
    title,
    message,
    data,
    readAt,
    createdAt,
  }

  return notification
}

const AdminNotification = mongoose.model("AdminNotification", AdminNotificationSchema, "adminNotifications")

export default AdminNotification
export {
  NotificationType as AdminNotificationType,
}