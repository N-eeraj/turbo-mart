import {
  z,
} from "zod"

import {
  EMAIL,
  PASSWORD,
} from "#constants/validationMessages"

export const loginSchema = z.object({
  email: z.email({ error: (issue) => {
    if (!issue.input) return EMAIL.required
    return EMAIL.valid
  }})
    .trim()
    .meta({
      description: "User's email address",
      example: "user@example.com",
    }),
  password: z.string({ error: PASSWORD.required })
    .nonempty(PASSWORD.required)
    .meta({
      description: "User's password",
      example: "string",
    }),
})

export const loginJSONSchema = z.toJSONSchema(loginSchema)

export type LoginData = z.infer<typeof loginSchema>
