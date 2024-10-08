import { definePage, onReady } from '@52css/mp-vue3';
import { setReadyStart, getReadyTimeWithModal } from '../../proxy';

definePage(() => {
  const reLaunch = () => {
    setReadyStart();
    wx.reLaunch({
      url: '/pages/static/index',
    });
  };

  const reLaunch2 = () => {
    setReadyStart();
    wx.reLaunch({
      url: '/pages/index/index',
    });
  };

  onReady(() => {
    getReadyTimeWithModal();
  });

  return {
    reLaunch,
    reLaunch2,
  };
});
