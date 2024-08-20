import { defineComponent, attached, watch } from "@52css/mp-vue3";

defineComponent({
  // 属性名称和 vue 一致
  properties: {
    // 定义单类型
    name: String,
    // 定义对象，通过default控制默认值
    border: {
      type: Boolean,
      value: false,
    },
  },
  setup(props, context) {
    console.log("🚀 ~ setup ~ context:", context);
    console.log("🚀 ~ setup ~ props:", props);
    // props 即 小程序 this.properties
    // emit 即 小程序 this.triggerEvent

    const onTap = () => {
      console.log("props.name", props.name);
    };

    watch(
      () => props.name,
      (newVal) => {
        console.log("🚀 ~ watch ~ newVal:", newVal);
      }
    );

    attached(() => {
      console.log("组件加载");
      return () => {
        console.log("组件销毁");
      };
    });

    // 需要返回响应式数据、方法
    return {
      onTap,
    };
  },
});
