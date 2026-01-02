<script setup lang="ts">
import type {
  SelectItemProps,
  SelectRootProps,
} from "reka-ui"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

interface Props extends SelectRootProps {
  name: string
  options: Array<SelectItemProps>
  label?: string
  placeholder?: string
  description?: any
  loading?: boolean
  clearable?: boolean
  readonly?: boolean
  isInfinite?: true
  hasMoreItems?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hasMoreItems: true,
})
const search = defineModel<string>("search", {
  default: "",
})
const emit = defineEmits([
  "scroll-end",
])
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
    <FormItem class="flex flex-col">
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
          <BaseCombobox
            v-bind="componentField"
            v-model:search="search"
            :multiple
            :options
            :loading
            :placeholder
            :clearable
            :disabled="disabled || readonly || loading"
            :is-infinite
            :has-more-items
            @scroll-end="emit('scroll-end')">
            <template #trigger="data">
              <slot
                name="trigger"
                v-bind="data" />
            </template>
            <template #trigger-value="data">
              <slot
                name="trigger-value"
                v-bind="data" />
            </template>
            <template #empty="data">
              <slot
                name="empty"
                v-bind="data" />
            </template>
            <template #item="data">
              <slot
                name="item"
                v-bind="data" />
            </template>
            <template #loading-popover="data">
              <slot
                name="loading-popover"
                v-bind="data" />
            </template>
            <template #loading-infinite="data">
              <slot
                name="loading-infinite"
                v-bind="data" />
            </template>
          </BaseCombobox>
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
