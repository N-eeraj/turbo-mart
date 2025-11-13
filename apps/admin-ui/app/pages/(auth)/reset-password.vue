<script setup lang="ts">
const route = useRoute()

const token = computed(() => route.query.token as string ?? "")

definePageMeta({
  layout: "empty",
  auth: "all",
})
</script>

<template>
  <main class="flex flex-col justify-center items-center gap-y-2 h-svh">
    <AuthResetTokenForm
      v-if="token"
      :token />

    <AuthResetTokenInvalid v-else />
  </main>
</template>
