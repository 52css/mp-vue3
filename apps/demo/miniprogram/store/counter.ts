import { ref, defineStore } from "@52css/mp-vue3";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }

  function asyncIncrement() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        count.value++;
        resolve();
      }, 1000);
    });
  }

  console.log("初始化管理");

  return {
    count,
    increment,
    asyncIncrement,
    decrement,
  };
});
