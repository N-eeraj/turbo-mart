<script setup lang="ts">
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
  <section class="space-y-1">
    <div class="space-x-0.5">
      <strong class="text-sm">
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
        v-for="attribute in attributes"
        :key="attribute.id as unknown as string">
        {{ attribute }}
      </li>
    </ul>
  </section>
</template>
