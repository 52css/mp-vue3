# createPinia

支持`app.ts`

* 只是实现`最简版`状态机，只支持`setup`, 不支持`options`、`插件`、`$patch`、`$subscribe`、`$patch`

```ts
import { createApp, createPinia } from "@52css/mp-vue3";

const pinia = createPinia();

// app.ts
createApp({
  globalData: {},
  setup() {
    // 由于这里没有自动install环境，需要onLaunch手动install
    pinia.install();

    return {};
  },
});

```