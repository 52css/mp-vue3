# onSaveExitState

* 继承[微信小程序 Page.onSaveExitState](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onSaveExitState)

```ts
import { definePage, onSaveExitState } from '@52css/mp-vue3'

definePage(() => {
  onSaveExitState(() => {
    console.log("🚀 ~ onSaveExitState ~ onSaveExitState:", onSaveExitState)
  })

  return {
  }
});
```