# onTabItemTap

* 继承[微信小程序 Page.onTabItemTap](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onTabItemTap-Object-object)

```ts
import { definePage, onTabItemTap } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onTabItemTap((object: WechatMiniprogram.Page.ITabItemTapOption) => {
      console.log("🚀 ~ onTabItemTap ~ object:", object)
    })
  }
});
```