# onUnload

* 继承[微信小程序 Page.onUnload](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onUnload)

```ts
import { definePage, onUnload } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onUnload(() => {
      console.log("🚀 ~ onUnload ~ onUnload:", onUnload)
    })
  }
});
```