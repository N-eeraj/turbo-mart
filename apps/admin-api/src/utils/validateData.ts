import {
  type z,
  type ZodObject,
  type ZodRawShape,
} from "zod"

export type SchemaShape = ZodRawShape

/**
 * Converts Zod validation errors into a nested object format.
 *
 * @param errors - An array of Zod error issues.
 * 
 * @returns A nested object with arrays of error messages by path.
 */
function convertErrorsToNestedObject<T extends SchemaShape>(
  errors: z.ZodError<z.core.$InferObjectOutput<T, {}>>["issues"]
) {
  const result: Record<PropertyKey, any> = {}

  for (const error of errors) {
    const { path, message } = error
    let current = result

    for (let i = 0; i < path.length; i++) {
      const key = path[i]

      if (i === path.length - 1) {
        if (!Array.isArray(current[key])) {
          current[key] = []
        }
        if (!current[key].includes(message)) {
          current[key].push(message)
        }
      } else {
        if (!(key in current)) {
          current[key] = {}
        }
        current = current[key]
      }
    }
  }

  return result
}

/**
 * Validates given data against a Zod schema.
 * 
 * @param schema - A Zod object schema to validate against.
 * @param data - The data to validate.
 * 
 * @returns The parsed and validated data.
 * 
 * @throws The flattened field errors if validation fails.
 */
function validateData<T extends SchemaShape>(schema: ZodObject<T>, data: unknown) {
  const {
    data: parsedData,
    error,
  } = schema.safeParse(data ?? {})
  if (error) {
    throw convertErrorsToNestedObject(error.issues)
  }

  return parsedData
}

export default validateData
