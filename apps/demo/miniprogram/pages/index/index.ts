import { ref, definePage, onShow } from "@52css/mp-vue3";

var app = getApp();

const useTest = () => {
  const test = ref(0);

  setTimeout(() => {
    test.value = 3;
  }, 1000);

  return test;
};

definePage(() => {
  const count = ref(0);
  const onIncrease = () => {
    count.value++;
  };
  const test = useTest();

  onShow(() => {
    console.log("onPageShow");
  });

  return {
    // 返回响应式数据
    count,
    // 返回事件
    onIncrease,
    test,
  };
});
