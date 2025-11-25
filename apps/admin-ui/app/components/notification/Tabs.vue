<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  cn,
} from "@/lib/utils"


interface Props {
  tabs: ReadonlyArray<{
    label: string
    value: unknown
  }>
}
defineProps<Props>()

const modelValue = defineModel({
  type: Number,
})

const emit = defineEmits([
  "update",
])
</script>

<template>
  <Tabs
    v-model="modelValue"
    class="max-md:mt-2 mb-3"
    @update:model-value="value => emit('update', value)">
    <TabsList class="flex md:justify-end items-center w-full md:w-fit ml-auto">
      <TabsTrigger
        v-for="({ label }, index) in tabs"
        :value="index"
        :key="index"
        :class="cn(
          'min-w-20 cursor-pointer',
          modelValue === index && 'text-primary',
        )">
        {{ label }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
