# createApp

* 继承[微信小程序 App](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)
* 扩充支持 `Function`
* 👍 对象默认下扩充 `setup` 方法

## 扩充支持 `Function`

```ts
import { createApp, ref } from '@52css/mp-vue3'

createApp((option: WechatMiniprogram.App.LaunchShowOption) => {
  console.log("🚀 ~ createApp ~ option:", option)

  // 返回给 this[key] = value 绑定
  return {}
});
```

## 👍 对象默认下扩充 `setup` 方法


```ts
import { createApp, ref } from '@52css/mp-vue3'


createApp({
  setup(option: WechatMiniprogram.App.LaunchShowOption) {
    console.log("🚀 ~ setup ~ option:", option)

    // 返回给 this[key] = value 绑定
    return {}
  }
})
```

## Setup 参数

### LaunchShowOption 属性

* 读取 `onLaunch` 对应 `LaunchShowOption`
