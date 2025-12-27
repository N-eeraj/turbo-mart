<script setup lang="ts">
import type { NuxtError } from "#app"

useHead({
  title: "TurboMart | Admin",
  link: [
    {
      rel: "icon",
      href: "/images/admin-logo-white.svg",
    },
  ],
})

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <main class="flex flex-col justify-center items-center gap-y-1.5 h-svh p-4">
    <h2 class="text-7xl sm:text-8xl font-semibold leading-none">
      {{ error.statusCode }}
    </h2>
    <h1 class="text-foreground/60 text-xl sm:text-2xl text-center">
      {{ error.message || "Oops! Something went wrong." }}
    </h1>
    <NuxtLink
      to="/"
      class="mt-2">
      <BaseButton
        variant="link"
        size="sm"
        class="underline">
        Go back home
      </BaseButton>
    </NuxtLink>
  </main>
</template>
