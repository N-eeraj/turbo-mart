<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

interface Props {
  name: string
  label?: string
  placeholder?: string
  description?: any
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
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
          <div class="flex items-center gap-x-1">
            <BaseDatePicker
              v-bind="componentField"
              :placeholder
              :disabled="disabled || readonly"
              class="flex-1" />
            <BaseButton
              variant="ghost"
              type="button"
              class="size-6 p-1 rounded-full cursor-pointer"
              @click="formField.setValue('')">
              <Icon name="lucide:x" />
            </BaseButton>
          </div>
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
