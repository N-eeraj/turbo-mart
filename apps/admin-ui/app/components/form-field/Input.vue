<script setup lang="ts">
import type {
  InputTypeHTMLAttribute,
} from "vue"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import {
  cn,
} from "@/lib/utils"

interface Props {
  name: string
  type?: InputTypeHTMLAttribute
  label?: string
  placeholder?: string
  description?: any
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
}
const props = defineProps<Props>()

const inputType = ref<InputTypeHTMLAttribute>(props.type ?? "text")
function toggleInputType() {
  inputType.value = inputType.value === "password" ? "text" : "password"
}
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
          <InputGroup :class="cn(
            readonly && 'border-input/50',
          )">
            <slot name="addon" />
            <InputGroupInput
              v-bind="componentField"
              :type="inputType"
              :placeholder
              :disabled="disabled || readonly"
              :class="cn(
                readonly && 'opacity-100!',
              )" />
            <InputGroupAddon
              v-if="clearable"
              align="inline-end"
              :class="cn(
                !componentField.modelValue && 'invisible',
              )">
              <BaseButton
                variant="ghost"
                type="button"
                class="size-6 p-1 rounded-full cursor-pointer"
                @click="formField.setValue('')">
                <Icon name="lucide:x" />
              </BaseButton>
            </InputGroupAddon>
            <InputGroupAddon
              v-if="type === 'password'"
              align="inline-end">
              <BaseButton
                variant="ghost"
                type="button"
                class="size-6 p-1 rounded-full cursor-pointer"
                @click="toggleInputType">
                <Icon name="mdi:eye" />
              </BaseButton>
            </InputGroupAddon>
          </InputGroup>
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
