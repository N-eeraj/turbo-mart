<script setup lang="ts">
import {
  Toaster,
} from "@/components/ui/sonner"
import "vue-sonner/style.css"

const {
  error,
  pending,
  refresh,
} = useInitialLoad()

useHead({
  title: "TurboMart | Admin",
  link: [
    {
      rel: "icon",
      href: "/images/admin-logo-white.svg",
    },
  ],
})
</script>

<template>
  <ScreenInitial v-if="pending" />

  <ScreenServerUnreachable
    v-else-if="error"
    @retry="refresh" />

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>

  <Toaster theme="dark" />
</template>
