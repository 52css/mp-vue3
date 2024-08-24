# onShareTimeline

* 继承[微信小程序 Page.onShareTimeline](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareTimeline)

```ts
import { definePage, onShareTimeline } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onShareTimeline(() => {
      console.log("🚀 ~ onShareTimeline ~ onShareTimeline:", onShareTimeline)
    })
  }
});
```