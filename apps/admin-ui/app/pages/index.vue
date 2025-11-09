<script setup lang="ts">
const userStore = useUserStore()
const {
  user,
} = storeToRefs(userStore)
</script>

<template>
  <main>
    Welcome {{ user?.name }}
  </main>
</template>
