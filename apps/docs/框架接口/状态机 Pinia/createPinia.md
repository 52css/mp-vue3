# createPinia

支持`app.ts`

* 只是实现最简版状态机

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