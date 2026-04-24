<script setup lang="ts">
interface Emits {
  submit: [unknown]
}
const emit = defineEmits<Emits>()

const {
  isLoadingProductData,
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
} = useProductForm(emit)
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-4 w-full"
    @submit="onSubmit">
    <FormFieldCombobox
      name="subcategory"
      v-model:search="subcategorySearch"
      placeholder="Select Subcategory"
      label="Subcategory"
      :options="subcategories"
      :loading="isLoadingSubcategories || isLoadingProductData"
      is-infinite
      :has-more-items="hasNextSubcategoriesPage"
      @scroll-end="loadMoreSubcategories" />

    <FormFieldCombobox
      name="brand"
      v-model:search="brandSearch"
      placeholder="Select Brand"
      label="Brand"
      :options="brands"
      :loading="isLoadingBrands || isLoadingProductData"
      is-infinite
      :has-more-items="hasNextBrandsPage"
      @scroll-end="loadMoreBrands" />

    <FormFieldInput
      name="name"
      label="Name"
      placeholder="Enter the product name"
      :loading="isLoadingProductData" />

    <FormFieldInput
      name="slug"
      label="Slug"
      placeholder="Enter the product slug"
      :loading="isLoadingProductData" />

    <BaseButton
      :disabled="isLoadingProductData || isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
