<script setup lang="ts">
import type z from "zod"

import {
  passwordUpdateWithConfirmSchema,
} from "@app/schemas/admin/user"

const {
  isSubmitting,
  handleSubmit,
} = useForm({
  validationSchema: toTypedSchema(
    passwordUpdateWithConfirmSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,
  ),
})

const onSubmit = handleSubmit(async ({ password, newPassword }) => {
  console.log({
    password,
    newPassword,
  })
})
</script>

<template>
  <section class="flex flex-col gap-y-4 px-2 py-1">
    <h1 class="w-full text-xl md:text-2xl font-medium">
      Update Password
    </h1>

    <form
      class="flex flex-col gap-y-3 max-w-sm"
      @submit="onSubmit">
      <FormFieldInput
        name="password"
        type="password"
        label="Password" />
      <FormFieldInput
        name="newPassword"
        type="password"
        label="New Password" />
      <FormFieldInput
        name="confirmPassword"
        type="password"
        label="Confirm Password" />

      <BaseButton
        :loading="isSubmitting"
        class="mt-2">
        Update
      </BaseButton>
    </form>
  </section>
</template>
