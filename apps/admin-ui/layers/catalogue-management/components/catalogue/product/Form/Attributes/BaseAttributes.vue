<script setup lang="ts">
import {
  FormLabel,
} from "@/components/ui/form"
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  attributes: Array<Omit<AttributeObject<AttributeType>, "variant">>
}
defineProps<Props>()
</script>

<template>
  <section class="space-y-1.5">
    <div class="space-x-0.5">
      <strong class="text-sm">
        Base Attributes
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
        v-for="({ id, ...attribute }) in attributes"
        :key="id as unknown as string">
        {{ attribute }}
      </li>
    </ul>
  </section>
</template>
