import tailwindcss from "@tailwindcss/vite"

import env from "@app/load-env"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: `${env.ADMIN_API_URL}/api`,
    },
  },
  imports: {
    dirs: [
      "~/composables/**",
    ],
  },
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
    "@nuxt/icon",
  ],
  css: [
    "~/assets/css/tailwind.css",
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
