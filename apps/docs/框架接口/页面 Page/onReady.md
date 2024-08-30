# onReady

* 继承[微信小程序 Page.onReady](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReady)

```ts
import { definePage, onReady } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onReady(() => {
      console.log("🚀 ~ onReady ~ onReady:", onReady)
    })
  }
});
```