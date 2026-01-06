<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

type Metadata<T extends AttributeType.TEXT | AttributeType.NUMBER> = AttributeObject<AttributeType.SELECT | AttributeType.MULTI_SELECT, T>["metadata"]
type TextOptions = Metadata<AttributeType.TEXT>["options"]
type NumberOptions = Metadata<AttributeType.NUMBER>["options"]

interface Props {
  metadata: Metadata<AttributeType.TEXT | AttributeType.NUMBER>
}
defineProps<Props>()
</script>

<template>
  {{ metadata.type }}
  <ul>
    <li
      v-for="(option, index) in metadata.options"
      :key="index">
      <template v-if="metadata.type === AttributeType.TEXT">
        {{ option as TextOptions[number] }}
      </template>
      <template v-else-if="metadata.type === AttributeType.NUMBER">
        {{ (option as NumberOptions[number]).base }}
        {{ (option as NumberOptions[number]).template }}
        {{ (option as NumberOptions[number]).unit }}
        {{ (option as NumberOptions[number]).value }}
      </template>
    </li>
  </ul>
</template>
