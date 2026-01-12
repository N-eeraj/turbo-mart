<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Label,
} from "@/components/ui/label"
import {
  cn,
} from "@/lib/utils"

interface Option {
  value: string | number
  label: string
}

interface Props {
  disabled?: boolean
  options: Array<Option> | ReadonlyArray<Option>
  defaultValue?: any
}
const props = defineProps<Props>()
</script>

<template>
  <RadioGroup
    :default-value
    :disabled>
    <slot :options>
      <template v-for="({ label, value }) in options">
        <slot
          name="item"
          :value
          :label>
          <Label :class="cn(
            !disabled && 'cursor-pointer'
          )">
            <RadioGroupItem :value />
            <slot
              name="item-label"
              :value
              :label>
              <span>
                {{ label }}
              </span>
            </slot>
          </Label>
        </slot>
      </template>
    </slot>
  </RadioGroup>
</template>
