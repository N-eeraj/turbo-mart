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
  attributes,
  handleSubcategoryChange,
  isInvalid,
  onSubmit,
} = useProductForm(props)
</script>

<template>
  <form
    class="grid sm:grid-cols-2 gap-4 w-full"
    @submit="onSubmit">
    <FormFieldCombobox
      name="subcategory"
      v-model:search="subcategorySearch"
      placeholder="Select Subcategory"
      :options="subcategories"
      :loading="isLoadingSubcategories"
      is-infinite
      :has-more-items="hasNextSubcategoriesPage"
      @scroll-end="loadMoreSubcategories"
      @change="handleSubcategoryChange" />

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
      placeholder="Enter the product name"
      class="col-span-2" />

    <div
      v-if="attributes"
      class="col-span-2 space-y-1.5">
      <span class="inline-block text-foreground/75 font-medium">
        Product Attributes
      </span>
      <ul class="grid sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
        <li
          v-for="attribute in attributes"
          :key="attribute.id">
          {{ attribute }}
        </li>
      </ul>
    </div>

    <BaseButton
      :disabled="isInvalid"
      :loading="isSubmitting"
      class="sm:col-span-full justify-self-end flex items-center gap-x-2 w-full sm:max-w-fit">
      {{ !!initialValues ? "Update" : "Submit" }}
    </BaseButton>
  </form>
</template>
