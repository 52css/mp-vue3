import { defineComponent, ref, watch } from '@52css/mp-vue3';
// import { defineComponent, ref, watch } from '@vue-mini/core';

defineComponent({
  properties: {
    info: Object,
  },
  setup(props) {
    let start = 0;
    const selected = ref(false);

    watch(
      selected,
      () => {
        wx.showModal({
          content: `总耗时: ${Date.now() - start}`,
        });
      },
      { flush: 'post' },
    );

    const toggleSelect = () => {
      if (props.info.valid) {
        start = Date.now();
        selected.value = !selected.value;
      }
    };

    return {
      selected,
      toggleSelect,
    };
  },
});
