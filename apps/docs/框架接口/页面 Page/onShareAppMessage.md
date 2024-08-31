# onShareAppMessage

* 继承[微信小程序 Page.onShareAppMessage](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object)

```ts
import { definePage, onShareAppMessage } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onShareAppMessage((object: WechatMiniprogram.Page.IShareAppMessageOption) => {
      console.log("🚀 ~ onShareAppMessage ~ object:", object)
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '自定义转发标题'
          })
        }, 2000)
      })
      return {
        title: '自定义转发标题',
        path: '/page/user?id=123',
        promise
      }
    })
  }
});
```