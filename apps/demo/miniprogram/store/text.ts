import { defineStore, ref } from "@52css/mp-vue3";

export const useTextStore = defineStore(
  "text",
  () => {
    const text = ref("Hello Pinia");

    return { text };
  },
  {
    persist: ["text"],
  }
);
