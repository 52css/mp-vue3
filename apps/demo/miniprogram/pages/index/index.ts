import { ref, definePage, onShow, PropType } from "@52css/mp-vue3";

var app = getApp();

type User = {
  id: number;
  name: string;
};

const useTest = () => {
  const test = ref(0);

  setTimeout(() => {
    test.value = 3;
  }, 1000);

  return test;
};

definePage({
  queries: {
    name: String,
    a: Boolean,
    b: Number,
    // 需要兼容这个定义
    user: Object as PropType<User>,
  },
  setup(query) {
    // 需要兼容这个类型
    console.log("🚀 ~ definePage ~ query:", query);
    const count = ref(0);
    const onIncrease = () => {
      count.value++;
    };
    const test = useTest();

    onShow(() => {
      console.log("onPageShow");
    });

    const show = ref(true);
    const onShowToggleTap = () => {
      show.value = !show.value;
    };

    return {
      // 返回响应式数据
      count,
      // 返回事件
      onIncrease,
      test,

      show,
      onShowToggleTap,
    };
  },
});
