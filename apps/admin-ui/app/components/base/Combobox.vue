<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  type SelectItemProps,
  type SelectRootProps,
  type AcceptableValue,
} from "reka-ui"
import {
  cn,
} from "@/lib/utils"

interface Props extends SelectRootProps {
  options: Array<SelectItemProps>
  placeholder?: string
  loading?: boolean
  clearable?: boolean
}
const props = defineProps<Props>()
const modelValue = defineModel<AcceptableValue | Array<AcceptableValue> | undefined>()

const open = ref(false)

const selectedOptions = ref<string>()

function selectOptions(selectedValue: AcceptableValue) {
  if (!props.multiple) {
    modelValue.value = selectedValue === modelValue.value ? null : selectedValue
    open.value = false
    selectedOptions.value = props.options.find(option => option.value === modelValue.value)?.textValue
    return
  }
  // is multiple
  if ((modelValue.value as Array<AcceptableValue> | undefined)?.includes(selectedValue)) {
    modelValue.value = (modelValue.value as Array<AcceptableValue> | undefined?? [])
      .filter((option) => option !== selectedValue)
  } else {
    if (Array.isArray(modelValue.value)) {
      modelValue.value.push(selectedValue)
    } else {
      modelValue.value = [selectedValue]
    }
  }
  const selected = props.options.reduce((selected: Array<string>, { value, textValue }) => {
    if ((modelValue.value as Array<AcceptableValue> | undefined ?? []).includes(value)) {
      selected.push(textValue as string)
    }
    return selected
  }, [])
  selectedOptions.value = selected.join(", ")
}

function isSelected(option: AcceptableValue): boolean {
  if (!props.multiple) return (modelValue.value === option)
  return (modelValue.value as Array<AcceptableValue> ?? []).includes(option)
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <BaseButton
        variant="outline"
        role="combobox"
        type="button"
        :aria-expanded="open"
        class="justify-between">
        <slot
          name="trigger"
          :model-value>
          {{ selectedOptions || placeholder }}
        <Icon
          name="lucide:chevrons-up-down"
          class="opacity-50" />
      </slot>
    </BaseButton>
    </PopoverTrigger>
    <PopoverContent class="p-0">
      <Command>
        <CommandInput
          class="h-9"
          :placeholder />
        <CommandList>
          <CommandEmpty>
            <slot name="empty">
              No items found.
            </slot>
          </CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="String(option.value)"
              :value="option.value"
              class="cursor-pointer"
              @select="(ev) => {
                selectOptions(ev.detail.value as string)
              }">
              <slot
                name="item"
                v-bind="option">
                {{ option.textValue }}
                <Icon
                  name="lucide:check"
                  :class="cn(
                    'ml-auto',
                    isSelected(option.value) ? 'opacity-100' : 'opacity-0',
                  )" />
              </slot>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

</template>