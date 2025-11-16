<script setup lang="ts">
interface Props {
  open: boolean
  src: string
  alt?: string
}
defineProps<Props>()

const emit = defineEmits([
  "close"
])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed top-0 left-0 size-full bg-secondary z-50">
      <BaseButton
        variant="ghost"
        class="absolute top-2 md:top-3 right-2 md:right-6 p-0 cursor-pointer"
        @click="emit('close')">
        <Icon
          name="lucide:x"
          :size="24" />
      </BaseButton>
    </div>
    <Transition
      enter-from-class="w-30 md:w-36 opacity-0"
      enter-active-class="duration-200 md:duration-500"
      leave-to-class="w-30 md:w-36 opacity-0"
      leave-active-class="duration-200">
      <div
        v-if="open"
        class="fixed top-1/2 left-1/2 w-11/12 max-w-md aspect-square rounded-none -translate-x-1/2 -translate-y-1/2 z-50">
        <img
          :src
          :alt
          class="w-full h-full object-cover" />
      </div>
    </Transition>
  </Teleport>
</template>
