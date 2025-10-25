import * as z from "zod"

import {
  userEmail,
  newPassword,
} from "#admin/schemas/common.ts"
import {
  PASSWORD,
  RESET_PASSWORD_URL,
  PASSWORD_RESET_TOKEN,
  LOGOUT_OTHERS_ON_RESET,
} from "#admin/constants/validationMessages.ts"

export const loginSchema = z.object({
  email: userEmail,
  password: z.string({ error: PASSWORD.required })
    .nonempty(PASSWORD.required)
    .meta({
      description: "User's password.",
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
      description: "URL directed to in reset password email.",
      example: "https://example.com/reset-password",
    }),
})

export const resetPasswordSchema = z.object({
  token: z.string({ error: PASSWORD_RESET_TOKEN.required })
    .nonempty(PASSWORD_RESET_TOKEN.required)
    .length(64, { error: PASSWORD_RESET_TOKEN.valid })
    .regex(/^[a-f0-9]+$/i, { message: PASSWORD_RESET_TOKEN.valid })
    .trim()
    .meta({
      description: "Password reset token send via email.",
      example: "012a01ab01ab0abcd0ab0a0123456a01234a0abcde01abc01234567abc0a0a12",
    }),
  password: newPassword,
  logoutOthers: z.boolean({ error: LOGOUT_OTHERS_ON_RESET.valid })
    .optional()
    .meta({
      description: "Log out from other devices after password reset.",
      example: true,
    }),
})

export const loginJSONSchema = z.toJSONSchema(loginSchema)
export const forgotPasswordJSONSchema = z.toJSONSchema(forgotPasswordSchema)
export const resetPasswordJSONSchema = z.toJSONSchema(resetPasswordSchema)

export type LoginData = z.infer<typeof loginSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
