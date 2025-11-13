<script setup lang="ts">
const route = useRoute()

const token = computed(() => route.query.token as string ?? "")
const isTokenValid = ref(!!token.value)

function setTokenInvalid() {
  isTokenValid.value = false
}

definePageMeta({
  layout: "empty",
  auth: "all",
})
</script>

<template>
  <main class="flex flex-col justify-center items-center gap-y-2 h-svh">
    <AuthResetTokenForm
      v-if="isTokenValid"
      :token
      @invalid-token="setTokenInvalid" />

    <AuthResetTokenInvalid v-else />
  </main>
</template>
