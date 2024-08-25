import { createApp, onShow } from "@52css/mp-vue3";
// app.ts
createApp({
  globalData: {},
  setup() {
    console.log("111");
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });

    onShow(() => {
      console.log("onAppShow");
      return () => {
        console.log("onAppHide");
      };
    });

    return {};
  },
});
