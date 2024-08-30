# onLaunch支持异步

* 原生支持有点麻烦，写`callback`回调函数、写`event`触发、写`promise`等
* 在框架层面支持直接异步执行，Page的`setup` 和 组件的`setup` 等待 App的 `setup`执行完毕再执行


## App

```ts
import { createApp } from '@52css/mp-vue3'

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000); // 5秒后resolve
  });
};

createApp({
  async setup() {
    await sleep();
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

## 整体打印结果

```
// 等待5s
// 打印 🚀 ~ createApp ~ instance:
// 打印 🚀 ~ definePage ~ instance:
// 🚀 ~ defineComponent ~ instance:
```