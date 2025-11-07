<script setup lang="ts">
import type {
  InputTypeHTMLAttribute,
} from "vue"

interface Props {
  name: string
  type?: InputTypeHTMLAttribute
  label?: string
  placeholder?: string
  description?: any
}
const props = defineProps<Props>()

const inputType = ref<InputTypeHTMLAttribute>(props.type ?? "text")
function toggleInputType() {
  inputType.value = inputType.value === "password" ? "text" : "password"
  console.log()
}
</script>

<template>
  <ShadcnFormField
    :name
    v-slot="{
      componentField,
      errors,
      errorMessage,
      ...formField
    }">
    <ShadcnFormItem>
      <ShadcnFormLabel v-if="label">
        {{ label }}
      </ShadcnFormLabel>
      <ShadcnFormControl>
        <slot v-bind="{
          ...formField,
          componentField,
          errors,
          errorMessage,
        }">
          <ShadcnInputGroup>
            <slot name="addon" />
            <ShadcnInputGroupInput
              v-bind="componentField"
              :type="inputType"
              :placeholder />
            <ShadcnInputGroupAddon
              v-if="type === 'password'"
              align="inline-end">
              <ShadcnButton
                variant="ghost"
                type="button"
                class="size-6 p-1 rounded-full cursor-pointer"
                @click="toggleInputType">
                <Icon name="mdi:eye" />
              </ShadcnButton>
            </ShadcnInputGroupAddon>
            </ShadcnInputGroup>
        </slot>
      </ShadcnFormControl>

      <slot
        name="description"
        :description>
        <ShadcnFormDescription
          v-if="description"
          class="text-xs">
          {{ description }}
        </ShadcnFormDescription>
      </slot>

      <slot
        name="error"
        :errors
        :errorMessage>
        <ShadcnFormMessage class="text-xs" />
      </slot>
    </ShadcnFormItem>
  </ShadcnFormField>
</template>
