<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  metadata: AttributeObject<AttributeType.BOOLEAN>["metadata"]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="text-xs">
    <span class="text-foreground/75">
      True Value:
    </span>
    <strong
      v-if="metadata.trueValue"
      class="font-medium">
      {{ metadata.trueValue }}
    </strong>
  </div>
  <div class="text-xs">
    <span class="text-foreground/75">
      False Value:
    </span>
    <strong
      v-if="metadata.falseValue"
      class="font-medium">
      {{ metadata.falseValue }}
    </strong>
  </div>
</template>
