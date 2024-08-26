import { ref, computed, watch, definePage, onLoad } from "@52css/mp-vue3";
import { useCounterStore } from "../../store/counter";
import { storeToRefs } from "../../pinia/store";

definePage({
  setup() {
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);

    return {
      count,
      increment() {
        counterStore.increment();
      },
      decrement() {
        counterStore.decrement();
      },
    };
  },
});
