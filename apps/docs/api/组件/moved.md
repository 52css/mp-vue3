# moved

* 继承[微信小程序 Component.moved](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, moved } from '@52css/mp-vue3'

defineComponent({
  props: {},
  setup() {
    moved(() => {
      console.log("🚀 ~ moved ~ moved:", moved)
    })
  }
});
```