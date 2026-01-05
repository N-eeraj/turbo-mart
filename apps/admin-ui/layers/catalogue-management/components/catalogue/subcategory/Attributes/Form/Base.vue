<script setup lang="ts">
import {
  type SelectItemProps,
} from "reka-ui"

interface Props {
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
    :name="`create[${index}].name`"
    placeholder="Attribute Name" />
  <FormFieldSelect
    :name="`create[${index}].type`"
    :options="attributeTypes"
    placeholder="Attribute Type"
    :loading="isLoadingAttributeTypes" />
  <FormFieldCheckbox
    :name="`create[${index}].required`"
    label="Is a required attribute"
    class="py-2 md:order-2" />
  <FormFieldCheckbox
    :name="`create[${index}].variant`"
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
