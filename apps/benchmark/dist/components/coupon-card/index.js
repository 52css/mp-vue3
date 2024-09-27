"use strict";

var _mpVue = require("@52css/mp-vue3");
(0, _mpVue.defineComponent)({
  properties: {
    info: Object
  },
  setup(props) {
    let start = 0;
    const selected = (0, _mpVue.ref)(false);
    (0, _mpVue.watch)(selected, () => {
      wx.showModal({
        content: `总耗时: ${Date.now() - start}`
      });
    }, {
      flush: 'post'
    });
    const toggleSelect = () => {
      if (props.info.valid) {
        start = Date.now();
        selected.value = !selected.value;
      }
    };
    return {
      selected,
      toggleSelect
    };
  }
});