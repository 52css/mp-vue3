# usePage

* 获取当前页, 相当于 `getCurrentPages().at(-1)`

## 获取当前页

```ts
import { definePage, usePage } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    const instance = usePage();
    console.log("🚀 ~ definePage ~ instance:", instance)
  }
});
```