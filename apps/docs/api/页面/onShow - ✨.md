# onShow

* 继承[微信小程序 Page.onShow](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShow)

```ts
import { definePage, onShow } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onShow(() => {
      console.log("🚀 ~ onShow ~ onShow:", onShow)
    })
  }
});
```

## 销毁

* ✨ 返回函数，支持`onHide`销毁

```ts
import { definePage, onShow } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onShow(() => {
      let count = 0;
      let timer = setInterval(() => {
        console.log(count++)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    })
  }
});
```