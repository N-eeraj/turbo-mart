<script setup lang="ts">
import {
  type AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  field: "create" | "update"
  index: number
  type?: AttributeType
}
defineProps<Props>()
</script>

<template>
  <div class="order-2 md:order-3 md:col-span-3 pt-2 border-t border-t-foreground/10">
    <span class="text-xs text-foreground/75">
      Metadata
    </span>
    Attribute Type: {{ type }}
  </div>
</template>
