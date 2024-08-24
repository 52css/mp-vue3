import { defineComponent, attached, watch, PropType } from "@52css/mp-vue3";

type User = {
  id: number;
  name: string;
};

defineComponent({
  // 属性名称和 vue 一致
  properties: {
    // 定义单类型
    name: String,
    // 定义对象，通过default控制默认值
    border: {
      type: Boolean,
      optionalTypes: [String],
      value: "12",
    },
    user: Object as PropType<User>,
    // user: {
    //   type: Object as PropType<User>,
    //   value: {
    //     id: 1,
    //     name: "",
    //   },
    // },
    userList: Array as PropType<User[]>,
    // userList: {
    //   type: Array as PropType<User[]>,
    //   value: [
    //     {
    //       id: 1,
    //       name: "",
    //     },
    //   ],
    // },
  },
  emits: {
    submit: (_data: { name: string; age: number }) => true,
    change: (_value: string | number) => true,
    test: () => true,
  },
  setup(props, { emit }) {
    console.log("🚀 ~ setup ~ this:", this);
    console.log("🚀 ~ setup ~ props:", props);
    const onTap = () => {
      console.log("props.name", props.name);
      emit("change", 1);
      emit("test");
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
