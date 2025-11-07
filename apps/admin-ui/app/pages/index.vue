<script setup lang="ts">
const userStore = useUserStore()
const {
  user,
} = storeToRefs(useUserStore())
</script>

<template>
  <main>
    Welcome {{ user?.name }}
  </main>
</template>
