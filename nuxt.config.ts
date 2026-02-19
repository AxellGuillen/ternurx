import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // ============================================
  // APP CONFIG — Meta Tags, SEO, Open Graph
  // ============================================
  app: {
    head: {
      htmlAttrs: {
        lang: "es",
      },
      title: "Ternurx",
      titleTemplate: "%s — Ternurx",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "Ternurx — Upcycled garments. Limited editions. Made in México City.",
        },
        { name: "theme-color", content: "#FFFFFF" },

        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Ternurx" },
        { property: "og:title", content: "Ternurx" },
        {
          property: "og:description",
          content: "Upcycled garments. Limited editions. Made in México City.",
        },
        { property: "og:locale", content: "es_MX" },
        // og:image → set dynamically per product or add a default:
        // { property: "og:image", content: "https://ternurx.com/og-default.jpg" },
        // { property: "og:image:width", content: "1200" },
        // { property: "og:image:height", content: "630" },

        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Ternurx" },
        {
          name: "twitter:description",
          content: "Upcycled garments. Limited editions. Made in México City.",
        },

        // Robots
        { name: "robots", content: "index, follow" },
      ],
      link: [
        // Favicon — replace with actual paths
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        // Preload critical fonts (hero weight first)
        {
          rel: "preload",
          href: "/fonts/PPAir-BlackMono.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/PPAir-MediumMono.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/PPPlayground-Light.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
      ],

      // === STRUCTURED DATA (JSON-LD) ===
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Ternurx",
            description:
              "Upcycled garments. Limited editions. Made in México City.",
            // url: "https://ternurx.com",
            // logo: "https://ternurx.com/logo.svg",
            priceRange: "$$",
            currenciesAccepted: "MXN",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ciudad de México",
              addressCountry: "MX",
            },
            makesOffer: {
              "@type": "Offer",
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/LimitedAvailability",
            },
          }),
        },
      ],
    },
  },

  // ============================================
  // CSS
  // ============================================
  css: [
    "~/assets/css/fonts.css",
    "~/assets/css/tokens.css",
    "~/assets/css/main.css",
  ],

  // ============================================
  // VITE
  // ============================================
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true,
    },
  },

  // ============================================
  // MODULES
  // ============================================
  modules: ["@nuxtjs/sanity", "@nuxt/image", "@nuxtjs/color-mode"],

  // ============================================
  // SANITY
  // ============================================
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET || "production",
    apiVersion: "2025-01-01",
    useCdn: true,
  },

  // ============================================
  // NUXT IMAGE — Sanity provider
  // ============================================
  image: {
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID || "",
      dataset: "production",
    },
  },

  // ============================================
  // NUXT COLOR MODE
  //
  // Applies class to <html>:
  //   html.default-mode  →  tokens.css :root
  //   html.rosa-mode     →  tokens.css html.rosa-mode
  // ============================================
  colorMode: {
    classSuffix: "-mode",
    preference: "default", // initial mode
    fallback: "default", // fallback if no preference
    storageKey: "ternurx-mode", // localStorage key
  },

  // ============================================
  // NITRO — Server optimization
  // ============================================
  nitro: {
    // Prerender the single page for instant first load
    prerender: {
      routes: ["/"],
      crawlLinks: false,
    },

    // Compression
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },

    // Static asset caching
    routeRules: {
      // Fonts — immutable, long cache
      "/fonts/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
      // Images from Sanity CDN proxied through Nuxt Image
      "/_ipx/**": {
        headers: {
          "Cache-Control": "public, max-age=86400, s-maxage=604800",
        },
      },
      // Main page — ISR: regenerate every 60s
      "/": {
        isr: 60,
      },
    },
  },

  // ============================================
  // TYPESCRIPT
  // ============================================
  typescript: {
    strict: true,
    typeCheck: false, // enable in CI, disable for dev speed
  },

  // ============================================
  // EXPERIMENTAL
  // ============================================
  experimental: {
    payloadExtraction: true,
  },
});
