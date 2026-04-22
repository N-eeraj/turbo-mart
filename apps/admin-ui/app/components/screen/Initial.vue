<script setup lang="ts">
const {
  appLogo,
} = useTheme()
</script>

<template>
  <main class="flex justify-center items-center flex-col gap-y-4 h-svh">
    <img
      :src="appLogo"
      alt="Turbo Mart Admin Logo"
      class="w-3/8 max-w-40" />

    <span class="text-lg animate-pulse">
      Loading...
    </span>
  </main>
</template>
