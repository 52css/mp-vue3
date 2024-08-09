# onHide

* 继承[微信小程序 Page.onHide](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onHide)

```ts
import { definePage, onHide } from '@52css/mp-vue3'

definePage(() => {
  onHide(() => {
    console.log("🚀 ~ onHide ~ onHide:", onHide)
  })

  return {
  }
});
```