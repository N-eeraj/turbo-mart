<script setup lang="ts">
const emit = defineEmits([
  "retry",
])
</script>

<template>
  <main class="flex justify-center items-center flex-col gap-y-2 md:gap-y-4 h-svh">
    <h1 class="text-3xl md:text-5xl text-center">
      Oops!
    </h1>
    <div class="text-center">
      <h2 class="text-lg md:text-xl">
        We can't reach the server now.
      </h2>
      <p class="text-sm opacity-75">
        Please try again later.
      </p>
    </div>
    <BaseButton
      variant="secondary"
      class="mt-4 border border-primary text-primary"
      @click="emit('retry')">
      Reconnect
    </BaseButton>
  </main>
</template>
