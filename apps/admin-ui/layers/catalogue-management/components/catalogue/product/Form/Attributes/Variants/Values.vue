<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  FormLabel,
} from "@/components/ui/form"

interface Props {
  index: number
  attribute: Omit<AttributeObject<AttributeType>, "variant">
}
const props = defineProps<Props>()

const {
  fields: variantFields,
  push: variantPush,
  remove: variantRemove,
} = useFieldArray(`variants[${props.index}].values`)

function addVariant() {
  variantPush({})
}
</script>

<template>
  <BaseButton
    variant="outline"
    type="button"
    size="icon-sm"
    class="size-8 ml-auto border-primary/50"
    @click="addVariant">
    <Icon
      name="lucide:plus"
      :size="12"
      class="text-primary" />
  </BaseButton>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 w-full">
    <div
      v-for="(variant, variantIndex) in variantFields"
      class="flex flex-col gap-y-3.5 p-3.5 pb-5 rounded-md outline outline-primary/25">
      <CatalogueProductFormAttributesValue
        :field-base="`variants[${props.index}].values[${variantIndex}]`"
        :attribute />
      <FormFieldInput
        :name="`variants[${props.index}].values[${variantIndex}].slug`"
        placeholder="Enter a unique slug for this attribute"
        class="gap-y-1.25 [&_input]:text-xs">
        <template #label>
          <FormLabel class="text-xs font-medium text-muted-foreground">
            Slug
          </FormLabel>
        </template>
      </FormFieldInput>
    </div>
  </div>
</template>
