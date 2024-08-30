# show

* 继承[微信小程序 Component.show](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, show } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    show(() => {
      console.log("🚀 ~ show ~ show:", show)
    })
  }
});
```

## 销毁

* ✨ 返回函数，支持`hide`销毁

```ts
import { defineComponent, show } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    show(() => {
      console.log('onPageShow')
      return () => {
        console.log('pageOnHide')
      }
    })
  }
});
```