import { defineComponent, useComponent } from "@52css/mp-vue3";

defineComponent({
  // 属性名称和 vue 一致
  props: {
    // 定义单类型
    name: String,
    // 定义对象，通过default控制默认值
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // props 即 小程序 this.properties
    // emit 即 小程序 this.triggerEvent
    const instance = useComponent();

    const onTap = () => {
      console.log("instance?.properties.name", instance?.properties.name);
    };

    // 需要返回响应式数据、方法
    return {
      onTap,
    };
  },
});
