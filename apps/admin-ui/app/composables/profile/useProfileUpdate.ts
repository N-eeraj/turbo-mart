import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  profileUpdateSchema,
} from "@app/schemas/admin/user"

export default function useProfileUpdate() {
  const userStore = useUserStore()
  const {
    setUser,
  } = userStore
  const {
    user,
  } = storeToRefs(userStore)

  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
    resetForm,
  } = useForm({
    validationSchema: toTypedSchema(
      profileUpdateSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,
    ),
  })

  const enableEdit = ref(false)
  const toggleEdit = () => {
    enableEdit.value = !enableEdit.value
    if (!enableEdit.value && user.value) {
      resetForm({
        values: {
          email: user.value.email,
          name: user.value.name,
        }
      })
    }
  }

  const isInvalid = computed(() => !isFieldValid("name") || !isFieldValid("email"))

  const onSubmit = handleSubmit(async (body) => {
    if (!enableEdit.value) return
    try {
      const {
        data,
        message,
      } = await useApi("/profile", {
        method: "PATCH",
        body,
      })
      setUser(data as Parameters<typeof setUser>[0])
      toast.success(message)
      toggleEdit()
    } catch (error: unknown) {
      const {
        message,
        errors,
      } = error as ApiError
      if (errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        toast.error(message)
      }
    }
  })

  return {
    user,
    enableEdit,
    isInvalid,
    isSubmitting,
    toggleEdit,
    onSubmit,
  }
}
