# definePage

* 继承[微信小程序 Page](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)
* 扩充支持 `Function`
* 👍 对象默认下扩充 `setup` 方法

## 扩充支持 `Function`

```ts
import { definePage, ref } from '@52css/mp-vue3'

definePage((query, context) => {
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

* ✨ 增加 `queries` 定义, 推导 `query` 类型
* ✨ 增加 `query` 对应配置类型数据转换

```ts
import { definePage, ref, PropType } from '@52css/mp-vue3'

type User = {
  id: number;
  name: string;
}

definePage({
  // 如果这里定义了
  queries: {
    name: String, // 类型不处理
    a: Boolean, // 类型 Boolean 转换
    b: Number, // 类型 Number 转换
    user: Object as PropType<User>, // 类型 JSON.parse(decodeURIComponent(val)) 转换
    userList: Array as PropType<User[]>, // 类型 JSON.parse(decodeURIComponent(val)) 转换
  },
  setup(query) {
    // 原始类型 name=vendor&a=&b=123&user=%7B%22id%22%3A1%2C%22name%22%3A%22%E5%BC%A0%E4%B8%89%22%7D&userList=%5B%7B%22id%22%3A1%2C%22name%22%3A%22%E5%BC%A0%E4%B8%89%22%7D%5D
    console.log("🚀 ~ setup ~ query:", query) // 转换类型 {name: "vendor", a: false, b: 123, user: {id: 1, name: '张三'}, userList: [{id: 1, name: '张三'}]}
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

## Setup 参数

### PageQuery 属性

* 读取`onLoad`对应query
