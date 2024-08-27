import { defineComponent, storeToRefs } from "@52css/mp-vue3";
import { useCounterStore } from "../../../../store/counter";

defineComponent({
  properties: {
    xClass: String,
  },
  setup() {
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);
    console.log("🚀 ~ defineComponent ~ setup ~ count:", count);

    return {
      count,
      increment() {
        counterStore.increment();
      },
      decrement() {
        counterStore.decrement();
      },
      asyncIncrement() {
        counterStore.asyncIncrement();
      },
    };
  },
});
