import * as z from "zod"

import {
  EMAIL,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
} from "#admin/constants/validationMessages"

export const userEmail = z.email({ error: (issue) => {
  if (!issue.input) return EMAIL.required
    return EMAIL.valid
  }})
    .trim()
    .meta({
      description: "User's email address.",
      example: "user@example.com",
    })

export const newPassword = z.string({ error: NEW_PASSWORD.required })
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
    description: "User's new password.",
    example: "NewString123",
  })

export const confirmPassword = z.string({ error: CONFIRM_PASSWORD.required })
  .nonempty(CONFIRM_PASSWORD.required)
  .meta({
    description: "Re-enter password.",
    example: "NewString123",
  })

export function passwordConfirmationSuperRefine(
  values: Record<string, unknown>,
  ctx: z.RefinementCtx,
  { passwordKey, confirmPasswordKey }: Record<"passwordKey" | "confirmPasswordKey", string>
) {
  if (values[passwordKey] !== values[confirmPasswordKey]) {
    ctx.addIssue({
      path: [confirmPasswordKey],
      message: CONFIRM_PASSWORD.mismatch,
      code: "custom",
    })
  }
}