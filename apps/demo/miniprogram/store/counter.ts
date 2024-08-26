import { ref } from "@52css/mp-vue3";
import { defineStore } from "../pinia/store";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }

  return {
    count,
    increment,
    decrement,
  };
});
