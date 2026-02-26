<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Checkbox,
} from "@/components/ui/checkbox"

interface Props {
  name: string
  label?: string
  description?: any
}
const props = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <FormField
    :name
    v-slot="{
      value,
      handleChange,
      ...formField
    }"
    type="checkbox">
    <FormItem
      class="flex flex-col gap-y-1"
      :class="attrs.class">
      <slot v-bind="{
        ...formField,
        value,
        handleChange,
      }">
        <div class="flex flex-row items-start gap-x-3 space-y-0">
          <FormControl>
            <Checkbox
              :model-value="value"
              @update:model-value="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <slot
              name="label"
              :label>
              <FormLabel
                v-if="label"
                class="cursor-pointer">
                {{ label }}
              </FormLabel>
            </slot>

            <slot
              name="description"
              :description>
              <FormDescription
                v-if="description"
                class="text-xs">
                {{ description }}
              </FormDescription>
            </slot>
          </div>
        </div>
      </slot>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
