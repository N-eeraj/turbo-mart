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
}
const props = defineProps<Props>()
const modelValue = defineModel<AcceptableValue | AcceptableValue[] | undefined>()
const emit = defineEmits([
  "change",
])
const attrs = useAttrs()

watch(() => modelValue.value, (modelValue) => {
  emit("change", modelValue)
})
</script>

<template>
  <Select
    v-model="modelValue"
    :multiple
    :disabled
    :default-open
    :default-value>
    <div class="flex flex-col">
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
    <SelectContent>
      <SelectItem
        v-for="({ textValue, value }) in options"
        :key="String(value)"
        :value
        class="cursor-pointer">
        {{ textValue }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
