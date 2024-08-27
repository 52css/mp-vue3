# storeToRefs

## 页面如何使用

::: code-group

```ts [pinia.ts]
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

```

```html [pinia.wxml]
<button bind:tap="decrement">-</button>
<button>{{ count }}</button>
<button bind:tap="increment">+</button>
<button bind:tap="asyncIncrement">++</button>
```

:::

## 组件如何使用

::: code-group

```ts [pinia.ts]
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

```

```html [pinia.wxml]
<button bind:tap="decrement">-</button>
<button>{{ count }}</button>
<button bind:tap="increment">+</button>
<button bind:tap="asyncIncrement">++</button>
```

:::