<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  cn,
} from "@/lib/utils"

interface Props{
  metadata?: AttributeObject<AttributeType.NUMBER>["metadata"]
}
const props = defineProps<Props>()

const metadataRows = computed(() => [
  {
    label: "Base Value",
    value: props.metadata?.base,
  },
  {
    label: "Unit",
    value: props.metadata?.unit,
  },
  {
    label: "Min Value",
    value: props.metadata?.min,
  },
  {
    label: "Max Value",
    value: props.metadata?.max,
  },
  {
    label: "Template",
    value: props.metadata?.template,
  },
])
</script>

<template>
  <table class="text-sm w-full border-collapse">
    <tbody>
      <tr
        v-for="({ label, value }, index) in metadataRows"
        :key="index">
        <td class="text-foreground/75">
          {{ label }}:
        </td>
        <td
          :class="cn(
            'font-medium',
            !value && 'text-foreground/75'
          )">
          {{ value ?? "-" }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
