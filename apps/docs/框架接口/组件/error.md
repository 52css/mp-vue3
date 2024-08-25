# ready

* 继承[微信小程序 Component.ready](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, error } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    error(() => {
      console.log("🚀 ~ error ~ error:", error)
    })
  }
});
```