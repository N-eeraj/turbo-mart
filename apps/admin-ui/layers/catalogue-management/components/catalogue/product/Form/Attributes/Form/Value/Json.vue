<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.JSON>
}
const props = defineProps<Props>()

const {
  fields: keyValueFields,
  push: keyValuePush,
  remove: keyValueRemove,
} = useFieldArray<{ key: string, value: string }>(`${props.fieldName}.value`)

function addKeyValuePair() {
  keyValuePush({
    key: "",
    value: "",
  })
}
</script>

<template>
  <ul>
    <li class="flex items-baseline mb-2 text-[13px] font-medium text-muted-foreground">
      <span class="flex-1 inline-block">
        Key Name
      </span>
      <span class="flex-1 inline-block">
        Value
      </span>
      <BaseButton
        variant="ghost"
        type="button"
        size="icon-sm"
        :tooltip="{
          content: 'Add new key value fields',
        }"
        class="size-9 ml-2 bg-primary/10! hover:bg-primary/20! border border-primary/30 duration-300"
        @click="addKeyValuePair">
        <Icon
          name="material-symbols:add-rounded"
          :size="18"
          class="text-primary" />
      </BaseButton>
    </li>

    <li
      v-for="(keyValue, keyValueIndex) in keyValueFields"
      :key="keyValue.key"
      class="flex justify-between items-center">
      <FormFieldInput
        :name="`${fieldName}.value[${keyValueIndex}].key`"
        placeholder="Enter key name"
        class="flex-1 gap-y-0.5 [&_input]:text-xs **:data-[slot=form-control]:rounded-none" />
      <FormFieldInput
        :name="`${fieldName}.value[${keyValueIndex}].value`"
        placeholder="Enter value"
        class="flex-1 gap-y-0.5 [&_input]:text-xs **:data-[slot=form-control]:rounded-none" />
      <BaseButton
        variant="destructive"
        type="button"
        size="icon-sm"
        :tooltip="{
          content: 'Remove this key value fields',
          color: 'destructive',
        }"
        class="size-7 ml-2 bg-destructive/10! hover:bg-destructive/20! border border-destructive/30 duration-400"
        @click="keyValueRemove(keyValueIndex)">
        <Icon
          name="ic:round-minus"
          class="text-destructive" />
      </BaseButton>
    </li>
  </ul>
</template>
