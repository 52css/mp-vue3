# ready

* 继承[微信小程序 Component.ready](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, ready } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    ready(() => {
      console.log("🚀 ~ ready ~ ready:", ready)
    })
  }
});
```