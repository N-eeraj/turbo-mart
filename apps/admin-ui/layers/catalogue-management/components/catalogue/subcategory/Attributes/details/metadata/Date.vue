<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  metadata?: AttributeObject<AttributeType.DATE>["metadata"]
}
const props = defineProps<Props>()

const minDate = computed(() => props.metadata?.min && new Date(props.metadata.min).toDateString())
const maxDate = computed(() => props.metadata?.max && new Date(props.metadata.max).toDateString())


const metadataRows = computed(() => [
  {
    label: "Min Date",
    value: minDate.value,
  },
  {
    label: "Max Date",
    value: maxDate.value,
  },
])
</script>

<template>
  <ul>
    <li
      v-for="({ label, value }, index) in metadataRows"
      :key="index"
      class="text-sm">
      <span class="text-foreground/75">
        {{ label }}:
      </span>
      <strong
        v-if="value"
        class="font-medium">
        {{ value }}
      </strong>
      <span
        v-else
        class="text-foreground/75">
        -
      </span>
    </li>
  </ul>
</template>
