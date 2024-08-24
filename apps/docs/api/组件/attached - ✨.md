# attached

* 继承[微信小程序 Component.attached](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { defineComponent, attached } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    attached(() => {
      console.log("🚀 ~ attached ~ attached:", attached)
    })
  }
});
```

## 销毁

* ✨ 返回函数，支持`detached`销毁

```ts
import { defineComponent, attached } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    attached(() => {
      let count = 0;
      let timer = setInterval(() => {
        console.log(count++)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    })
  }
});
```