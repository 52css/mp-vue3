import { ref, defineStore } from "@52css/mp-vue3";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    const asyncIncrement = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          count.value++;
          resolve();
        }, 1000);
      });
    };

    return {
      count,
      increment,
      asyncIncrement,
      decrement,
    };
  },
  {
    persist: ["count"],
  }
);
