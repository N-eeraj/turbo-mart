<script setup lang="ts">
const {
  isSubmitting,
  onSubmit,
} = usePasswordUpdate()
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
