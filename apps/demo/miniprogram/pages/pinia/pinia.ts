import { definePage, storeToRefs, useRoute, useRouter } from "@52css/mp-vue3";
import { useCounterStore } from "../../store/counter";

definePage({
  queries: {
    a: Number,
    b: Number,
  },
  setup() {
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);
    const route = useRoute();
    const router = useRouter();

    console.log("🚀 ~ setup ~ route:", route);

    const goBackTap = () => {
      router.go(-1);
    };

    return {
      count,
      text: counterStore.text,
      increment() {
        counterStore.increment();
      },
      decrement() {
        counterStore.decrement();
      },
      asyncIncrement() {
        counterStore.asyncIncrement();
      },
      goBackTap,
    };
  },
});
