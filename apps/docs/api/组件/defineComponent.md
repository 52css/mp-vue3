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

## Setup 参数

### Props 属性

* 读取小程序 `this.properties`属性
* 扩展可以 `props.propName = 'value'` 赋值, 同时调用
  - 调用 `this.setData({'propName': 'value'})`
  - 调用 `this.triggerEvent('propName', { value })`

### Context 属性

* `is`
* `id`
* `dataset`
* `exitState`
* `router`
* `pageRouter`
* `renderer`
* `triggerEvent`
* `createSelectorQuery`
* `createIntersectionObserver`
* `createMediaQueryObserver`
* `selectComponent`
* `selectAllComponents`
* `selectOwnerComponent`
* `getRelationNodes`
* `getTabBar`
* `getPageId`
* `animate`
* `clearAnimation`
* `getOpenerEventChannel`
* `applyAnimatedStyle`
* `clearAnimatedStyle`
* `setUpdatePerformanceListener`
* `getPassiveEvent`
* `setPassiveEvent`
* `emit` 对外触发事件 `(key: string, value: any) => {this.triggerEvent(key, { value });}`

## 生命周期

* attached => setup