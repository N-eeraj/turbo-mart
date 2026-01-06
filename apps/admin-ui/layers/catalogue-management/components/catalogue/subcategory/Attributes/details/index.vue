<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import TextMetadata from "~/components/catalogue/subcategory/attributes/details/metadata/Text.vue"
import NumberMetadata from "~/components/catalogue/subcategory/attributes/details/metadata/Number.vue"
import SelectMetadata from "~/components/catalogue/subcategory/attributes/details/metadata/Select.vue"
import DateMetadata from "~/components/catalogue/subcategory/attributes/details/metadata/Date.vue"

interface Props<T extends AttributeType> {
  name: AttributeObject<T>["name"]
  type: T
  required?: AttributeObject<T>["required"]
  variant?: AttributeObject<T>["variant"]
  metadata?: AttributeObject<T>["metadata"]
}
const props = defineProps<Props<AttributeType>>()

const MetadataComponentMap: Partial<Record<AttributeType, DefineComponent>> = {
  [AttributeType.TEXT]: TextMetadata,
  [AttributeType.NUMBER]: NumberMetadata,
  [AttributeType.SELECT]: SelectMetadata,
  [AttributeType.DATE]: DateMetadata,
}
const MetadataComponent = computed<DefineComponent | undefined>(() => MetadataComponentMap[props.type])
</script>

<template>
  <div>
    {{ name }}
    {{ type }}
    {{ required }}
    {{ variant }}
    <MetadataComponent
      v-if="MetadataComponent"
      :metadata />
  </div>
</template>
