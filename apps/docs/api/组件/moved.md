# moved

* 继承[微信小程序 Component.moved](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { definePage, moved } from '@52css/mp-vue3'

definePage(() => {
  moved(() => {
    console.log("🚀 ~ moved ~ moved:", moved)
  })

  return {
  }
});
```