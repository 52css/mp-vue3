# userRouter

* 继承[微信小程序 wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) => `router.switchTab`
* 继承[微信小程序 wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html) => `router.reLaunch`
* 继承[微信小程序 wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html) => `router.replace`
* 继承[微信小程序 wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) => `router.push`
* 继承[微信小程序 wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) => `router.back`
* 扩充 `router.go(-1)`, 只支持往后返回


```ts
import { definePage, ref, useRouter } from '@52css/mp-vue3'


definePage({
  queries: {
  },
  setup(query) {
    const router = useRouter();
    // 跳转方式1，支持path和query
    const goPiniaTap = () => {
      router.push({
        path: '/pages/pinia/pinia',
        query: {
          a: 1,
          b: 2
        }
      })
    }
    // 跳转方式2，原生url
    const goPiniaTap2 = () => {
      router.push({
        url: '/pages/pinia/pinia?a=1&b=2',
      })
    }

    // 跳转方式3，支持string
    const goPiniaTap3 = () => {
      router.push('/pages/pinia/pinia?a=1&b=2')
    }

    return {
      goPiniaTap,
    }
  }
})
  ```