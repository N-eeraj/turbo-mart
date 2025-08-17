import {
  z,
} from "zod"

import {
  EMAIL,
  PASSWORD,
} from "#constants/validationMessages"

export const loginSchema = z.object({
  email: z.string({ message: EMAIL.required })
    .nonempty(EMAIL.required)
    .email(EMAIL.valid),
  password: z.string({ message: PASSWORD.required })
    .nonempty(PASSWORD.required),
})
