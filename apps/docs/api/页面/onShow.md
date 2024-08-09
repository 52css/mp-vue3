# onShow

* 继承[微信小程序 Page.onShow](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShow)

```ts
import { definePage, onShow } from '@52css/mp-vue3'

definePage(() => {
  onShow(() => {
    console.log("🚀 ~ onShow ~ onShow:", onShow)
  })

  return {
  }
});
```