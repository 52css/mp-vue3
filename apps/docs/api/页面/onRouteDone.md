# onRouteDone

* 继承[微信小程序 Page.onRouteDone](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onRouteDone)

```ts
import { definePage, onRouteDone } from '@52css/mp-vue3'

definePage(() => {
  onRouteDone(() => {
    console.log("🚀 ~ onRouteDone ~ onRouteDone:", onRouteDone)
  })

  return {
  }
});
```