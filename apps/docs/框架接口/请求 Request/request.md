# request

  * 支持`request(options)` 原生兼容，支持 `request(options)` 返回`promise`
  * 支持`request.get(url, params, options)`
  * 支持`request.post(url, data, options)`
  * 支持`request.options(url, params, options)`
  * 支持`request.head(url, params, options)`
  * 支持`request.put(url, data, options)`
  * 支持`request.delete(url, data, options)`
  * 支持`request.trace(url, params, options)`
  * 支持`request.connect(url, data, options)`

## App 全局配置

```ts
import { createApp, request } from '@52css/mp-vue3'


createApp({
  setup(option: WechatMiniprogram.App.LaunchShowOption) {
    // 设置基础 URL
    request.setBaseUrl("https://api.example.com");

    // 设置请求拦截器
    request.setRequestInterceptor(async (options) => {
      // 例如，添加认证 token
      const token = wx.getStorageSync("token");
      options.header = {
        ...options.header,
        Authorization: `Bearer ${token}`,
      };
      return options;
    });

    // 设置响应拦截器
    request.setResponseInterceptor(async (response) => {
      // 例如，处理特定的状态码
      if (response.statusCode === 401) {
        // 处理未授权，如跳转登录页面
        wx.navigateTo({ url: "/pages/login/login" });
      }
      return response;
    });

    // 返回给 this[key] = value 绑定
    return {}
  }
})
```

## Page 使用

```ts
import { definePage, request } from '@52css/mp-vue3'


definePage({
  queries: {
  },
  setup(query) {
    request.get('user/info').then(res => {
      console.log("🚀 ~ request.get ~ res:", res)
    })

    return {
    }
  }
})
```