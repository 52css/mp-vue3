# onPullDownRefresh

* 继承[微信小程序 Page.onPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPullDownRefresh)

```ts
import { definePage, onPullDownRefresh } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onPullDownRefresh(() => {
      console.log("🚀 ~ onPullDownRefresh ~ onPullDownRefresh:", onPullDownRefresh)
    })
  }
});
```