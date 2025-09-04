import {
  z,
} from "zod"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

import {
  EMAIL,
  USER_NAME,
  ROLE,
  PERMISSIONS,
} from "#constants/validationMessages"

export const adminSchema = z.object({
  name: z.string({ error: USER_NAME.required })
    .nonempty(USER_NAME.required)
    .meta({
      description: "User's name",
      example: "John Doe",
    }),
  email: z.email({ error: (issue) => {
      if (!issue.input) return EMAIL.required
      return EMAIL.valid
  }})
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

export const adminJSONSchema = z.toJSONSchema(adminSchema)
export const profileUpdateJSONSchema = z.toJSONSchema(profileUpdateSchema)

export type AdminData = z.infer<typeof adminSchema>
export type AdminFormFields = keyof AdminData

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type ProfileUpdateFormFields = keyof ProfileUpdateData
