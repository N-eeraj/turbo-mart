import { z } from "zod"

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
})

export default productSchema
