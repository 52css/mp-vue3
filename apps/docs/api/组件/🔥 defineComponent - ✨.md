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

* ✨ 增加 `properties` 定义, 推导 `props` 类型
* ✨ 增加 `emits` 定义, 推导 `emit` 类型

```ts
import { defineComponent, ref, PropType } from '@52css/mp-vue3'

type User = {
  id: number;
  name: string;
}

defineComponent({
  properties: {
    // 普通类型
    name: String,
    // 支持默认值
    user: {
      type: Object as PropType<Partial<User>>,
      default: {},
    },
    // 支持多个类型
    status: {
      type: String,
      optionalTypes: [Number],
      default: 0
    }
  },
  emits: {
    submit: (_data: { name: string; age: number }) => void 0,
    change: (_value: string | number) => void 0,
    test: () => void 0,
  },
  setup(props, { emit }) {
    // 根据 options.properties 推导 props
    console.log("🚀 ~ setup ~ props:", props) // 获取props值
    const count = ref(0)
    const onIncrease = () => {
      count.value++; // 数据变更，自动响应 this.data.count
      // 根据 options.emits 推导 emit
      emit('change', count.value) // 调用 this.triggerEvent('change', {value: count.value})
      emit("test");
    }

    // 所有的数据和方法需要返回
    return {
      count,
      onIncrease
    }
  }
})
```

## Setup 参数

### ComponentProps 属性

* 读取小程序 `this.properties`属性转换的响应式数据，可以`watch`

### ComponentContext 属性

* `emit` 对外触发事件 `(key: string, value: any) => {this.triggerEvent(key, { value });}`
