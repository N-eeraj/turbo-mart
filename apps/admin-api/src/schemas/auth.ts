import {
  z,
} from "zod"

import {
  EMAIL,
  PASSWORD,
  RESET_PASSWORD_URL,
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
  redirectUrl: z.url({ error: (issue) => {
    if (!issue.input) return RESET_PASSWORD_URL.required
    return RESET_PASSWORD_URL.valid
  }})
    .trim()
    .meta({
      description: "URL directed to in reset password email",
      example: "https://example.com/reset-password",
    }),
})

export const loginJSONSchema = z.toJSONSchema(loginSchema)
export const forgotPasswordJSONSchema = z.toJSONSchema(forgotPasswordSchema)

export type LoginData = z.infer<typeof loginSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
