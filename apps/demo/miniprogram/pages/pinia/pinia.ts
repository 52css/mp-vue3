import {
  definePage,
  storeToRefs,
  isRef,
  isReactive,
  toRef,
} from "@52css/mp-vue3";
import { useCounterStore } from "../../store/counter";

// export function storeToRefs2(store) {
//   const refs = {};

//   debugger;

//   for (const key in store) {
//     const value = store[key];

//     // 如果属性是 ref 或 reactive，转换为 ref
//     if (isRef(value) || isReactive(value)) {
//       refs[key] = toRef(store, key);
//     }
//   }

//   return refs;
// }

definePage({
  setup() {
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);

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
    };
  },
});
