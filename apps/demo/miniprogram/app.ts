import { createApp, onShow, createPinia } from "@52css/mp-vue3";

const pinia = createPinia();
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 200); // 200ms后resolve
  });
};

// app.ts
createApp({
  globalData: {},
  async setup() {
    pinia.install();
    await sleep();
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
