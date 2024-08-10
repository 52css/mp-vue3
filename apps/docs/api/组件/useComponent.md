# useComponent

* 获取当前组件实例

## 获取当前组件实例

```ts
import { defineComponent, useComponent } from '@52css/mp-vue3'

defineComponent({
  props: {},
  setup() {
    const comp = useComponent();
    console.log("🚀 ~ defineComponent ~ comp:", comp)

    return {
    }
  }
});
```