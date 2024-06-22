import { defineConfig } from 'vitepress'

import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ninjas Guide",
  base: "/ApigeeGuides/",
  description: "The complete guide to all API Ninjas",
  ignoreDeadLinks: false,
  themeConfig: {
    nav:[
      { text: 'Home', link: '/' },
    ],

    sidebar: sidebar
  }
})
