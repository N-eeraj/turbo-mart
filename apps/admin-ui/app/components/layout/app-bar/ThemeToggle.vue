<script setup lang="ts">
const {
  isDark,
  toggleTheme,
  themeToggleIcon,
} = useTheme()
</script>

<template>
  <BaseButton
    variant="secondary"
    class="relative size-8 md:size-10 text-center content-center p-0"
    @click="toggleTheme">
    <Icon
      :name="themeToggleIcon"
      class="text-lg md:text-xl transition-all duration-300"
      :class="{ 'rotate-45': !isDark }" />
  </BaseButton>
</template>
