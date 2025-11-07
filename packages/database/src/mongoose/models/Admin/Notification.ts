import mongoose from "mongoose"

import {
  NotificationType,
} from "#mongoose/enums/admin/notification"

export type InferredNotificationSchemaType = mongoose.InferSchemaType<typeof NotificationSchema>
export type Notification = mongoose.HydratedDocument<InferredNotificationSchemaType>
export type ObjectKeys = Exclude<keyof InferredNotificationSchemaType, "admin" | "updatedAt">
export type NotificationObject = Pick<Notification, ObjectKeys> & { id: Notification["_id"] }

/**
 * Mongoose schema for admin user notifications.
 */
const NotificationSchema = new mongoose.Schema({
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

NotificationSchema.index({
  admin: 1,
  readAt: 1,
  createdAt: 1,
})

/**
 * Transforms an Notification object by mapping internal `_id` to external `id` and returning only the required fields.
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
}: Notification): NotificationObject {
  const notification: NotificationObject = {
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

const Notification = mongoose.model("Notification", NotificationSchema)

export default Notification
export {
  NotificationType,
}