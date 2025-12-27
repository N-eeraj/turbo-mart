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
          <Select
            v-bind="componentField"
            :multiple
            :disabled="disabled || readonly || loading">
            <div class="flex flex-col">
              <SelectTrigger class="w-full h-fit! cursor-pointer">
                <slot
                  name="trigger"
                  v-bind="componentField">
                  <SelectValue :placeholder class="text-start whitespace-break-spaces" />
                </slot>
              </SelectTrigger>
              <BaseLinearProgress
                v-if="loading"
                class="h-0.5!" />
            </div>
            <SelectContent>
              <SelectItem
                v-for="({ textValue, value }) in options"
                :value
                class="cursor-pointer">
                {{ textValue }}
              </SelectItem>
            </SelectContent>
          </Select>
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
