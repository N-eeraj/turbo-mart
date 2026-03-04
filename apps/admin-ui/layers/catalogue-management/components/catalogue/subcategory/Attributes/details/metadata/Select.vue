<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type SelectAttributeType,
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

type Metadata<T extends SelectAttributeType, LT extends AttributeType.TEXT | AttributeType.NUMBER> = AttributeObject<T, LT>["metadata"]
type TextMetadata<T extends SelectAttributeType> = Metadata<T, AttributeType.TEXT>
type NumberMetadata<T extends SelectAttributeType> = Metadata<T, AttributeType.NUMBER>

interface SelectProps {
  type: AttributeType.SELECT
  metadata: TextMetadata<AttributeType.SELECT> | NumberMetadata<AttributeType.SELECT>
}
interface MultiSelectProps {
  type: AttributeType.MULTI_SELECT
  metadata: TextMetadata<AttributeType.MULTI_SELECT> | NumberMetadata<AttributeType.MULTI_SELECT>
}
const props = defineProps<SelectProps | MultiSelectProps>()

const formattedOptions = computed(() => {
  if (props.metadata.type === AttributeType.TEXT) {
    return props.metadata.options.map(({ value }) => value)
  }
  return props.metadata.options
    .sort((a, b) => a.baseValue - b.baseValue)
    .map(({ label }) => label)
})
</script>

<template>
  <div class="flex flex-col">
    <div class="text-xs">
      <span class="text-foreground/75 font-semibold">
        Type:
      </span>
      <strong class="font-light">
        {{ metadata.type === AttributeType.TEXT ? "Text" : "Number" }}
      </strong>
    </div>

    <div>
      <span class="text-xs text-foreground/75 font-semibold">
        Options
      </span>
      <ul class="text-xs list-disc pl-4 font-light">
        <li
          v-for="(option, index) in formattedOptions"
          :key="index">
          {{ option }}
        </li>
      </ul>
    </div>

    <div
      v-if="type === AttributeType.MULTI_SELECT"
      class="text-xs">
      <span class="text-foreground/75 font-semibold">
        Separator:
      </span>
      <strong class="font-light">
        {{ metadata.separator }}
      </strong>
    </div>
  </div>
</template>
