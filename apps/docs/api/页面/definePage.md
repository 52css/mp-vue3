# definePage

* 继承[微信小程序 Page](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)
* 👍 扩充支持 `Function`
* 对象默认下扩充 `setup` 方法

## 扩充支持 `Function`

```ts
import { definePage, ref } from '@52css/mp-vue3'

definePage(() => {
  const count = ref(0)
  const onIncrease = () => {
    count.value++; // 数据变更，自动响应 this.data.count
  }

  // 所有的数据和方法需要返回
  return {
    count,
    onIncrease
  }
});
```

## 对象默认下扩充 `setup` 方法

```ts
import { definePage, ref } from '@52css/mp-vue3'

definePage({
  setup() {
    const count = ref(0)
    const onIncrease = () => {
      count.value++; // 数据变更，自动响应 this.data.count
    }

    // 所有的数据和方法需要返回
    return {
      count,
      onIncrease
    }
  }
})
```