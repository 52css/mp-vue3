# hide

* 继承[微信小程序 Component.hide](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, hide } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    hide(() => {
      console.log("🚀 ~ hide ~ hide:", hide)
    })
  }
});
```