import { ref, reactive, defineStore } from "@52css/mp-vue3";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const text = reactive({
      a: 0,
      b: 0,
    });

    const increment = () => {
      count.value++;
      text.a++;
      console.log("text", text);
    };
    const decrement = () => {
      count.value--;
      text.b--;
      console.log("text", text);
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
      text,
      increment,
      asyncIncrement,
      decrement,
    };
  },
  {
    persist: ["count", "text"],
  }
);
