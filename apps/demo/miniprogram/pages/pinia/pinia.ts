import { definePage, storeToRefs } from "@52css/mp-vue3";
import { useCounterStore } from "../../store/counter";

definePage({
  setup() {
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);
    console.log("🚀 ~ definePage ~ setup ~ count:", count);

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
