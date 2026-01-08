<script setup lang="ts">
import {
  DateFormatter,
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

const modelValue = defineModel<DateValue>()

const attrs = useAttrs()

const defaultPlaceholder = today(getLocalTimeZone())
const df = new DateFormatter("en-US", {
  dateStyle: "long",
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
        {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : "Pick a date" }}
      </BaseButton>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="modelValue"
        :initial-focus="true"
        :default-placeholder
        layout="month-and-year" />
    </PopoverContent>
  </Popover>
</template>
