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

interface Props {
  field: "create" | "update"
  index: number
}
const props = defineProps<Props>()

const OPTIONS = [
  {
    label: "Text",
    value: String(AttributeType.TEXT),
  },
  {
    label: "Number",
    value: String(AttributeType.NUMBER),
  },
] as const

const optionsType = ref<typeof OPTIONS[number]["value"]>(OPTIONS[0].value)

const {
  fields: optionFields,
  push: optionPush,
  remove: optionRemove,
} = useFieldArray(`${props.field}[${props.index}].metadata.options`)

function addOption() {
  optionPush(
    optionsType.value === String(AttributeType.TEXT)
      ? ""
      : {}
  )
}

watch(() => optionsType.value, () => {
  optionFields.value = []
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <FormFieldRadio
      :name="`${field}[${index}].metadata.type`"
      v-model="optionsType"
      :options="OPTIONS"
      label="Option Type"
      radio-group-class="flex gap-x-0"
      class="md:col-span-2">
      <template #item="{ value, label }">
        <Label class="p-3 has-aria-checked:bg-primary/10 border has-aria-checked:border-primary/75 cursor-pointer">
          <RadioGroupItem :value />
          <span>
            {{ label }}
          </span>
        </Label>
      </template>
    </FormFieldRadio>

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
      <ul class="col-span-2 space-y-2">
        <li
          v-for="(option, optionIndex) in optionFields"
          :key="option.key"
          class="flex justify-between items-center gap-x-3 md:gap-x-4">
          <div class="flex-1">
            <FormFieldInput
              v-if="optionsType === String(AttributeType.TEXT)"
              :name="`${field}[${index}].metadata.options[${optionIndex}]`"
              :placeholder="`Option ${optionIndex + 1}`" />
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
  </div>
</template>
