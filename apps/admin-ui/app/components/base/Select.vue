<script setup lang="ts">
import {
  type SelectItemProps,
  type SelectRootProps,
  type AcceptableValue,
} from "reka-ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props extends SelectRootProps {
  options: Array<SelectItemProps>
  placeholder?: string
  loading?: boolean
  clearable?: boolean
}
const props = defineProps<Props>()
const modelValue = defineModel<AcceptableValue | Array<AcceptableValue> | undefined>()
const attrs = useAttrs()

const showClearAction = computed(() => props.clearable && (
  props.multiple ?
    (modelValue.value as Array<AcceptableValue> | undefined)?.length
    : modelValue.value
))
function clearModelValue() {
  modelValue.value = props.multiple ? [] : null
}
</script>

<template>
  <Select
    v-model="modelValue"
    :multiple
    :disabled
    :default-open
    :default-value>
    <div class="flex items-center gap-x-1">
      <div class="flex flex-col w-full">
        <SelectTrigger
          v-bind="attrs"
          class="w-full h-fit! cursor-pointer">
          <slot
            name="trigger"
            v-bind="props">
            <SelectValue
              :placeholder
              class="text-start whitespace-break-spaces" />
          </slot>
        </SelectTrigger>
        <BaseLinearProgress
          v-if="loading"
          class="h-0.5!" />
      </div>
      <BaseButton
        v-if="showClearAction"
        variant="ghost"
        type="button"
        class="size-6 p-1 rounded-full"
        @click.stop="clearModelValue">
        <Icon name="lucide:x" />
      </BaseButton>
    </div>
    <SelectContent>
      <SelectItem
        v-for="({ textValue, value }) in options"
        :key="String(value)"
        :value
        class="cursor-pointer">
        <slot
          name="option"
          v-bind="{ textValue, value, modelValue }">
          {{ textValue }}
        </slot>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
