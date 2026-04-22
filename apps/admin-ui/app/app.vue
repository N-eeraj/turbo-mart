<script setup lang="ts">
import {
  Toaster,
} from "@/components/ui/sonner"
import "vue-sonner/style.css"

useHead({
  title: "TurboMart | Admin",
  link: [
    {
      rel: "icon",
      href: "/images/admin-logo-white.svg",
    },
  ],
})

const {
  error,
  pending,
  refresh,
} = useInitialLoad()
</script>

<template>
  <ScreenInitial v-if="pending" />

  <LazyScreenServerUnreachable
    v-else-if="error"
    @retry="refresh" />

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>

  <Toaster theme="dark" />
</template>
