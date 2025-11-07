<script setup lang="ts">
import {
  toTypedSchema,
} from "@vee-validate/zod"
import type z from "zod"
import { toast } from "vue-sonner"

import {
  loginSchema,
} from "@app/schemas/admin/auth"

const {
  handleSubmit,
  setErrors,
} = useForm({
  validationSchema: toTypedSchema(loginSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>),
})

const onSubmit = handleSubmit(async (body) => {
  try {
    const {
      message,
      data,
    } = await useApi("/auth/login", {
      method: "POST",
      body,
    })
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
      setErrors(errors)
    } else if (message) {
      toast.error(message, {
        richColors: true,
      })
    }
  }
})

definePageMeta({
  auth: "guest",
  layout: "empty",
})
</script>

<template>
  <section class="flex justify-center items-center h-svh">
    <form 
      class="w-10/11 max-w-sm"
      @submit="onSubmit">
      <ShadcnCard class="md:gap-y-4">
        <ShadcnCardHeader>
          <ShadcnCardTitle class="text-xl">
            Login
          </ShadcnCardTitle>
        </ShadcnCardHeader>

        <ShadcnCardContent class="flex flex-col gap-y-4">
          <BaseFormField
            name="email"
            label="Email"
            placeholder="Enter your email" />
          <BaseFormField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password" />
        </ShadcnCardContent>

        <ShadcnCardFooter class="flex justify-between px-6">
          <ShadcnButton class="w-full md:w-fit md:ml-auto cursor-pointer">
            Login
          </ShadcnButton>
        </ShadcnCardFooter>
      </ShadcnCard>
    </form>
  </section>
</template>
