<script setup lang="ts">
import {
  FormLabel,
} from "@/components/ui/form"
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute"

interface Props {
  index: number
  attribute: AttributeObjectWithoutVariant
}
const props = defineProps<Props>()

const {
  fields: variantFields,
  push: variantPush,
  remove: variantRemove,
} = useFieldArray(`variants[${props.index}].values`)

function addVariant() {
  const hasLabel = ATTRIBUTES_WITH_LABEL_INPUT.includes(props.attribute.type)
  const metaData = ATTRIBUTE_VALUE_META[props.attribute.type]

  variantPush({
    slug: "",
    value: null,
    ...(hasLabel ? { label: "" } : {}),
    ...(metaData ? { meta: metaData } : {}),
  })
}

const {
  setFieldValue,
} = useForm()
function handleDerivedLabelUpdate(fieldName: string, value: string) {
  setFieldValue(fieldName, value)
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

  <ul
    v-auto-animate
    class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full">
    <li
      v-for="(variant, variantIndex) in variantFields"
      :key="variantIndex"
      class="flex flex-col gap-y-3.5 px-3.5 pb-5 rounded-md outline outline-primary/25">
      <BaseButton
        variant="destructive"
        size="icon-sm"
        type="button"
        class="group ml-auto bg-destructive/10 border border-destructive/25 translate-y-3.5"
        @click="variantRemove(variantIndex)">
        <Icon
          name="lucide:trash-2"
          class="text-destructive group-hover:text-destructive-foreground" />
      </BaseButton>

      <CatalogueProductFormAttributesValue
        :field-name="`variants[${props.index}].values[${variantIndex}]`"
        :attribute
        @label-change="(label: string) => handleDerivedLabelUpdate(`variants[${props.index}].values[${variantIndex}].label`, label)" />
      <CatalogueProductFormAttributesLabel
        :label-name="`variants[${props.index}].values[${variantIndex}].label`"
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
    </li>
  </ul>
</template>
