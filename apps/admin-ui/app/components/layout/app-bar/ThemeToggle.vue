<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === "dark")

const icon = computed(() => isDark.value ? "material-symbols:dark-mode-outline-rounded" : "lucide:sun")

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark"
}
</script>

<template>
  <BaseButton
    variant="secondary"
    class="relative size-8 md:size-10 text-center content-center p-0"
    @click="toggleTheme">
    <Icon
      :name="icon"
      class="text-lg md:text-xl transition-all duration-300"
      :class="{ 'rotate-45': !isDark }" />
  </BaseButton>
</template>
