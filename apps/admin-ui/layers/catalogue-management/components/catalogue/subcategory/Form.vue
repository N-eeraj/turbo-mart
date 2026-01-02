<script setup lang="ts">
interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const {
  categories,
  categorySearch,
  isLoadingCategories,
  isSubmitting,
  hasNextCategoriesPage,
  loadMoreCategories,
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
    <FormFieldCombobox
      name="category"
      v-model:search="categorySearch"
      placeholder="Select Category"
      :options="categories"
      :loading="isLoadingCategories"
      is-infinite
      :has-more-items="hasNextCategoriesPage"
      @scroll-end="loadMoreCategories" />

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
