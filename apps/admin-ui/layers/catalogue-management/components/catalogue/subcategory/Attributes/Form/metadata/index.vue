<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import TextMetadata from "~/components/catalogue/subcategory/attributes/form/metadata/Text.vue"
import NumberMetadata from "~/components/catalogue/subcategory/attributes/form/metadata/Number.vue"
import SelectMetadata from "~/components/catalogue/subcategory/attributes/form/metadata/Select.vue"
import MultiSelectMetadata from "~/components/catalogue/subcategory/attributes/form/metadata/MultiSelect.vue"
import DateMetadata from "~/components/catalogue/subcategory/attributes/form/metadata/Date.vue"

interface Props {
  field: "create" | "update"
  index: number
  type?: AttributeType
}
const props = defineProps<Props>()

const MetadataComponentMap: Partial<Record<AttributeType, DefineComponent>> = {
  [AttributeType.TEXT]: TextMetadata,
  [AttributeType.NUMBER]: NumberMetadata,
  [AttributeType.SELECT]: SelectMetadata,
  [AttributeType.MULTI_SELECT]: MultiSelectMetadata,
  [AttributeType.DATE]: DateMetadata,
}

const MetadataComponent = computed<DefineComponent | undefined>(() => MetadataComponentMap[props.type])
</script>

<template>
  <div
    v-if="MetadataComponent"
    class="order-2 md:order-3 md:col-span-3 pt-2 border-t border-t-foreground/10">
    <span class="text-xs text-foreground/75">
      Metadata
    </span>
    <MetadataComponent />
  </div>
</template>
