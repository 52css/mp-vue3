import { defineConfig } from "vitepress";

import { getSidebar } from "vitepress-plugin-auto-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🅥 MP Vue3",
  description: "基于 Vue 3 的小程序框架：轻松构建高效应用",
  base: "/mp-vue3/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: "首页", link: "/" },
      { text: "指南", link: "/guide/快速上手.md", activeMatch: "^/guide/" },
      // { text: "API", link: "/api/", activeMatch: "^/api/" },
      { text: "更新日志", link: "https://github.com/52css/mp-vue3" },
    ],

    sidebar: getSidebar({
      contentRoot: "/",
      contentDirs: ["guide", "框架接口", "reactivity"],
      collapsible: true,
      collapsed: false,
    }),

    socialLinks: [{ icon: "github", link: "https://github.com/52css/mp-vue3" }],

    search: {
      provider: "local",
      // provider: 'algolia',
      // options: {
      //   appId: 'X51HWTCQJJ',
      //   apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
      //   indexName: 'el-pro'
      // }
    },
  },
  markdown: {
    theme: "github-dark",
    lineNumbers: true,
  },
});
