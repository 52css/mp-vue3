import { ref, definePage } from "@52css/mp-vue3";

definePage(() => {
  const count = ref(0);
  const onIncrease = () => {
    count.value++;
  };

  return {
    // 返回响应式数据
    count,
    // 返回事件
    onIncrease,
  };
});
