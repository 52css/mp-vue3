# onUnhandledRejection

* 继承[微信小程序 App.onUnhandledRejection](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onUnhandledRejection)

```ts
import { createApp, onUnhandledRejection } from '@52css/mp-vue3'

createApp({
  setup() {
    onUnhandledRejection((result: WechatMiniprogram.OnUnhandledRejectionListenerResult) => {
      console.log("🚀 ~ onUnhandledRejection ~ result:", result)
    })
  }
});
  ```