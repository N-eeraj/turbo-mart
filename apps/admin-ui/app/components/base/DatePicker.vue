<script setup lang="ts">
import {
  DateFormatter,
  fromDate,
  getLocalTimeZone,
  today,
  type DateValue,
} from "@internationalized/date"
import {
  Calendar,
} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  cn,
} from "@/lib/utils"
import type {
  ClassValue,
} from "class-variance-authority/types"

interface Props {
  placeholder?: string
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  placeholder: "Pick a date",
  disabled: false,
})

const modelValue = defineModel<Date | string | null>()

const attrs = useAttrs()

const defaultPlaceholder = today(getLocalTimeZone())
const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

// convert modelValue to Date object if it's an ISO string to handle logic
const modelValueDate = computed(() => {
  if (typeof modelValue.value === "string") {
    if (modelValue.value === "") return null
    return new Date(modelValue.value)
  }
  return modelValue.value
})

const date = ref<DateValue>(fromDate(modelValueDate.value ?? new Date(), getLocalTimeZone())) as Ref<DateValue>

watch(() => date.value, (value: DateValue | undefined) => {
  // always set modelValue to ISO string
  modelValue.value = value?.toDate(getLocalTimeZone()).toISOString() ?? null
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <BaseButton
        variant="outline"
        :disabled
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          (attrs.class ?? '') as ClassValue,
        )">
        <Icon
          name="lucide:calendar"
          class="mr-2" />
        <slot
          v-if="modelValueDate"
          name="value"
          :model-value-date="modelValueDate"
          :formatted-date="df.format(modelValueDate)">
          {{ df.format(modelValueDate) }}
        </slot>
        <slot
          v-else
          name="placeholder">
          {{ placeholder }}
        </slot>
      </BaseButton>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="date"
        :initial-focus="true"
        :default-placeholder
        layout="month-and-year" />
    </PopoverContent>
  </Popover>
</template>
