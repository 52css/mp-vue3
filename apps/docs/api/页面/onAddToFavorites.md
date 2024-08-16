# onAddToFavorites

* 继承[微信小程序 Page.onAddToFavorites](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onAddToFavorites-Object-object)

```ts
import { definePage, onAddToFavorites } from '@52css/mp-vue3'

definePage(() => {
  onAddToFavorites((object) => {
    console.log("🚀 ~ onAddToFavorites ~ object:", object)
  })
});
```