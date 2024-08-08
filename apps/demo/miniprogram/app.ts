import { createApp, onLaunch, onShow } from "@52css/mp-vue3";

createApp(() => {
  const pages = getCurrentPages();
  console.log("🚀 ~ createApp ~ pages:", pages);
  console.log("🚀 ~ onLaunch ~ onLaunch:", onLaunch);
  onLaunch(() => {
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
  });
  onShow(() => {
    console.log("🚀 ~ onShow ~ onShow:", onShow);
    console.log("onAppShow");
  });

  return {};
});
