# defineStore

* 定义`store/counter.ts`实例

```ts
import { ref, defineStore } from "@52css/mp-vue3";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }

  function asyncIncrement() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        count.value++;
        resolve();
      }, 1000);
    });
  }

  return {
    count,
    increment,
    asyncIncrement,
    decrement,
  };
});
```

## 如何本地存储

* 增加`options: {persist: string[]}`第三个参数配置

```ts
import { ref, defineStore } from "@52css/mp-vue3";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }

  function asyncIncrement() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        count.value++;
        resolve();
      }, 1000);
    });
  }

  return {
    count,
    increment,
    asyncIncrement,
    decrement,
  };
}, {
  persist: ['count']
});
```