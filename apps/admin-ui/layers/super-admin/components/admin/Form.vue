<script setup lang="ts">
const {
  permissions,
  isLoadingPermissions,
  isSubmitting,
  isInvalid,
  onSubmit,
} = useAdminForm()
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-x-4 gap-y-3 w-full max-w-3xl"
    @submit="onSubmit">
    <FormFieldInput
      name="name"
      label="Name"
      class="w-full" />
    <FormFieldInput
      name="email"
      label="Email"
      class="w-full" />
    <FormFieldSelect
      name="permissions"
      label="Select Permissions"
      :options="permissions"
      :loading="isLoadingPermissions"
      multiple />

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 md:max-w-fit">
      Submit
    </BaseButton>
  </form>
</template>
