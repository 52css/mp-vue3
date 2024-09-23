import { createApp, onShow, createPinia, request } from "@52css/mp-vue3";

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
