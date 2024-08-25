# onThemeChange

* 继承[微信小程序 App.onThemeChange](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onThemeChange)

```ts
import { createApp, onThemeChange } from '@52css/mp-vue3'

createApp({
  setup() {
    onThemeChange((result: WechatMiniprogram.OnThemeChangeListenerResult) => {
      console.log("🚀 ~ onThemeChange ~ result:", result)
    })
  }
});
  ```