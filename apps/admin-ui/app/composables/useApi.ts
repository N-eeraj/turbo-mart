export interface ApiSuccess {
  success: true
  message: string
  data?: unknown
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, unknown>
}

export default async function useApi(
  ...[
    endpoint,
    options = {},
  ]: Parameters<typeof $fetch>
): Promise<ApiSuccess> {
  const {
    public: { apiUrl },
  } = useRuntimeConfig()
  const userStore = useUserStore()
  const {
    token,
  } = storeToRefs(userStore)

  try {
    if (token.value) {
      options.headers = {
        ...options.headers,
        Authorization: token.value
      }
    }
    const response = await $fetch(apiUrl + endpoint, options)
    return response as ApiSuccess
  } catch (error) {
    const errorObject: Partial<ApiError> = {
      status: undefined,
      errors: undefined,
      message: undefined,
    }

    if (typeof error === "object" && error) {
      if ("status" in error) {
        errorObject.status = error.status as ApiError["status"]
      }
      if ("data" in error && error.data && typeof error.data === "object") {
        if ("message" in error.data) {
          errorObject.message = error.data.message as ApiError["message"]
        }
        if ("errors" in error.data) {
          errorObject.errors = error.data.errors as ApiError["errors"]
        }
      }
    }

    throw errorObject
  }
}
