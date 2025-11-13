<script setup lang="ts">
const route = useRoute()

const token = computed(() => route.query.token)

definePageMeta({
  layout: "empty",
  auth: "all",
})
</script>

<template>
  <main>
    <template v-if="token">
      Continue to reset password?
    </template>

    <template v-else>
      Invalid token
    </template>
  </main>
</template>
