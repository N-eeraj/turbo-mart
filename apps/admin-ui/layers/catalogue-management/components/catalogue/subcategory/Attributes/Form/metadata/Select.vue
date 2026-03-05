<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Label,
} from "@/components/ui/label"
import { 
  type SelectAttributeMetadataType,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  field: "create" | "update"
  index: number
  type: SelectAttributeMetadataType
}
const props = defineProps<Props>()

const OPTIONS = [
  {
    label: "Text",
    value: AttributeType.TEXT,
  },
  {
    label: "Number",
    value: AttributeType.NUMBER,
  },
] as const

const {
  value: optionsType,
  errorMessage: optionsTypeErrorMessage,
} = useField<typeof OPTIONS[number]["value"]>(() => `${props.field}[${props.index}].metadata.type`)

const {
  fields: optionFields,
  push: optionPush,
  remove: optionRemove,
} = useFieldArray(`${props.field}[${props.index}].metadata.options`)

function addOption() {
  optionPush(
    optionsType.value === AttributeType.TEXT
      ? {
        value: "",
      }
      : {
        label: "",
        baseValue: "",
      }
  )
}

watch(() => optionsType.value, () => {
  optionFields.value = []
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <BaseRadio
      v-model="optionsType"
      :options="OPTIONS"
      label="Option Type"
      class="flex gap-x-0 md:col-span-2">
      <template #item="{ value, label }">
        <Label class="p-3 has-aria-checked:bg-primary/10 border has-aria-checked:border-primary/75 cursor-pointer">
          <RadioGroupItem :value />
          <span>
            {{ label }}
          </span>
        </Label>
      </template>
    </BaseRadio>
    <small
      v-if="optionsTypeErrorMessage"
      class="text-destructive">
      {{ optionsTypeErrorMessage }}
    </small>

    <div class="grid grid-cols-[1fr_auto] items-center gap-2 md:col-span-2">
      <small>
        Options
      </small>
      <BaseButton
        variant="outline"
        type="button"
        size="icon-sm"
        class="size-8 border-primary/50"
        @click="addOption">
        <Icon
          name="lucide:plus"
          :size="12"
          class="text-primary" />
      </BaseButton>

      <div
        v-if="optionsType === AttributeType.NUMBER"
        class="flex">
        <div class="flex-3">
          <strong class="text-foreground/75 text-xs font-semibold">
            Label
          </strong>
        </div>
        <div class="flex-2">
          <strong class="text-foreground/75 text-xs font-semibold">
            Base Value
          </strong>
        </div>
      </div>

      <ul class="col-span-2 max-h-48 space-y-2 overflow-y-auto">
        <li
          v-for="(option, optionIndex) in optionFields"
          :key="option.key"
          class="flex justify-between items-start gap-x-3 md:gap-x-4">
          <FormFieldInput
            v-if="option.value.id"
            :name="`${field}[${index}].metadata.options[${optionIndex}].id`"
            disabled
            class="hidden" />
          <FormFieldInput
            v-if="optionsType === AttributeType.TEXT"
            :name="`${field}[${index}].metadata.options[${optionIndex}].value`"
            :placeholder="`Option ${optionIndex + 1}`"
            class="flex-1" />
          <div
            v-else
            class="grid grid-cols-[3fr_2fr] gap-2 flex-1">
            <FormFieldInput
              :name="`${field}[${index}].metadata.options[${optionIndex}].label`"
              placeholder="Label" />
            <FormFieldInput
              :name="`${field}[${index}].metadata.options[${optionIndex}].baseValue`"
              type="number"
              placeholder="Base Value" />
          </div>
          <BaseButton
            variant="outline"
            type="button"
            size="icon-sm"
            class="aspect-square border-destructive/50"
            @click="optionRemove(optionIndex)">
            <Icon
              name="lucide:minus"
              :size="12"
              class="text-destructive" />
          </BaseButton>
        </li>
      </ul>
    </div>

    <FormFieldInput
      :name="`${field}[${index}].metadata.separator`"
      label="Separator"
      placeholder="Text to join the values"
      class="col-span-2" />
  </div>
</template>
