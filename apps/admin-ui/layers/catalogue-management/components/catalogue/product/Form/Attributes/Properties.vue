<script setup lang="ts">
import type {
  AttributeObjectWithoutVariant
} from "@/types/catalogueAttribute"

interface Props {
  attributes: Array<AttributeObjectWithoutVariant>
}
defineProps<Props>()
</script>

<template>
  <section class="space-y-1.5">
    <div class="space-x-0.5">
      <strong class="text-lg font-medium">
        Properties
      </strong>
      <BaseTooltip>
        <Icon
          name="lucide:info"
          :size="12" />
        <template #tooltip>
          <p class="max-w-md">
            Defines the core characteristics of a product that remain consistent across all variants.
            These attributes apply to the product as a whole. 
          </p>
        </template>
      </BaseTooltip>
    </div>

    <ul class="grid md:grid-cols-2 gap-x-6 gap-y-4">
      <li
        v-for="(attribute, index) in attributes"
        :key="attribute.id as unknown as string">
        <span class="inline-block mb-1.5 text-sm font-semibold">
          {{ attribute.name }}
          <BaseTooltip tooltip="This property is required">
            <span
              v-if="attribute.required"
              class="ml-1 text-red-500">
              *
            </span>
          </BaseTooltip>
        </span>

        <div class="space-y-2">
          <FormFieldInput
            :name="`properties[${index}].attribute`"
            class="hidden" />
          <CatalogueProductFormAttributesForm
            :field-name="`properties[${index}]`"
            :attribute />
        </div>
      </li>
    </ul>
  </section>
</template>
