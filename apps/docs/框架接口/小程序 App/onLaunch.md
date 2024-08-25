# onLaunch

* 继承[微信小程序 App.onLaunch](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch)

```ts
import { createApp, onLaunch } from '@52css/mp-vue3'

createApp({
  setup() {
    onLaunch((option: WechatMiniprogram.App.LaunchShowOption) => {
      console.log("🚀 ~ onLaunch ~ option:", option)
    })
  }
});
  ```