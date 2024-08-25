# onError

* 继承[微信小程序 App.onError](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onError)

```ts
import { createApp, onError } from '@52css/mp-vue3'

createApp({
  setup() {
    onError((error: string) => {
      console.log("🚀 ~ onError ~ error:", error)
    })
  }
});
  ```