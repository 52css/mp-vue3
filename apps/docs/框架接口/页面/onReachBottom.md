# onReachBottom

* 继承[微信小程序 Page.onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReachBottom)

```ts
import { definePage, onReachBottom } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onReachBottom(() => {
      console.log("🚀 ~ onReachBottom ~ onReachBottom:", onReachBottom)
    })
  }
});
```