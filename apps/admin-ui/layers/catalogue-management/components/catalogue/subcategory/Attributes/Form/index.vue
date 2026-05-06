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
  subcategoryLink,
  errors,
} = useAttributesMapping()
</script>

<template>
  <form
    class="flex flex-col gap-y-3"
    @submit="onSubmit">
    <ul
      v-auto-animate
      class="grid md:grid-cols-[repeat(auto-fill,minmax(440px,1fr))] gap-4">
      <CatalogueSubcategoryAttributesFormContainer
        v-for="(field, index) in updateAttributeFields"
        :key="field.key"
        field="update"
        :index
        :attribute-types
        :is-loading-attribute-types
        :type="field.value?.type"
        @remove="removeAttribute">
        <FormFieldInput
          :name="`update[${index}].id`"
          class="hidden" />
      </CatalogueSubcategoryAttributesFormContainer>

      <CatalogueSubcategoryAttributesFormContainer
        v-for="(field, index) in createAttributeFields"
        :key="field.key"
        field="create"
        :index
        :attribute-types
        :is-loading-attribute-types
        :type="field.value?.type"
        @remove="createAttributeRemove" />
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

    <div class="flex items-center gap-x-2 md:gap-x-4 mt-3 md:mt-4 ml-auto">
      <NuxtLink
        :to="subcategoryLink"
        :class="{
          'pointer-events-none': isSubmitting,
        }">
        <BaseButton
          variant="secondary"
          type="button"
          :disabled="isSubmitting"
          class="w-full">
          Cancel
        </BaseButton>
      </NuxtLink>
      <BaseButton
        :loading="isSubmitting">
        Submit
      </BaseButton>
    </div>
  </form>
</template>
