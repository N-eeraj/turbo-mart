<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
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
  name: string
  label?: string
  description?: any
  disabled?: boolean
  options: Array<Option> | ReadonlyArray<Option>
  defaultValue?: any
}
const props = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <FormField
    :name
    v-slot="{
      componentField,
      errors,
      errorMessage,
      ...formField
    }">
    <FormItem
      class="flex flex-col"
      :class="attrs.class">
      <slot
        v-bind="{
          ...formField,
          componentField,
          errors,
          errorMessage,
        }">
        <slot
          name="label"
          :label>
          <FormLabel v-if="label">
            {{ label }}
          </FormLabel>
        </slot>

        <FormControl>
          <BaseRadio
            :disabled
            :options
            :default-value>
            <template #item="data">
              <slot
                name="item"
                v-bind="data" />
            </template>
            <template #item-label="data">
              <slot
                name="item-label"
                v-bind="data" />
            </template>
          </BaseRadio>
        </FormControl>

        <slot
          name="description"
          :description>
          <FormDescription
            v-if="description"
            class="text-xs">
            {{ description }}
          </FormDescription>
        </slot>

        <slot
          name="error"
          :errors
          :errorMessage>
          <FormMessage class="text-xs" />
        </slot>
      </slot>
    </FormItem>
  </FormField>
</template>
