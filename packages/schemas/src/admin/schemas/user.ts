import * as z from "zod"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

import {
  userEmail,
  newPassword,
} from "#admin/schemas/common"
import {
  USER_NAME,
  ROLE,
  PERMISSIONS,
  PASSWORD,
  PROFILE_PICTURE,
  NOTIFICATION_STATE,
  NOTIFICATION_IDS,
} from "#admin/constants/validationMessages"

export const adminSchema = z.object({
  name: z.string({ error: USER_NAME.required })
    .nonempty(USER_NAME.required)
    .trim()
    .meta({
      description: "User's name.",
      example: "John Doe",
    }),
  email: userEmail,
  role: z.enum(Roles, { error: (issue) => {
    if (!issue.input) return ROLE.required
    return ROLE.valid
  }})
    .meta({
      description: "User role.",
      example: Roles.ADMIN,
    }),
  permissions: z.array(
    z.enum(Permissions, { error: (issue) => {
      if (!issue.input) return PERMISSIONS.required
      return PERMISSIONS.valid
    }}), { error: PERMISSIONS.valid }
  )
    .min(1, { error: PERMISSIONS.minLength })
    .meta({
      description: "User permissions.",
      example: [
        Permissions.CATALOGUE_MANAGER,
        Permissions.DATA_ANALYST,
      ],
    }),
})

export const profileUpdateSchema = adminSchema.pick({
  name: true,
  email: true,
})

export const passwordUpdateSchema = z.object({
  password: z.string({ error: PASSWORD.required })
    .nonempty(PASSWORD.required)
    .meta({
      description: "User's password.",
      example: "string",
    }),
  newPassword,
})

export const profilePictureSchema = z.object({
  profilePicture: z.file({ error: PROFILE_PICTURE.required })
    .max(1_048_576, { error: PROFILE_PICTURE.maxSize })
    .mime([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
    ], { error: PROFILE_PICTURE.valid })
    .meta({
      description: "User's profile picture.",
    })
})

export const notificationReadStatusSchema = z.object({
  read: z.boolean({ error: (issue) => {
    if (issue.input === undefined) return NOTIFICATION_STATE.required
    return NOTIFICATION_STATE.valid
  }})
    .meta({
      description: "Flag to set the notification's read status.",
      example: true,
    }),
})

export const notificationReadStatusBulkSchema = notificationReadStatusSchema.extend({
  notifications: z.array(
    z.string({ error: NOTIFICATION_IDS.individual.required })
      .nonempty(NOTIFICATION_IDS.individual.required)
      .trim()
  )
    .min(1, { error: NOTIFICATION_IDS.list.minLength })
    .optional()
    .meta({
      description: "List of notification id to set the read status.",
    }),
})

export const adminCreationSchema = adminSchema.omit({
  role: true,
})

export const adminUpdateSchema = adminCreationSchema.partial()

export const adminJSONSchema = z.toJSONSchema(adminSchema)
export const profileUpdateJSONSchema = z.toJSONSchema(profileUpdateSchema)
export const passwordUpdateJSONSchema = z.toJSONSchema(passwordUpdateSchema)
export const profilePictureJSONSchema = z.toJSONSchema(profilePictureSchema)
export const notificationReadStatusJSONSchema = z.toJSONSchema(notificationReadStatusSchema)
export const notificationReadStatusBulkJSONSchema = z.toJSONSchema(notificationReadStatusBulkSchema)
export const adminCreationJSONSchema = z.toJSONSchema(adminCreationSchema)
export const adminUpdateJSONSchema = z.toJSONSchema(adminUpdateSchema)

export type AdminData = z.infer<typeof adminSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type PasswordUpdateData = z.infer<typeof passwordUpdateSchema>
export type ProfilePictureData = z.infer<typeof profilePictureSchema>
export type NotificationReadStatusSchema = z.infer<typeof notificationReadStatusSchema>
export type NotificationReadStatusBulkSchema = z.infer<typeof notificationReadStatusBulkSchema>
export type AdminCreationData = z.infer<typeof adminCreationSchema>
export type AdminUpdateData = z.infer<typeof adminUpdateSchema>
