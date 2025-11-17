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
  email?: string
}
const props = defineProps<Props>()

const open = defineModel({
  type: Boolean,
  required: true,
})

const {
  isSubmitting,
  isInvalid,
  isSuccess,
  onSubmit,
} = useForgotPassword(
  open,
  computed(() => props.email)
)
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <!-- success state -->
      <template v-if="isSuccess">
        <AlertDialogHeader class="items-center">
          <AlertDialogTitle>
            Password Reset Success
          </AlertDialogTitle>
          <img
            src="/images/success.gif"
            alt="success-decorator"
            class="w-5/6 max-w-24" />
          <AlertDialogDescription>
            You'll receive an email to reset your password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <BaseButton
            variant="secondary"
            @click="open = false">
            Ok
          </BaseButton>
        </AlertDialogFooter>
      </template>

      <!-- reset request form -->
      <form
        v-else
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
            :disabled="isSubmitting"
            class="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <BaseButton
            variant="destructive"
            :disabled="isInvalid"
            :loading=isSubmitting>
            Send Reset Link
          </BaseButton>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
