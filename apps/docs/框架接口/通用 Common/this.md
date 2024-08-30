# this

* 获取当前实例, 由于绑定在当前`options`中，共用`this`, 在当前作用域下可以直接使用`this`
* 特殊说明下，如果是 `setup`函数使用剪头函数没有`this`, 没有`this`, 没有`this`

## App

```ts
import { createApp } from '@52css/mp-vue3'

createApp({
  setup() {
    console.log("🚀 ~ createApp ~ instance:", this)
  }
});
```

## 页面

```ts
import { definePage } from '@52css/mp-vue3'

definePage({
  queries: {},
  setup() {
    console.log("🚀 ~ definePage ~ instance:", this)
  }
});
```

## 组件

```ts
import { defineComponent } from '@52css/mp-vue3'

defineComponent({
  properties: {},
  setup() {
    console.log("🚀 ~ defineComponent ~ instance:", this)

    return {
    }
  }
});
```