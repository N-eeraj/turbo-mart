<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import type {
  ClassNameValue,
} from "tailwind-merge"

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
  radioGroupClass?: ClassNameValue
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
            v-bind="componentField"
            :disabled
            :options
            :default-value
            :class="radioGroupClass">
            <template #default="data">
              <slot
                name="radio-group"
                v-bind="data" />
            </template>
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
