<script setup lang="ts">
import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  profileUpdateSchema,
} from "@app/schemas/admin/user"

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
} = useForm({
  validationSchema: toTypedSchema(
    profileUpdateSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,
  ),
})

const isInvalid = computed(() => {
  return !isFieldValid("name") || !isFieldValid("email")
})

const onSubmit = handleSubmit(async (body) => {
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
</script>

<template>
  <form
    v-if="user"
    class="flex flex-col gap-y-4 w-5/6 mt-4"
    @submit="onSubmit">
    <FormFieldInput
      name="name"
      :value="user.name"
      placeholder="Name"
      class="w-full" />
    <FormFieldInput
      name="email"
      :value="user.email"
      placeholder="Email"
      class="w-full" />
    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="md:max-w-fit">
      Update
    </BaseButton>
  </form>
</template>
