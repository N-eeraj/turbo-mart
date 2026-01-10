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
</script>

<template>
  {{ minDate }}
  {{ maxDate }}
</template>
