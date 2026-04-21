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
  fieldName: string
  attribute: AttributeObject<AttributeType.BOOLEAN>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

const attributeType = computed(() => props.isVariant ? "variant" : "property")

const options = [
  {
    label: "True",
    value: "true",
  },
  {
    label: "False",
    value: "false",
  },
]
</script>

<template>
  <FormFieldRadio
    :name="`${fieldName}.value`"
    :options
    radio-group-class="flex">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
  </FormFieldRadio>
</template>
