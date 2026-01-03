<script setup lang="ts">
interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const {
  isSubmitting,
  subcategories,
  subcategorySearch,
  isLoadingSubcategories,
  hasNextSubcategoriesPage,
  loadMoreSubcategories,
  brands,
  brandSearch,
  isLoadingBrands,
  hasNextBrandsPage,
  loadMoreBrands,
  isInvalid,
  onSubmit,
} = useProductForm(props)
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-4 w-full max-w-3xl"
    @submit="onSubmit">
    <FormFieldCombobox
      name="subcategory"
      v-model:search="subcategorySearch"
      placeholder="Select Subcategory"
      :options="subcategories"
      :loading="isLoadingSubcategories"
      is-infinite
      :has-more-items="hasNextSubcategoriesPage"
      @scroll-end="loadMoreSubcategories" />

    <FormFieldCombobox
      name="brand"
      v-model:search="brandSearch"
      placeholder="Select Brand"
      :options="brands"
      :loading="isLoadingBrands"
      is-infinite
      :has-more-items="hasNextBrandsPage"
      @scroll-end="loadMoreBrands" />

    <FormFieldInput
      name="name"
      label="Name"
      placeholder="Enter the product name" />

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
