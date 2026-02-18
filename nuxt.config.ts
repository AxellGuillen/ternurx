import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    "@/assets/css/fonts.css",
    "@/assets/css/tokens.css",
    "@/assets/css/main.css",
  ],

  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  },

  image: {
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID || "",
      dataset: "production",
    },
  },

  modules: ["@nuxtjs/sanity", "@nuxt/image"],
});
