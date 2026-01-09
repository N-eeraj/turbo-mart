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

const formattedDate = computed(() => {
  if (typeof modelValue.value === "string") {
    return df.format(new Date(modelValue.value))
  } else if (modelValue.value) {
    return df.format(modelValue.value)
  }
})

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>

watch(() => date.value, (value: DateValue | undefined) => {
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
        {{ modelValue ? formattedDate : "Pick a date" }}
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
