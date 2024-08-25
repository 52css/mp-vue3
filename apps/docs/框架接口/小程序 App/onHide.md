# onHide

* 继承[微信小程序 App.onHide](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onHide)

```ts
import { createApp, onHide } from '@52css/mp-vue3'

createApp({
  setup() {
    onHide(() => {
      console.log("🚀 ~ onHide ~ onHide:", onHide)
    })
  }
});
  ```