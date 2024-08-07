// 定义页面生命周期函数类型
export type PageLifeCycle = {
  // 生命周期回调函数
  onLoad(query?: Record<string, string>): void;
  onShow(): void;
  onReady(): void;
  onHide(): void;
  onUnload(): void;
  onRouteDone(): void;
  // 页面事件处理函数
  onPullDownRefresh(): void;
  onReachBottom(): void;
  onPageScroll(event?: { scrollTop: number }): void;
  onAddToFavorites(event?: { webViewUrl: string }): {
    title: string;
    imageUrl: string;
    query: string;
  };
  onShareAppMessage(event?: {
    from: string;
    target?: any;
    webViewUrl?: string;
  }): {
    title: string; // 转发标题	当前小程序名称
    path: string; // 转发路径	当前页面 path ，必须是以 / 开头的完整路径
    imageUrl?: string; // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。	使用默认截图	1.5.0
    promise?: Promise<{
      title: string; // 转发标题	当前小程序名称
      path: string; // 转发路径	当前页面 path ，必须是以 / 开头的完整路径
      imageUrl?: string; // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。	使用默认截图	1.5.0
    }>;
  };
  onShareTimeline(): {
    title: string; // 自定义标题，即朋友圈列表页上显示的标题	当前小程序名称
    query: string; // 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分	当前页面路径携带的参数
    imageUrl: string; // 自定义图片路径，可以是本地文件或者网络图片。支持 PNG 及 JPG，显示图片长宽比是 1:1。	默认使用小程序 Logo
  };
  onResize(event?: {
    size: { windowWidth: number; windowHeight: number };
  }): void;
  onTabItemTap(item?: { index: string; pagePath: string; text: string }): void;
  onSaveExitState(): void;
};

// 定义自定义方法类型
export type CustomMethods = {
  [key: string]: (...args: any[]) => any;
};

// 定义页面选项类型
export type PageOptions = {
  data?: Record<string, any>;
} & PageLifeCycle &
  CustomMethods;

// 定义页面函数类型
export type PageFunction = (options: PageOptions) => void;

// 定义页面
declare const Page: PageFunction;
