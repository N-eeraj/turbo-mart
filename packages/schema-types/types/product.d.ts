import type { z } from "zod"
import productSchema from "../schemas/product"

type Product = z.infer<typeof productSchema>

export default Product
