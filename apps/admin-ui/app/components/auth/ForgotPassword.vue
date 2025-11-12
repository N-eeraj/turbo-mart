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

interface Props {
  email: string
}

const props = defineProps<Props>()
const open = defineModel({
  type: Boolean,
  required: true,
})

const {
  isLoading,
  isInvalid,
  onSubmit,
} = useForgotPassword(open, computed(() => props.email))
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
            :disabled="isInvalid"
            :loading=isLoading
            class="min-w-36">
            Send Reset Link
          </BaseButton>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
