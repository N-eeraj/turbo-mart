export default function useTheme() {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === "dark")
  const toggleTheme = () => {
    colorMode.preference = isDark.value ? "light" : "dark"
  }

  const themeToggleIcon = computed(() => isDark.value ? "material-symbols:dark-mode-outline-rounded" : "lucide:sun")

  const appLogo = computed(() => {
    if (isDark.value) {
      return "/images/admin-logo-white.svg"
    }
    return "/images/admin-logo-black.svg"
  })

  return {
    isDark,
    toggleTheme,
    themeToggleIcon,
    appLogo,
  }
}
