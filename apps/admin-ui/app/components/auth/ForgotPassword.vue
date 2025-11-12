<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type z from "zod"

import {
  forgotPasswordSchema,
} from "@app/schemas/admin/auth"

interface Props {
  email: string
}

const props = defineProps<Props>()
const open = defineModel({
  type: Boolean,
  required: true,
})

const {
  handleSubmit,
  controlledValues,
  setFieldValue,
  setFieldTouched,
  isFieldValid,
  setErrors,
} = useForm({
  validationSchema: toTypedSchema(
    forgotPasswordSchema.pick({
      email: true,
    }) as unknown as z.ZodType<any, z.ZodTypeDef, any>,
  ),
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (body) => {
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  console.log(body)
  isLoading.value = false
})

watch(() => open.value, async (open) => {
  if (open) {
    setFieldValue("email", props.email)
    await nextTick()
    setFieldTouched("email", false)
  }
})
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <form
        class="space-y-4"
        @submit="onSubmit">
        <AlertDialogHeader class="text-start">
          <AlertDialogTitle class="max-sm:text-center">
            Forgot Your Password?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter your email address below, and we'll send you instructions to reset your password.
          </AlertDialogDescription>
          <FormFieldInput name="email" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            :disabled="isLoading"
            class="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <BaseButton
            variant="destructive"
            :disabled="!isFieldValid('email')"
            :loading=isLoading
            class="min-w-36">
            Send Reset Link
          </BaseButton>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
