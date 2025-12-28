<script setup lang="ts">
interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const {
  permissions,
  isLoadingPermissions,
  isSubmitting,
  isInvalid,
  onSubmit,
} = useAdminForm(props)
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-4 w-full max-w-3xl"
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
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
