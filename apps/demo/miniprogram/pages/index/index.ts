import { ref, definePage, onShow } from "@52css/mp-vue3";

var app = getApp();

definePage({
  onShow() {
    console.log("onNativePageShow");
  },
  setup: () => {
    const count = ref(0);
    const onIncrease = () => {
      count.value++;
    };

    onShow(() => {
      console.log("onPageShow");
    });

    return {
      // 返回响应式数据
      count,
      // 返回事件
      onIncrease,
    };
  },
});
