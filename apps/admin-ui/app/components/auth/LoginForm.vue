<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const emit = defineEmits([
  "forgotPassword",
])

const {
  controlledValues,
  formError,
  isSubmitting,
  onSubmit,
} = useLogin()

defineExpose({
  controlledValues,
})
</script>

<template>
  <form 
    class="w-10/11 max-w-sm"
    @submit="onSubmit">
    <Card class="md:gap-y-4">
      <CardHeader>
        <CardTitle class="text-xl">
          Login
        </CardTitle>
      </CardHeader>

      <CardContent class="flex flex-col gap-y-4">
        <FormFieldInput
          name="email"
          label="Email"
          placeholder="Enter your email" />
        <FormFieldInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password">
          <template #description>
            <BaseButton
              variant="ghost"
              type="button"
              class="ml-auto text-sm text-foreground/80"
              @click="emit('forgotPassword')">
              Forgot Password?
            </BaseButton>
          </template>
        </FormFieldInput>

        <!-- Error message -->
        <span
          v-if="formError"
          class="text-destructive text-xs">
          {{ formError }}
        </span>
      </CardContent>

      <CardFooter class="flex justify-between px-6">
        <BaseButton
          :loading="isSubmitting"
          class="w-full md:w-fit md:ml-auto">
          Login
        </BaseButton>
      </CardFooter>
    </Card>
  </form>
</template>
