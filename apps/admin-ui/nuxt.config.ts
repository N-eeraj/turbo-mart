import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: {
    enabled: true,
  },
  routeRules: {
    "*": {
      prerender: false,
    },
    "/": {
      prerender: true,
    },
  },
  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
  ],
  css: [
    "~/assets/css/tailwind.css",
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: "Shadcn",
  },
})
