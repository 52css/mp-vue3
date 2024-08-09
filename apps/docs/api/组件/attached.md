# attached

* 继承[微信小程序 Component.attached](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

```ts
import { definePage, attached } from '@52css/mp-vue3'

definePage(() => {
  attached(() => {
    console.log("🚀 ~ attached ~ attached:", attached)
  })

  return {
  }
});
```