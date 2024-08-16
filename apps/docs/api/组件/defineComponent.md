# defineComponent

* 继承[微信小程序 Component](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)
* 扩充支持 `Function`
* 👍 对象默认下扩充 `setup` 方法、 `props` 属性

## 扩充支持 `Function`

```ts
import { defineComponent, ref } from '@52css/mp-vue3'

defineComponent((props, context) => {
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

## 👍 对象默认下扩充 `setup` 方法

```ts
import { defineComponent, ref } from '@52css/mp-vue3'

defineComponent({
  props: {
    // 普通类型
    name: String,
    // 支持默认值
    user: {
      type: Object,
      default: {},
    },
    // 支持多个类型
    status: {
      type: [String, Number],
      default: 0
    }
  },
  setup(props, { emit }) {
    console.log("🚀 ~ setup ~ props:", props) // 获取props值
    const count = ref(0)
    const onIncrease = () => {
      count.value++; // 数据变更，自动响应 this.data.count
      emit('change', count.value) // 调用 this.triggerEvent('change', {value: count.value})
    }

    // 所有的数据和方法需要返回
    return {
      count,
      onIncrease
    }
  }
})
```