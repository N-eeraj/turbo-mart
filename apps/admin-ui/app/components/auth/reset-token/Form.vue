<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

interface Props {
  token: string
}
const {
  token
} = defineProps<Props>()

const emit = defineEmits([
  "invalidToken",
])

const {
  errors,
  isLoading,
  onSubmit,
} = useResetPassword(
  computed(() => token)
)

watch(() => errors.value.token, () => {
  emit("invalidToken")
})
</script>

<template>
  <form
    class="w-10/11 max-w-sm"
    @submit="onSubmit">
    <Card class="md:gap-y-4">
      <CardHeader>
        <CardTitle class="text-xl">
          Reset Password
        </CardTitle>
      </CardHeader>

      <CardContent class="flex flex-col gap-y-4">
        <FormFieldInput
          name="password"
          type="password"
          label="New Password"
          placeholder="Enter your new password" />
        <FormFieldInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password" />
        <FormFieldCheckbox
          name="logoutOthers"
          label="Logout from other devices?" />
      </CardContent>

      <CardFooter class="flex justify-between px-6">
        <BaseButton
          :loading="isLoading"
          class="w-full min-w-20 md:w-fit md:ml-auto">
          Reset Password
        </BaseButton>
      </CardFooter>
    </Card>
  </form>
</template>
