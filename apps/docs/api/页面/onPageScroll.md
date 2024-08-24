# onPageScroll

* 继承[微信小程序 Page.onPageScroll](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object)

```ts
import { definePage, onPageScroll } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onPageScroll((object) => {
      console.log("🚀 ~ onPageScroll ~ object:", object)
    })
  }
});
```