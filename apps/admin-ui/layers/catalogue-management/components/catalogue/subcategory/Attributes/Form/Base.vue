<script setup lang="ts">
import {
  type SelectItemProps,
} from "reka-ui"

interface Props {
  field: "create" | "update"
  index: number
  attributeTypes: Array<SelectItemProps>
  isLoadingAttributeTypes: boolean
}
defineProps<Props>()

interface Emits {
  remove: []
}
const emit = defineEmits<Emits>()
</script>

<template>
  <FormFieldInput
    :name="`${field}[${index}].name`"
    placeholder="Attribute Name" />
  <FormFieldSelect
    :name="`${field}[${index}].type`"
    :options="attributeTypes"
    placeholder="Attribute Type"
    :loading="isLoadingAttributeTypes" />
  <FormFieldCheckbox
    :name="`${field}[${index}].required`"
    label="Is a required attribute"
    class="py-2 md:order-2" />
  <FormFieldCheckbox
    :name="`${field}[${index}].variant`"
    label="Is a variant attribute"
    class="py-2 md:order-2" />
  <BaseButton
    variant="destructive"
    size="icon-sm"
    type="button"
    class="ml-auto order-3 md:order-1"
    @click="emit('remove')">
    <Icon name="lucide:trash-2" />
  </BaseButton>
</template>
