import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({ message: "Please enter an email" })
    .nonempty("Please enter an email")
    .email("Please enter a valid email"),
  password: z.string({ message: "Please enter a password" })
    .nonempty("Please enter a password"),
})
