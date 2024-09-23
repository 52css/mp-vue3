# useRoute

* `route.query.xx` 不是响应式，如果有需要再添加

```ts
import { definePage, ref, useRoute } from '@52css/mp-vue3'


definePage({
  queries: {
    a: Number,
    b: Number,
  },
  setup(query) {
    const route = useRoute();
    /**
     * 返回
     * {
     *   path: "pages/pinia/pinia",
     *   query: {a: 1, b: 2}, // ** 这个必须定义了queries才能正确转换格式 **
     * }
     */
    console.log("🚀 ~ setup ~ route:", route)
    

    return {
    }
  }
})
  ```