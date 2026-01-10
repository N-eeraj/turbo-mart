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
  <div class="flex flex-col gap-y-1 h-full p-3 bg-secondary border rounded">
    <strong>
      {{ name }}
    </strong>

    <div class="flex items-center text-sm">
      <div class="flex-1 flex items-center gap-x-1">
        <span class="text-foreground/75">
          Required:
        </span>
        <Icon
          :name="required ? 'lucide:check' : 'lucide:x'"
          :class="required ? 'text-green-500' : 'text-red-500'" />
      </div>
      <div class="flex-1 flex items-center gap-x-1">
        <span class="text-foreground/75">
          Variant:
        </span>
        <Icon
          :name="variant ? 'lucide:check' : 'lucide:x'"
          :class="variant ? 'text-green-500' : 'text-red-500'" />
      </div>
    </div>

    <div
      v-if="MetadataComponent"
      class="flex flex-col gap-y-1 mt-2 pt-1.5 border-t border-t-foreground/10">
      <span class="text-xs text-foreground/75">
        Metadata
      </span>
      <MetadataComponent
        :metadata
        class="my-2 md:mb-0" />
    </div>
  </div>
</template>
