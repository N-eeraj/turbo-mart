import {
  z,
} from "zod"
import mongoose from "mongoose"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

import {
  EMAIL,
  USER_NAME,
  ROLE,
  PERMISSIONS,
  PASSWORD,
  NEW_PASSWORD,
  PROFILE_PICTURE,
  NOTIFICATION_STATE,
  NOTIFICATION_IDS,
} from "#constants/validationMessages"

export const adminSchema = z.object({
  name: z.string({ error: USER_NAME.required })
    .nonempty(USER_NAME.required)
    .trim()
    .meta({
      description: "User's name",
      example: "John Doe",
    }),
  email: z.email({ error: (issue) => {
    if (!issue.input) return EMAIL.required
    return EMAIL.valid
  }})
    .trim()
    .meta({
      description: "User's email address",
      example: "user@example.com",
    }),
  role: z.enum(Roles, { error: (issue) => {
    if (!issue.input) return ROLE.required
    return ROLE.valid
  }})
    .meta({
      description: "User role",
      example: Roles.ADMIN,
    }),
  permissions: z.array(
    z.enum(Permissions, { error: (issue) => {
      if (!issue.input) return PERMISSIONS.required
      return PERMISSIONS.valid
    }})
  )
    .min(1, { error: PERMISSIONS.minLength })
    .meta({
      description: "User permissions",
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
      description: "User's password",
      example: "string",
    }),
  newPassword: z.string({ error: NEW_PASSWORD.required })
    .nonempty(NEW_PASSWORD.required)
    .min(6, NEW_PASSWORD.minLength)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { error: (issue) => {
      if (issue.input) {
        if (!/[a-z]/.test(issue.input)) return NEW_PASSWORD.lowercaseRequired
        if (!/[A-Z]/.test(issue.input)) return NEW_PASSWORD.uppercaseRequired
        if (!/\d/.test(issue.input)) return NEW_PASSWORD.numberRequired
      }
      return NEW_PASSWORD.format
    }})
    .meta({
      description: "User's new password",
      example: "NewString123",
    }),
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
      description: "User's profile picture",
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
    .meta({
      description: "List of notification id to set the read status"
    }),
})

export const adminJSONSchema = z.toJSONSchema(adminSchema)
export const profileUpdateJSONSchema = z.toJSONSchema(profileUpdateSchema)
export const passwordUpdateJSONSchema = z.toJSONSchema(passwordUpdateSchema)
export const profilePictureJSONSchema = z.toJSONSchema(profilePictureSchema)
export const notificationReadStatusJSONSchema = z.toJSONSchema(notificationReadStatusSchema)
export const notificationReadStatusBulkJSONSchema = z.toJSONSchema(notificationReadStatusBulkSchema)

export type AdminData = z.infer<typeof adminSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type PasswordUpdateData = z.infer<typeof passwordUpdateSchema>
export type ProfilePictureData = z.infer<typeof profilePictureSchema>
export type NotificationReadStatusSchema = z.infer<typeof notificationReadStatusSchema>
export type NotificationReadStatusBulkSchema = z.infer<typeof notificationReadStatusBulkSchema>
