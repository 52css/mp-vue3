"use strict";

var _mpVue = require("@52css/mp-vue3");
var _proxy = require("../../proxy");
(0, _mpVue.definePage)(() => {
  const reLaunch = () => {
    (0, _proxy.setReadyStart)();
    wx.reLaunch({
      url: '/pages/static/index'
    });
  };
  const reLaunch2 = () => {
    (0, _proxy.setReadyStart)();
    wx.reLaunch({
      url: '/pages/index/index'
    });
  };
  (0, _mpVue.onReady)(() => {
    (0, _proxy.getReadyTimeWithModal)();
  });
  return {
    reLaunch,
    reLaunch2
  };
});