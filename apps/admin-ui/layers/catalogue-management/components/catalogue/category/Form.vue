<script setup lang="ts">
// import useCatalogueForm from "~/composables/catalogue/useCatalogueForm"

interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const {
  isSubmitting,
  isInvalid,
  onSubmit,
} = useCatalogueForm(props)
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-4 w-full max-w-3xl"
    @submit="onSubmit">
    <FormFieldInput
      name="name"
      label="Name" />
    <FormFieldInput
      name="slug"
      label="Slug"
      description="Unique and short name (slug) of the category." />

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
