<script setup lang="ts">
const {
  attributeTypes,
  isLoadingAttributeTypes,
  isSubmitting,
  createAttributeFields,
  createAttributePush,
  createAttributeRemove,
  updateAttributeFields,
  removeAttribute,
  onSubmit,
  values,
  errors,
} = useAttributesMapping()
</script>

<template>
  <form
    class="flex flex-col gap-y-3"
    @submit="onSubmit">
    <ul class="grid md:grid-cols-2 gap-4">
      <li
        v-for="(field, index) in createAttributeFields"
        :key="field.key"
        class="grid md:grid-cols-[1fr_1fr_32px] gap-x-4 gap-y-2 py-5 px-3 bg-secondary/20 border rounded">
        <CatalogueSubcategoryAttributesFormBase
          field="create"
          :index
          :attribute-types
          :is-loading-attribute-types
          @remove="createAttributeRemove(index)" />

        <CatalogueSubcategoryAttributesFormMetadata
          field="create"
          :index
          :type="field.value?.type" />
      </li>

      <li
        v-for="(field, index) in updateAttributeFields"
        :key="field.key"
        class="grid md:grid-cols-[1fr_1fr_32px] gap-x-4 gap-y-2 py-5 px-3 bg-secondary/20 border rounded">
        <FormFieldInput
          :name="`update[${index}].id`"
          class="hidden" />

        <CatalogueSubcategoryAttributesFormBase
          field="update"
          :index
          :attribute-types
          :is-loading-attribute-types
          @remove="removeAttribute(index)" />

        <CatalogueSubcategoryAttributesFormMetadata
          field="update"
          :index
          :type="field.value?.type" />
      </li>
    </ul>

    <BaseButton
      variant="outline"
      type="button"
      class="ml-auto px-3 text-primary/75 hover:text-primary"
      @click="createAttributePush({ name: '', type: null })">
      <span class="text-xs">
        Add Attribute
      </span>
      <Icon
        name="lucide:plus"
        :size="14" />
    </BaseButton>

    <span
      v-if="errors.root"
      class="text-xs text-destructive">
      {{ errors.root }}
    </span>

    <BaseButton class="mt-3 md:mt-4 ml-auto">
      Submit
    </BaseButton>
  </form>
</template>
