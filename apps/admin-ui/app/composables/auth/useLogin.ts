import {
  toTypedSchema,
} from "@vee-validate/zod"
import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  loginSchema,
} from "@app/schemas/admin/auth"

export default function useLogin() {
  const route = useRoute()
  const router = useRouter()

  const {
    setUser,
    setToken,
  } = useUserStore()

  const {
    handleSubmit,
    controlledValues,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      loginSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
  })

  const isLoading = ref(false)
  const formError = ref<string | null>()

  const onSubmit = handleSubmit(async (body) => {
    formError.value = null
    try {
      isLoading.value = true
      const {
        message,
        data,
      } = await useApi("/auth/login", {
        method: "POST",
        body,
      })

      const {
        user,
        token,
      } = data as {
        user: Parameters<typeof setUser>[0]
        token: Parameters<typeof setToken>[0]
      }
      setUser(user)
      setToken(token)

      router.replace(route.query.to as string ?? "/")

      toast.success(message, {
        richColors: true,
      })
    } catch (error: unknown) {
      const {
        status,
        message,
        errors,
      } = error as ApiError
      if (errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        if (status === 401) {
          formError.value = message
        }
      }
    } finally {
      isLoading.value = false
    }
  })

  return {
    controlledValues,
    formError,
    isLoading,
    onSubmit,
  }
}