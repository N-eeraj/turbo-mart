<script setup lang="ts">
interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const {
  categories,
  isLoadingCategories,
  isSubmitting,
  isInvalid,
  onSubmit,
} = useSubcategoryForm(props)
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
      description="Unique and short name (slug) of the subcategory." />
    <FormFieldSelect
      name="category"
      label="Select Category"
      :options="categories"
      :loading="isLoadingCategories" />

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
