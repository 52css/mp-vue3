import { ref, definePage, onShow, PropType, onLoad } from "@52css/mp-vue3";

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
    user: Object as PropType<User>,
    userList: Array as PropType<User[]>,
  },
  onShow() {
    console.log("🚀 ~ 原生 ~ onShow:", onShow, this);
  },
  setup(query) {
    console.log("🚀 ~ definePage ~ query:", query);
    const count = ref(0);
    const onIncrease = () => {
      count.value++;
    };
    const test = useTest();

    onLoad((query) => {
      console.log("🚀 ~ onLoad ~ query:", query);
    });

    onShow(() => {
      console.log("onPageShow");
      return () => {
        console.log("onPageHide");
      };
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
