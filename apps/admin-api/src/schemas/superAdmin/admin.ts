import {
  z,
} from "zod"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

export const adminSchema = z.object({
  name: z.string({ error: "" })
    .nonempty("")
    .meta({
      description: "",
      example: "",
    }),
  email: z.string({ error: "" })
    .nonempty("")
    .meta({
      description: "",
      example: "",
    }),
  role: z.enum(Roles, { error: "" })
    .meta({
      description: "",
      example: "",
    }),
  permissions: z.array(
    z.enum(Permissions, { error: "" })
    .meta({
      description: "",
      example: "",
    })
  ),
})

export const adminJSONSchema = z.toJSONSchema(adminSchema)

export type LoginData = z.infer<typeof adminSchema>

