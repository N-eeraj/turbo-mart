<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

interface Step {
  indicator: number | string
  title: string
  description: string
  disabled?: boolean
}
interface Props {
  steps: Array<Step>
  linear?: boolean
}
withDefaults(defineProps<Props>(), {
  linear: true,
})

interface Emits {
  change: [number | undefined]
}
const emit = defineEmits<Emits>()

const modelValue = defineModel<number>()

const attributes = useAttrs()

watch(() => modelValue.value, (value: number | undefined) => {
  emit("change", value)
})
</script>

<template>
  <Stepper
    v-model="modelValue"
    as="ul"
    :linear
    :class="attributes.class">
    <StepperItem
      v-for="({ title, indicator, description, disabled }, step) in steps"
      :step
      as="li"
      class="relative flex-1 justify-center">
      <StepperTrigger
        class="cursor-pointer"
        :disabled>
        <StepperIndicator>
          <slot
            name="indicator"
            :step="step + 1">
            {{ indicator }}
          </slot>
        </StepperIndicator>
        <StepperTitle>
          <slot
            name="title"
            :step="step + 1">
            {{ title }}
          </slot>
        </StepperTitle>
        <StepperDescription>
          <slot
            name="description"
            :step="step + 1">
            {{ description }}
          </slot>
        </StepperDescription>
      </StepperTrigger>
      <StepperSeparator
        v-if="step !== steps.length - 1"
        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
    </StepperItem>
  </Stepper>

  <template v-for="step of steps.length">
    <slot
      v-if="step - 1 === modelValue"
      :name="`step-${step}`" />
  </template>
</template>
