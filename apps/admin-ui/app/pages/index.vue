<script setup lang="ts">
const userStore = useUserStore()
const {
  user,
} = storeToRefs(userStore)
</script>

<template>
  <h1 class="text-2xl md:text-3xl font-semibold">
    Welcome {{ user?.name }}
  </h1>
</template>
