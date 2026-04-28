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

type SelectTypes = AttributeType.SELECT | AttributeType.MULTI_SELECT

interface Props {
  fieldName: string
  attribute: AttributeObject<SelectTypes>
  isVariant?: boolean
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
  multiple: false,
})

const attributeType = computed(() => props.isVariant ? "variant" : "property")

type SelectOption<LT extends AttributeType.TEXT | AttributeType.NUMBER> = AttributeObject<SelectTypes , LT>["metadata"]["options"][number]

const options = computed(() => {
  const {
    metadata,
  } = props.attribute
  type OptionItem = typeof metadata.options[number] & { id: string }

  return (metadata.options as Array<OptionItem>)
    .map(({ id, ...option }: OptionItem) => {
      let textValue: string
      if (props.attribute.metadata.type === AttributeType.TEXT) {
        const textOption = option as SelectOption<AttributeType.TEXT>
        textValue = textOption.value !
      } else {
        const numberOption = option as SelectOption<AttributeType.NUMBER>
        textValue = numberOption.label !
      }

      return {
        textValue,
        value: id,
      }
    })
})
</script>

<template>
  <FormFieldCombobox
    :name="`${fieldName}.value`"
    :options
    :multiple
    class="gap-y-1.25">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
    <template #placeholder>
      <span class="text-xs text-muted-foreground">
        Select the value for this {{ attributeType }}
      </span>
    </template>
    <template #trigger-value="data">
      <slot
        name="trigger-value"
        v-bind="data" />
    </template>
  </FormFieldCombobox>
</template>
