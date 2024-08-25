# onShareAppMessage

* 继承[微信小程序 Page.onShareAppMessage](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object)

```ts
import { definePage, onShareAppMessage } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onShareAppMessage((object) => {
      console.log("🚀 ~ onShareAppMessage ~ object:", object)
    })
  }
});
```