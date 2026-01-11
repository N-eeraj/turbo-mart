<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  metadata?: AttributeObject<AttributeType.TEXT>["metadata"]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="text-sm">
    <span class="text-foreground/75">
      Max Length:
    </span>
    <strong
      v-if="metadata?.maxLength"
      class="font-medium">
      {{ metadata.maxLength }}
    </strong>
    <span
      v-else
      class="text-foreground/75">
      -
    </span>
  </div>
</template>
