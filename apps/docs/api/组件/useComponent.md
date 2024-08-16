# useComponent

* 获取当前组件实例

```ts
import { defineComponent, useComponent } from '@52css/mp-vue3'

defineComponent({
  props: {},
  setup() {
    const instance = useComponent();
    console.log("🚀 ~ defineComponent ~ instance:", instance)

    return {
    }
  }
});
```