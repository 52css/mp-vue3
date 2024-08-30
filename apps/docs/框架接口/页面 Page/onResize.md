# onResize

* 继承[微信小程序 Page.onResize](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onResize-Object-object)

```ts
import { definePage, onResize } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onResize((object: WechatMiniprogram.Page.IResizeOption) => {
      console.log("🚀 ~ onResize ~ object:", object)
    })
  }
});
```