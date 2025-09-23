import {
  email,
  z,
} from "zod"

import {
  EMAIL,
  PASSWORD,
} from "#constants/validationMessages"

const userEmail = z.email({ error: (issue) => {
  if (!issue.input) return EMAIL.required
  return EMAIL.valid
}})
  .trim()
  .meta({
    description: "User's email address",
    example: "user@example.com",
  })

export const loginSchema = z.object({
  email: userEmail,
  password: z.string({ error: PASSWORD.required })
    .nonempty(PASSWORD.required)
    .meta({
      description: "User's password",
      example: "string",
    }),
})

export const forgotPasswordSchema = z.object({
  email: userEmail,
})

export const loginJSONSchema = z.toJSONSchema(loginSchema)
export const forgotPasswordJSONSchema = z.toJSONSchema(forgotPasswordSchema)

export type LoginData = z.infer<typeof loginSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
