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

const modelValue = defineModel<Date | string | null>()

const attrs = useAttrs()

const defaultPlaceholder = today(getLocalTimeZone())
const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

// convert modelValue to Date object if it's an ISO string to handle logic
const modelValueDate = computed(() => typeof modelValue.value === "string" ? new Date(modelValue.value) : modelValue.value)

const date = ref<DateValue>(fromDate(modelValueDate.value ?? new Date(), getLocalTimeZone())) as Ref<DateValue>

watch(() => date.value, (value: DateValue | undefined) => {
  // always set modelValue to ISO string
  modelValue.value = value?.toDate(getLocalTimeZone()).toISOString()
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <BaseButton
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          (attrs.class ?? '') as ClassValue,
        )">
        <Icon
          name="lucide:calendar"
          class="mr-2" />
        {{ modelValueDate ? df.format(modelValueDate) : "Pick a date" }}
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
