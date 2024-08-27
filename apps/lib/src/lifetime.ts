import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
import { type AppInstance } from "./app";
import { instance } from "./shared";

export const lifetimeEmit = (
  instance: PageInstance | ComponentInstance | AppInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    options[lifetimeKey].apply(instance, args);
  }
  if (!instance[`$${lifetimeKey}`]) {
    return;
  }

  const eventBackMap = {
    onLoad: "onUnload",
    onShow: "onHide",
    attached: "detached",
    show: "hide",
  };
  const lifetimesBackKey =
    eventBackMap[lifetimeKey as keyof typeof eventBackMap];

  instance[`$${lifetimeKey}`].forEach((fn: Function) => {
    // 反面有没有对应的off
    if (lifetimesBackKey) {
      const backFn =
        instance[`$${lifetimesBackKey}`] &&
        instance[`$${lifetimesBackKey}`].find((x: any) => x.front === fn);

      if (backFn) {
        backFn();
      }
    }

    const off = fn.apply(instance, args);
    // 调用是否返回函数，用于销毁
    if (lifetimesBackKey && typeof off === "function") {
      let backFn =
        instance[`$${lifetimesBackKey}`] &&
        instance[`$${lifetimesBackKey}`].find((x: any) => x.front === fn);

      if (!backFn) {
        off.front === fn;
        if (!instance[`$${lifetimesBackKey}`]) {
          instance[`$${lifetimesBackKey}`] = [];
        }
        instance[`$${lifetimesBackKey}`].push(off);
      }
    }
  });
};

export const lifetimeEmitOnce = (
  instance: PageInstance | ComponentInstance | AppInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    return options[lifetimeKey].apply(instance, args);
  }
  if (!instance[`$${lifetimeKey}`]) {
    return;
  }

  if (instance[`$${lifetimeKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimeKey}`);
  }

  return instance[`$${lifetimeKey}`][0].apply(instance, args);
};

export const lifetimeOn = (
  instance: PageInstance | ComponentInstance | AppInstance | null,
  lifetimeKey: string,
  hook: Function
) => {
  if (!instance) {
    return;
  }

  if (!instance[`$${lifetimeKey}`]) {
    instance[`$${lifetimeKey}`] = [];
  }

  instance[`$${lifetimeKey}`].push(hook.bind(instance));
};

export const onLoad = (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) =>
  lifetimeOn(instance, "onLoad", hook);
export const onShow = (
  hook:
    | WechatMiniprogram.Page.ILifetime["onShow"]
    | WechatMiniprogram.App.Instance<{}>["onShow"]
) => lifetimeOn(instance, "onShow", hook);
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  lifetimeOn(instance, "onReady", hook);
export const onHide = (
  hook:
    | WechatMiniprogram.Page.ILifetime["onHide"]
    | WechatMiniprogram.App.Instance<{}>["onHide"]
) => lifetimeOn(instance, "onHide", hook);
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  lifetimeOn(instance, "onUnload", hook);
export const onRouteDone = (hook: () => void) =>
  lifetimeOn(instance, "onRouteDone", hook);
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => lifetimeOn(instance, "onPullDownRefresh", hook);
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => lifetimeOn(instance, "onReachBottom", hook);
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => lifetimeOn(instance, "onPageScroll", hook);
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => lifetimeOn(instance, "onAddToFavorites", hook);
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => lifetimeOn(instance, "onShareAppMessage", hook);
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => lifetimeOn(instance, "onShareTimeline", hook);
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  lifetimeOn(instance, "onResize", hook);
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => lifetimeOn(instance, "onTabItemTap", hook);
export const onSaveExitState = (hook: () => void) =>
  lifetimeOn(instance, "onSaveExitState", hook);

export const attached = (
  hook: WechatMiniprogram.Component.Lifetimes["attached"]
) => lifetimeOn(instance, "attached", hook);
export const ready = (hook: WechatMiniprogram.Component.Lifetimes["ready"]) =>
  lifetimeOn(instance, "ready", hook);
export const moved = (hook: WechatMiniprogram.Component.Lifetimes["moved"]) =>
  lifetimeOn(instance, "moved", hook);
export const detached = (
  hook: WechatMiniprogram.Component.Lifetimes["detached"]
) => lifetimeOn(instance, "detached", hook);
export const error = (hook: WechatMiniprogram.Component.Lifetimes["error"]) =>
  lifetimeOn(instance, "error", hook);

export const show = (hook: WechatMiniprogram.Component.PageLifetimes["show"]) =>
  lifetimeOn(instance, "show", hook);
export const hide = (hook: WechatMiniprogram.Component.PageLifetimes["hide"]) =>
  lifetimeOn(instance, "hide", hook);
export const resize = (
  hook: WechatMiniprogram.Component.PageLifetimes["resize"]
) => lifetimeOn(instance, "resize", hook);
export const routeDone = (
  //@ts-expect-error 不要报错
  hook: WechatMiniprogram.Component.PageLifetimes["routeDone"]
) => lifetimeOn(instance, "routeDone", hook);

export const onLaunch = (
  hook: WechatMiniprogram.App.Instance<{}>["onLaunch"]
) => lifetimeOn(instance, "onLaunch", hook);

// export const onShow = (
//   hook: WechatMiniprogram.App.Instance<{}>["onShow"]
// ) => lifetimeOn(instance, "onShow", hook);

// export const onHide = (
//   hook: WechatMiniprogram.App.Instance<{}>["onHide"]
// ) => lifetimeOn(instance, "onHide", hook);

export const onError = (hook: WechatMiniprogram.App.Instance<{}>["onError"]) =>
  lifetimeOn(instance, "onError", hook);

export const onPageNotFound = (
  hook: WechatMiniprogram.App.Instance<{}>["onPageNotFound"]
) => lifetimeOn(instance, "onPageNotFound", hook);

export const onUnhandledRejection = (
  hook: WechatMiniprogram.App.Instance<{}>["onUnhandledRejection"]
) => lifetimeOn(instance, "onUnhandledRejection", hook);

export const onThemeChange = (
  hook: WechatMiniprogram.App.Instance<{}>["onThemeChange"]
) => lifetimeOn(instance, "onThemeChange", hook);
