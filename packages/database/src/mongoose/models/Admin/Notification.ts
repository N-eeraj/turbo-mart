import mongoose from "mongoose"

export type InferredNotificationSchemaType = mongoose.InferSchemaType<typeof NotificationSchema>
export type Notification = mongoose.HydratedDocument<InferredNotificationSchemaType>

/**
 * Notification types for admins.
 *
 * @readonly
 * @enum
 * @property SYSTEM = 0 - System generated notification.
 * @property SELLER_REGISTRATION_REQUEST = 1 - A seller has requested for registration.
 * @property DELIVERY_PERSON_REGISTRATION_REQUEST = 2 - A delivery person has requested for registration.
 * @property SELLER_CATALOGUE_REQUEST = 3 - A seller has requested for a new catalogue.
 */
export enum NotificationType {
  SYSTEM,
  SELLER_REGISTRATION_REQUEST,
  DELIVERY_PERSON_REGISTRATION_REQUEST,
  SELLER_CATALOGUE_REQUEST,
}

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

const Notification = mongoose.model("Notification", NotificationSchema)

export default Notification
