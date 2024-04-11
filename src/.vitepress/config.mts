import { defineConfig } from 'vitepress'

import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ninjas Guide",
  base: "/ApigeeGuides/",
  description: "The complete guide to all API Ninjas",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: sidebar
  }
})
