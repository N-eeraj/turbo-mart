<script setup lang="ts">
import {
  ProgressRoot,
  ProgressIndicator,
} from "reka-ui"
</script>

<template>
  <ProgressRoot class="bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full">
    <ProgressIndicator class="bg-primary h-full w-full flex-1 transition-all animate-indeterminate" />
  </ProgressRoot>
</template>
