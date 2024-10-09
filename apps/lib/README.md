# MP-VUE3

* 组合api好处就是方便集中处理逻辑，而微信小程序还是`options`方式，有什么方式可以直接使用`vue3`响应数据吗？首选是使用`uni-app` 直接选择 `vue3` 模版，使用过的都知道有2大通病
  * 性能问题
  * 体积问题
* 如何解决这个问题，我们可以在`ts`中拦截处理，通过响应式数据拦截处理，而`wxml` 和 `wxss` 保持一致
  * 体积很小
  * 通过`组合api` 集中处理逻辑
  * 原生转换最方便

## 开始

* 请访问 [在线文档](https://52css.github.io/mp-vue3/) 并跟随文档指引。

## 功能列表

* [x] 支持 [响应式](https://52css.github.io/mp-vue3/reactivity/%E5%B7%A5%E5%85%B7.html) 、[App](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/createApp%20-%20%F0%9F%94%A5%20%E2%9C%A8.html)、[Page](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/definePage%20-%20%F0%9F%94%A5%20%E2%9C%A8.html)、[Component](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/defineComponent%20-%20%F0%9F%94%A5%20%E2%9C%A8.html)
* [x] 支持 [状态机](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%8A%B6%E6%80%81%E6%9C%BA%20Pinia/createPinia.html)、[持久化存储](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%8A%B6%E6%80%81%E6%9C%BA%20Pinia/defineStore%20-%20%F0%9F%94%A5%20%E2%9C%A8.html#%E5%A6%82%E4%BD%95%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8)
* [x] 支持 `生命周期`
  * [x] App [onError](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onError.html)、[onHide](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onHide.html)、[onLaunch](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onLaunch.html)、[onPageNotFound](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onPageNotFound.html)、[onShow](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onShow%20-%20%E2%9C%A8.html)、[onThemeChange](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onThemeChange.html)、[onUnhandledRejection](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20App/onUnhandledRejection.html)
  * [x] Page [onAddToFavorites](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onAddToFavorites.html)、[onHide](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onHide.html)、[onLoad](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onLoad%20-%20%E2%9C%A8.html)、[onPageScroll](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onPageScroll.html)、[onPullDownRefresh](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onPullDownRefresh.html)、[onReachBottom](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onReachBottom.html)、[onReady](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onReady.html)、[onResize](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onResize.html)、[onRouteDone](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onRouteDone.html)、[onSaveExitState](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onSaveExitState.html)、[onShareAppMessage](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onShareAppMessage.html)、[onShareTimeline](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onShareTimeline.html)、[onShow](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onShow%20-%20%E2%9C%A8.html)、[onTabItemTap](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onTabItemTap.html)、[onUnload](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E9%A1%B5%E9%9D%A2%20Page/onUnload.html)
  * [x] Component [attached](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/attached%20-%20%E2%9C%A8.html)、[detached](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/detached.html)、[error](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/error.html)、[hide](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/hide.html)、[moved](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/moved.html)、[ready](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/ready.html)、[resize](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/resize.html)、[routeDone](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/routeDone.html)、[show](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E7%BB%84%E4%BB%B6%20Component/show.html)
* [x] 支持 `Router` 路由
  * [x] [useRouter](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E8%B7%AF%E7%94%B1%20Router/useRouter.html)
  * [x] [useRoute](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E8%B7%AF%E7%94%B1%20Router/useRoute.html)
* [x] 支持 `Request` 请求
  * [x] 支持[request](https://52css.github.io/mp-vue3/%E6%A1%86%E6%9E%B6%E6%8E%A5%E5%8F%A3/%E8%AF%B7%E6%B1%82%20Request/request.html)

## 性能

第一项测试我们使用 `新增可用券（100）` 操作将可用券数量由 0 逐级递增到 1000：

|        | 100  | 200  | 300  | 400  | 500  | 600  | 700  | 800   | 900   | 1000  |
| ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- | ----- | ----- |
| Native | 82.7 | 68.3 | 72   | 78.7 | 84.7 | 93.3 | 93.7 | 101.3 | 109.3 | 113.3 |
| MpVue3 | 86   | 88   | 91   | 94   | 98   | 100  | 102  | 107   | 120   | 130   |

然后我们按顺序逐项点击 `删除可用券（all）` -> `新增可用券（1000）` -> `更新可用券（1）` -> `更新可用券（all）` -> `删除可用券（1）`：

|        | Delete (All) | Add (1000) | Update (1) | Update (All) | Delete (1) |
| ------ | ------------ | ---------- | ---------- | ------------ | ---------- |
| Native | 55.7         | 430        | 82.7       | 86           | 80         |
| MpVue3 | 89           | 655        | 131        | 128          | 108        |



## 案例

* 完成一套完成电商小程序

## 许可证

[MIT](https://opensource.org/license/MIT)

Copyright (c) 2024-present Coze

