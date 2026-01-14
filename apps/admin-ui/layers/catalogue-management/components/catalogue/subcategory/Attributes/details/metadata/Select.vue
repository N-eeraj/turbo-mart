<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

type Metadata<T extends AttributeType.TEXT | AttributeType.NUMBER> = AttributeObject<AttributeType.SELECT | AttributeType.MULTI_SELECT, T>["metadata"]
type TextMetadata = Metadata<AttributeType.TEXT>
type NumberMetadata = Metadata<AttributeType.NUMBER>

interface Props {
  metadata: TextMetadata | NumberMetadata
}
const props = defineProps<Props>()

const formattedOptions = computed(() => {
  if (props.metadata.type === AttributeType.TEXT) {
    return props.metadata.options
  }
  return props.metadata.options
    .sort((a, b) => a.base - b.base)
    .map(({ template, value, unit }) => {
    return template
      .replaceAll("{{value}}", value.toString())
      .replaceAll("{{unit}}", unit?.toString() ?? "")
  })
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <span class="text-xs text-foreground/75 font-semibold">
      Options
    </span>

    <ul class="text-sm list-disc pl-4 font-light">
      <li
        v-for="(option, index) in formattedOptions"
        :key="index">
        {{ option }}
      </li>
    </ul>
  </div>
</template>
