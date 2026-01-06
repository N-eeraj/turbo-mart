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
</script>

<template>
  {{ metadata?.min }}
  {{ metadata?.max }}
</template>
