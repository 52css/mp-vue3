# detached

* 继承[微信小程序 Component.detached](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { definePage, detached } from '@52css/mp-vue3'

definePage(() => {
  detached(() => {
    console.log("🚀 ~ detached ~ detached:", detached)
  })

  return {
  }
});
```