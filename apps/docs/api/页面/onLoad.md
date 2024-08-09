# onLoad

* 继承[微信小程序 Page.onLoad](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query)

```ts
import { definePage, onLoad } from '@52css/mp-vue3'

definePage(() => {
  onLoad((query) => {
    console.log("🚀 ~ onLoad ~ query:", query)
  })

  return {
  }
});
```