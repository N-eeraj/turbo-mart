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
  } }),
  password: z.string({ error: PASSWORD.required })
    .nonempty(PASSWORD.required),
})

export type LoginData = z.infer<typeof loginSchema>
