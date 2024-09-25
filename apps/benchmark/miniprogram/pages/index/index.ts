import { definePage, ref, onReady } from "@52css/mp-vue3";
import { buildData } from "../../data.js";
import {
  getTimeWithModal,
  getCurrentPageContext,
  setReadyStart,
  getReadyTimeWithModal,
} from "../../proxy.js";

definePage(() => {
  const listData = ref([]);
  const listData2 = ref([]);
  const show2 = ref(false);

  const reLaunch = () => {
    setReadyStart();
    wx.reLaunch({
      url: "/pages/index/index",
    });
  };

  const reLaunch2 = () => {
    setReadyStart();
    wx.reLaunch({
      url: "/pages/static/index",
    });
  };

  const toggleList = () => {
    getTimeWithModal(getCurrentPageContext());
    show2.value = !show2.value;
  };

  const add2Lot = () => {
    getTimeWithModal(getCurrentPageContext());
    listData2.value = listData2.value.concat(buildData(1000, true));
  };

  const add2Lot2 = () => {
    getTimeWithModal(getCurrentPageContext());
    listData2.value = listData2.value.concat(buildData(5000, true));
  };

  const add = () => {
    getTimeWithModal(getCurrentPageContext());
    listData.value = listData.value.concat(buildData(100));
  };

  const addLot = () => {
    getTimeWithModal(getCurrentPageContext());
    listData.value = listData.value.concat(buildData(1000));
  };

  const deleteOne = () => {
    getTimeWithModal(getCurrentPageContext());
    listData.value.shift();
  };

  const deleteAll = () => {
    getTimeWithModal(getCurrentPageContext());
    listData.value = [];
  };

  const update = () => {
    getTimeWithModal(getCurrentPageContext());
    if (listData.value[0]) {
      listData.value[0].amount++;
    }
  };

  const updateAll = () => {
    getTimeWithModal(getCurrentPageContext());
    listData.value.forEach((item) => {
      item.amount++;
    });
  };

  onReady(() => {
    getReadyTimeWithModal();
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
    updateAll,
  };
});
