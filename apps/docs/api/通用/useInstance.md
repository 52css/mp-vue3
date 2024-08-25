# useInstance

* 获取当前组件实例

## 页面

```ts
import { definePage, useInstance } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    const instance = useInstance();
    console.log("🚀 ~ definePage ~ instance:", instance)
  }
});
```

## 组件

```ts
import { defineComponent, useInstance } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    const instance = useInstance();
    console.log("🚀 ~ defineComponent ~ instance:", instance)

    return {
    }
  }
});
```