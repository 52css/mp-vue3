# onShow

* 继承[微信小程序 App.onShow](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onShow)

```ts
import { createApp, onShow } from '@52css/mp-vue3'

createApp({
  setup() {
    onShow((option: WechatMiniprogram.App.LaunchShowOption) => {
      console.log("🚀 ~ onShow ~ option:", option)
    })
  }
});
```

## 销毁

* ✨ 返回函数，支持`onHide`销毁

```ts
import { createApp, onShow } from '@52css/mp-vue3'

createApp({
  setup() {
    onShow(() => {
      console.log('onAppShow')
      return () => {
        console.log('onAppHide')
      }
    })
  }
});
```