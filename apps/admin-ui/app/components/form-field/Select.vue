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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props extends SelectRootProps {
  name: string
  options: Array<SelectItemProps>
  label?: string
  placeholder?: string
  description?: any
  loading?: boolean
  readonly?: boolean
}
const props = defineProps<Props>()
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
          <BaseSelect
            v-bind="componentField"
            :multiple
            :options
            :loading
            :placeholder
            :disabled="disabled || readonly || loading" />
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
