# onPageNotFound

* 继承[微信小程序 App.onPageNotFound](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onPageNotFound)

```ts
import { createApp, onPageNotFound } from '@52css/mp-vue3'

createApp({
  setup() {
    onPageNotFound(() => {
      console.log("🚀 ~ onPageNotFound ~ onPageNotFound:", onPageNotFound)
    })
  }
});
  ```