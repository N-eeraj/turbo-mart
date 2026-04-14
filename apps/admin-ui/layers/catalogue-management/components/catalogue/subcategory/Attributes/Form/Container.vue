<script setup lang="ts">
import {
  type SelectItemProps,
} from "reka-ui"
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"

interface Props {
  field: "create" | "update"
  index: number
  attributeTypes: Array<SelectItemProps>
  isLoadingAttributeTypes: boolean
  type: AttributeType
}
defineProps<Props>()

interface Emits {
  remove: [number]
}
const emit = defineEmits<Emits>()
</script>

<template>
  <li class="@container/attribute-card grid md:grid-cols-[1fr_1fr_32px] md:grid-rows-[auto_auto_1fr] gap-x-4 gap-y-2 py-5 px-3 bg-secondary/20 border rounded">
    <slot />

    <CatalogueSubcategoryAttributesFormBase
      :field
      :index
      :attribute-types
      :type
      :is-loading-attribute-types
      @remove="emit('remove', index)" />

    <CatalogueSubcategoryAttributesFormMetadata
      :field
      :index
      :type />
  </li>
</template>
