# routeDone

* 继承[微信小程序 Component.routeDone](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, routeDone } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    routeDone(() => {
      console.log("🚀 ~ routeDone ~ routeDone:", routeDone)
    })
  }
});
```