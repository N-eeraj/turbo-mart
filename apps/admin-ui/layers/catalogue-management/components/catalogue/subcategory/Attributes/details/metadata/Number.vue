<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props{
  metadata?: AttributeObject<AttributeType.NUMBER>["metadata"]
}
const props = defineProps<Props>()
</script>

<template>
  {{ metadata?.base }}
  {{ metadata?.max }}
  {{ metadata?.min }}
  {{ metadata?.template }}
  {{ metadata?.unit }}
</template>
