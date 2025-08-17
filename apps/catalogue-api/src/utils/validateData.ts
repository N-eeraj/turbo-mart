import {
  type ZodObject,
} from "zod"

/**
 * Validates given data against a Zod schema.
 *
 * @param schema - A Zod object schema to validate against.
 * @param data - The data to validate.
 * @returns The parsed and validated data.
 * @throws The flattened field errors if validation fails.
 */
function validateData(schema: ZodObject<Record<string, any>>, data: unknown) {
  const {
    data: parsedData,
    error,
  } = schema.safeParse(data)
  if (error) {
    const {
      fieldErrors,
    } = error.flatten()
    throw fieldErrors
  }

  return parsedData
}

export default validateData
