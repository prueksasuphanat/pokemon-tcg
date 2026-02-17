import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
    "@/assets/css/main.css",
  ],

  modules: ["nuxt-primevue", "@pinia/nuxt"],
  primevue: {},

  // Enable static site generation for GitHub Pages
  ssr: false,

  app: {
    // Base URL for GitHub Pages deployment
    // When deploying to GitHub Pages under a repository path (e.g., https://username.github.io/repo-name/),
    // set NUXT_APP_BASE_URL environment variable to '/repo-name/'
    // For local development or root domain deployment, it defaults to '/'
baseURL: '/poekemon-tcg/',    
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: "2025-02-10",
});
