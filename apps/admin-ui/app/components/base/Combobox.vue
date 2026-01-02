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

interface InfinityProps {
  isInfinite?: true
  hasMoreItems?: boolean
}

interface Props extends SelectRootProps, InfinityProps {
  options: Array<SelectItemProps>
  placeholder?: string
  loading?: boolean
  clearable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hasMoreItems: true,
})
const modelValue = defineModel<AcceptableValue | Array<AcceptableValue> | undefined>()
const search = defineModel<string>("search", {
  default: "",
})
const emit = defineEmits([
  "scroll-end",
])

const open = ref(false)

function selectOptions(selectedValue: AcceptableValue) {
  if (!props.multiple) {
    modelValue.value = selectedValue === modelValue.value ? null : selectedValue
    open.value = false
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
}

function isSelected(option: AcceptableValue): boolean {
  if (!props.multiple) return (modelValue.value === option)
  return (modelValue.value as Array<AcceptableValue> ?? []).includes(option)
}

const showClearAction = computed(() => props.clearable && (
  props.multiple ?
    (modelValue.value as Array<AcceptableValue> | undefined)?.length
    : modelValue.value
))

function resetModelValue() {
  modelValue.value = props.multiple ? [] : null
}

const optionsMap = ref(new Map())
watch(
  () => props.options,
  (options) => {
    options.forEach(({ value, textValue }) => {
      optionsMap.value.set(value, textValue)
    })
  }, {
    immediate: true,
  }
)

const selectedOptions = computed(() => {
  const value = modelValue.value

  // handle empty state
  if (!value || !(value as Array<AcceptableValue>).length) {
    return undefined
  }

  // handle single select
  if (!props.multiple) {
    return optionsMap.value.get(value)
  }

  // handle multi select
  const valueArray = value as Array<AcceptableValue>
  
  return valueArray
    .map((value) => optionsMap.value.get(value))  
    .join(", ")
})

async function handleSearchMount(commandInput: any) {
  // set `filterState.search` as `search` ref on re-mount
  commandInput.component.setupState.filterState.search = search.value
  // reset selection and move cursor to end
  await nextTick()
  const searchInput = commandInput.el.querySelector("input")
  searchInput.setSelectionRange(search.value.length, search.value.length)
}

const optionsListEl = useTemplateRef<HTMLUListElement>("options-list")

const { reset } = useInfiniteScroll(
  () => optionsListEl.value,
  () => {
    emit("scroll-end")
  },
  {
    distance: 10,
    canLoadMore: () => !props.loading && props.hasMoreItems,
  }
)

watch(() => open.value, () => {
  search.value = ""
  reset()
})
</script>

<template>
  <Popover v-model:open="open">
    <div class="flex flex-col w-full">
      <PopoverTrigger as-child>
        <BaseButton
          variant="outline"
          role="combobox"
          type="button"
          :aria-expanded="open"
          class="justify-between">
          <slot
            name="trigger"
            :model-value
            :selected-options>
            <slot
              v-if="modelValue"
              name="trigger-value"
              :model-value
              :selected-options>
              {{ selectedOptions }}
            </slot>
            <template v-else>
              {{ placeholder }}
            </template>
            <Icon
              name="lucide:chevrons-up-down"
              class="ml-auto opacity-50" />
            <BaseButton
              v-if="showClearAction"
              variant="ghost"
              class="p-0"
              @click.stop="resetModelValue">
              <Icon name="lucide:x" />
            </BaseButton>
          </slot>
        </BaseButton>
        <BaseLinearProgress
          v-if="loading && !open"
          class="h-0.5!" />
      </PopoverTrigger>
    </div>

    <!-- Loading Popover -->
    <PopoverContent
      v-if="loading && !isInfinite"
      class="p-0">
      <Command>
        <CommandInput
          :value="search"
          disabled
          :placeholder
          class="h-9" />
      </Command>
      <slot name="loading-popover">
        <div class="px-2 py-6">
          <BaseLinearProgress v-if="loading" />
        </div>
      </slot>
    </PopoverContent>

    <PopoverContent
      v-else
      class="p-0">
      <Command>
        <CommandInput
          v-model="search"
          :placeholder
          class="h-9"
          @vue:mounted="handleSearchMount" />
        <CommandList ref="options-list">
          <CommandEmpty v-if="!loading && !options.length">
            <slot name="empty">
              No items found.
            </slot>
          </CommandEmpty>
          <CommandGroup as="ul">
            <CommandItem
              v-for="option in options"
              :key="String(option.value)"
              as="li"
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
        <slot
          v-if="isInfinite && loading"
          name="loading-infinite">
          <BaseLinearProgress />
        </slot>
      </Command>
    </PopoverContent>
  </Popover>
</template>
