# detached

* 继承[微信小程序 Component.detached](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, detached } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    detached(() => {
      console.log("🚀 ~ detached ~ detached:", detached)
    })
  }
});
```