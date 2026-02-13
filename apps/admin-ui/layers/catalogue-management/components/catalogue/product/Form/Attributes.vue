<script setup lang="ts">
interface Emits {
  submit: [unknown]
}
const emit = defineEmits<Emits>()

const {
  isLoadingProductAttributes,
  isLoadingSubcategoryAttributes,
  subcategoryAttributesMap,
} = useProductFormAttributes(emit)
</script>

<template>
  <BaseLinearProgress v-if="isLoadingProductAttributes || isLoadingSubcategoryAttributes" />
  <form
    v-else>
    <section>
      <strong>
        Base Attributes
      </strong>
      <ul>
        <li
          v-for="attribute in subcategoryAttributesMap.base"
          :key="attribute.id">
          {{ attribute }}
        </li>
      </ul>
    </section>

    <section>
      <strong>
        Variant Attributes
      </strong>
      <ul>
        <li
          v-for="attribute in subcategoryAttributesMap.variant"
          :key="attribute.id">
          {{ attribute }}
        </li>
      </ul>
    </section>
  </form>
</template>
