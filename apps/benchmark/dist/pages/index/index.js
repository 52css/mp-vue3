"use strict";

var _mpVue = require("@52css/mp-vue3");
var _data = require("../../data");
var _proxy = require("../../proxy");
// import { definePage, ref, onReady } from '@vue-mini/core';

(0, _mpVue.definePage)(() => {
  const listData = (0, _mpVue.ref)([]);
  const listData2 = (0, _mpVue.ref)([]);
  const show2 = (0, _mpVue.ref)(false);
  const reLaunch = () => {
    (0, _proxy.setReadyStart)();
    wx.reLaunch({
      url: '/pages/index/index'
    });
  };
  const reLaunch2 = () => {
    (0, _proxy.setReadyStart)();
    wx.reLaunch({
      url: '/pages/static/index'
    });
  };
  const toggleList = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    show2.value = !show2.value;
  };
  const add2Lot = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData2.value = listData2.value.concat((0, _data.buildData)(1000, true));
  };
  const add2Lot2 = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData2.value = listData2.value.concat((0, _data.buildData)(5000, true));
  };
  const add = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData.value = listData.value.concat((0, _data.buildData)(100));
  };
  const addLot = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData.value = listData.value.concat((0, _data.buildData)(1000));
  };
  const deleteOne = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData.value.shift();
  };
  const deleteAll = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData.value = [];
  };
  const update = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    if (listData.value[0]) {
      listData.value[0].amount++;
    }
  };
  const updateAll = () => {
    (0, _proxy.getTimeWithModal)((0, _proxy.getCurrentPageContext)());
    listData.value.forEach(item => {
      item.amount++;
    });
  };
  (0, _mpVue.onReady)(() => {
    (0, _proxy.getReadyTimeWithModal)();
  });
  return {
    listData,
    listData2,
    show2,
    reLaunch,
    reLaunch2,
    toggleList,
    add2Lot,
    add2Lot2,
    add,
    addLot,
    deleteOne,
    deleteAll,
    update,
    updateAll
  };
});