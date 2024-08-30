# resize

* 继承[微信小程序 Component.resize](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, resize } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    resize((size: WechatMiniprogram.Page.IResizeOption) => {
      console.log("🚀 ~ resize ~ size:", size)
    })
  }
});
```