<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  FormLabel,
} from "@/components/ui/form"
import type {
  AttributeObjectWithoutVariant
} from "@/types/catalogueAttribute"

interface Props {
  index: number
  attribute: AttributeObjectWithoutVariant
}
const props = defineProps<Props>()

const {
  values,
} = inject("product-form-attributes")
const variantValues = computed(() => values?.variants?.[props.index]?.values ?? [])
const showAddVariant = computed(() => {
  switch (props.attribute.type) {
    case AttributeType.BOOLEAN:
      return variantValues.value.length < 2
    case AttributeType.SELECT:
      if (!("options" in (props.attribute.metadata ?? {}))) return false
      return variantValues.value.length < props.attribute.metadata.options.length
    default:
      return true
  }
})

const {
  fields: variantFields,
  push: variantPush,
  remove: variantRemove,
} = useFieldArray(`variants[${props.index}].values`)

function addVariant() {
  const hasLabel = ATTRIBUTES_WITH_LABEL_INPUT.includes(props.attribute.type)
  const metaData = ATTRIBUTE_WITH_META.includes(props.attribute.type) ? ATTRIBUTE_VALUE_META[props.attribute.type as AttributesWithMeta] : undefined

  variantPush({
    slug: "",
    value: null,
    ...(hasLabel ? { label: "" } : {}),
    ...(metaData ? { meta: metaData } : {}),
  })
}
</script>

<template>
  <BaseTooltip
    v-if="showAddVariant"
    color="primary"
    tooltip="Add new variant for this attribute">
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
  </BaseTooltip>

  <ul
    v-auto-animate
    class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full">
    <li
      v-for="(variant, variantIndex) in variantFields"
      :key="variantIndex"
      class="flex flex-col gap-y-3.5 px-3.5 pb-5 rounded-md outline outline-primary/25">
      <BaseTooltip
        color="destructive"
        tooltip="Remove this variant">
        <BaseButton
          variant="destructive"
          size="icon-sm"
          type="button"
          class="group ml-auto bg-destructive/10! hover:bg-destructive! border border-destructive/25 translate-y-3.5"
          @click="variantRemove(variantIndex)">
          <Icon
            name="lucide:trash-2"
            class="text-destructive group-hover:text-destructive-foreground" />
        </BaseButton>
      </BaseTooltip>

      <CatalogueProductFormAttributesForm
        :field-name="`variants[${props.index}].values[${variantIndex}]`"
        :attribute
        is-variant />

      <FormFieldInput
        :name="`variants[${props.index}].values[${variantIndex}].slug`"
        placeholder="Enter a unique slug for this variant"
        class="gap-y-1.25 [&_input]:text-xs">
        <template #label>
          <FormLabel class="text-xs font-medium text-muted-foreground">
            Variant Slug
          </FormLabel>
        </template>
      </FormFieldInput>
    </li>
  </ul>
</template>
