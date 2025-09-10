/**
 * Formats an error object into a consistent response format.
 * 
 * @param error - The error object to format. It can be any type, but it is expected to be an object with optional `status`, `message`, and `errors` properties.
 * 
 * @returns The formatted error object with `status`, `message`, and `errors` properties.
 * 
 * @example
 * const formattedError = formatError(new Error)
 * console.log(formattedError) 
 * // { status: 500, message: "Something went wrong", errors: undefined }
 * 
 * @example
 * const customError = { status: 400, message: "Bad Request", errors: ["Invalid data"] }
 * const formattedError = formatError(customError)
 * console.log(formattedError)
 * // { status: 400, message: "Bad Request", errors: ["Invalid data"] }
 */
export function formatError(error: unknown) {
  let status = 500
  let message = "Oops! Something went wrong"
  let errors = error

  if (error && typeof error === "object") {
    if ("status" in error && typeof error.status === "number") {
      status = error.status
      delete error.status
    }
    if ("message" in error && typeof error.message === "string" && error.message) {
      message = error.message
      delete error.message
    }
    if ("errors" in error) {
      errors = error.errors
    }
  }

  return {
    status,
    message,
    errors,
  }
}
