# attached

* 继承[微信小程序 Component.attached](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, attached } from '@52css/mp-vue3'

defineComponent({
  props: {},
  setup() {
    attached(() => {
      console.log("🚀 ~ attached ~ attached:", attached)
    })
  }
});
```