import {
  flattenError,
  type z,
  type ZodObject,
  type ZodRawShape,
} from "zod"

export type SchemaShape = ZodRawShape

/**
 * Validates given data against a Zod schema.
 *
 * @param schema - A Zod object schema to validate against.
 * @param data - The data to validate.
 * @returns The parsed and validated data.
 * @throws The flattened field errors if validation fails.
 */
function validateData<T extends SchemaShape>(schema: ZodObject<T>, data: unknown) {
  const {
    data: parsedData,
    error,
  } = schema.safeParse(data ?? {})
  if (error) {
    const {
      fieldErrors,
    } = flattenError(error)
    throw fieldErrors
  }

  return parsedData as z.infer<typeof schema>
}

export default validateData
