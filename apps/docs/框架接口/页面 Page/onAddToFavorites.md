# onAddToFavorites

* 继承[微信小程序 Page.onAddToFavorites](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onAddToFavorites-Object-object)

```ts
import { definePage, onAddToFavorites } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    onAddToFavorites((object: WechatMiniprogram.Page.IAddToFavoritesOption) => {
      console.log("🚀 ~ onAddToFavorites ~ object:", object)
      // webview 页面返回 webViewUrl
      console.log('webViewUrl: ', object.webViewUrl)
      return {
        title: '自定义标题',
        imageUrl: 'http://demo.png',
        query: 'name=xxx&age=xxx',
      }
    })
  }
});
```