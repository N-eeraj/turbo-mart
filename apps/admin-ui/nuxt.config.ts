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
  extends: [
    "./layers/analytics",
    "./layers/catalogue-management",
    "./layers/delivery-person-management",
    "./layers/finance-management",
    "./layers/retailer-management",
    "./layers/super-admin",
  ],
  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@nuxt/icon",
    "pinia-plugin-persistedstate",
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
