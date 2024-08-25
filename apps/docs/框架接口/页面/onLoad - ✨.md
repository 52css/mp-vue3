# onLoad

* 继承[微信小程序 Page.onLoad](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query)

```ts
import { definePage, onLoad } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onLoad((query： Record<string, string | undefined>) => {
      console.log("🚀 ~ onLoad ~ query:", query)
    })
  }
});
```

## 销毁

* ✨ 返回函数，支持`onUnload`销毁

```ts
import { definePage, onLoad } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onLoad(() => {
      console.log('pageOnLoad')
      return () => {
        console.log('pageOnUnload')
      }
    })
  }
});
```