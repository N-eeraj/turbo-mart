<script setup lang="ts">
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";

interface Props {
  attributes: Array<AttributeObjectWithoutVariant>
}
const props = defineProps<Props>()
</script>

<template>
  <section class="space-y-1">
    <div class="space-x-0.5">
      <strong class="text-lg font-medium">
        Variant Attributes
      </strong>
      <BaseTooltip>
        <Icon
          name="lucide:info"
          :size="12" />
        <template #tooltip>
          <p class="max-w-md">
            Defines the characteristics that create product variations.
            Products can use multiple attributes, combined to form unique variants.
          </p>
        </template>
      </BaseTooltip>
    </div>

    <ul class="space-y-2">
      <li
        v-for="(attribute, index) in attributes"
        :key="attribute.id as unknown as string"
        class="flex items-baseline flex-wrap gap-x-2 gap-y-4">
        <span class="flex-1 inline-block mb-1.5 text-sm font-semibold">
          {{ attribute.name }}
          <span
            v-if="attribute.required"
            class="ml-1 text-red-500">
            *
          </span>
        </span>
        <FormFieldInput
          :name="`variants[${index}].attribute`"
          class="hidden" />
        <CatalogueProductFormAttributesVariantsValues
          :index
          :attribute />
      </li>
    </ul>
  </section>
</template>
