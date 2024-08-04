# MP-VUE3

* 组合api好处就是方便集中处理逻辑，而微信小程序还是`options`方式，有什么方式可以直接使用`vue3`响应数据吗？首选是使用`uni-app` 直接选择 `vue3` 模版，使用过的都知道有2大通病
  * 性能问题
  * 体积问题
* 如何解决这个问题，我们可以在`ts`中拦截处理，通过响应式数据拦截处理，而`wxml` 和 `wxss` 保持一致
  * 体积很小
  * 通过`组合api` 集中处理逻辑

## 安装

### 运行脚本

```sh
bun add @52css/mp-vue3
```

### 通过`npm`构建

![alt text](./docs/build.png)

## 响应式API

### Page 页面

```ts
import { definePage } from '@52css/mp-vue3'

definePage(() => {
  // 里面使用hooks方法
})
```

### Component 组件

```ts
import { defineComponent } from '@52css/mp-vue3'

// 方式一，直接是hooks方法
defineComponent(() => {
  // 里面使用hooks方法
})

// 方式二，传递options
defineComponent({
  props: {
    type: String
  },
  setup(props, ctx) {
    // 这里是hooks方法
  }
})
```

### 定义常量、方法

ts

```ts
import { definePage } from '@52css/mp-vue3'

definePage(() => {
  const text = 'hello weapp vue3'
  const onClick = () => {
    console.log('text', text)
  }

  // 所有定义必须返回
  return { text, onClick }
})
```

wxml

```html
<view bind:tap="onClick">
  text:{{text}}
</view>
```

### ref

ts

```ts
import { definePage, ref } from '@52css/mp-vue3'

definePage(() => {
  const count = ref(0)
  const onIncrease = () => {
    count.value ++
  }

  // 所有定义必须返回
  return { count, onIncrease }
})
```

wxml

```html
<view bind:tap="onIncrease">
  count: {{count}}
</view>
```

### reactive

ts

```ts
import { definePage, reactive, toRefs } from '@52css/mp-vue3'

definePage(() => {
  const state = reactive({loading: false})
  const onTap = () => {
      state.loading = !state.loading
  }

  // 所有定义必须返回
  return { ...toRefs(state), onTap }
})
```

wxml

```html
<view bind:tap="onTap">
  loading:{{loading}}
</view>
```

### computed

ts

```ts
import { definePage, ref, computed } from '@52css/mp-vue3'

definePage(() => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const onIncrease = () => {
    count.value ++
  }

  // 所有定义必须返回
  return { count, doubleCount, onIncrease }
})
```

wxml

```html
<view bind:tap="onIncrease">
    <view>count: {{count}}</view>
    <view>doubleCount: {{doubleCount}}</view>
</view>
```

### watch

ts

```ts
import { definePage, ref, watch } from '@52css/mp-vue3'

definePage(() => {
  const count = ref(0)
  const handleClick = () => {
    count.value ++
  }

  watch(() => count.value, (newVal, oldVal) => {
    console.log('newVal', newVal, 'oldVal', oldVal)
  })

  // 所有定义必须返回
  return { count, handleClick }
})
```

wxml

```html
<view bind:tap="handleClick">
    count: {{count}}
</view>
```

## API

### 页面

* definePage 定义页面
* getCurrentPage 获取当前页面

### 页码生命周期

* onLoad => setup
* onShow
* onReady
* onHide
* onUnload
* onRouteDone
* onPullDownRefresh
* onReachBottom
* onPageScroll
* onAddToFavorites
* onShareAppMessage
* onShareTimeline
* onResize
* onTabItemTap
* onSaveExitState

### 组件

* defineComponent 定义组件
* getCurrentInstance 获取当前示例
* useObserver 监控属性变化(props和data)

### 组件生命周期

* attached => setup
* ready
* moved
* detached
* error

### Core

* computed
* reactive
* ref
* readonly

### Utilities

* unref
* proxyRefs
* isRef
* toRef
* toValue
* toRefs
* isProxy
* isReactive
* isReadonly
* isShallow

### Advanced

* customRef
* triggerRef
* shallowRef
* shallowReactive
* shallowReadonly
* markRaw
* toRaw

### Effect

* effect
* stop
* ReactiveEffect

### Effect scope

* effectScope
* EffectScope
* getCurrentScope
* onScopeDispose

### Watch

* watch
* watchEffect
* watchPostEffect
* watchSyncEffect