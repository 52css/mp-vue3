import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
import { instance } from "./shared";

export const lifetimeEmit = (
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    options[lifetimeKey](...args);
  }
  if (!instance[`$${lifetimeKey}`]) {
    return;
  }

  const eventBackMap = {
    onLoad: "onUnload",
    onShow: "onHide",
    attached: "detached",
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
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    return options[lifetimeKey](...args);
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
  instance: PageInstance | ComponentInstance | null,
  lifetimeKey: string,
  hook: Function
) => {
  if (!instance) {
    return;
  }

  if (!instance[`$${lifetimeKey}`]) {
    instance[`$${lifetimeKey}`] = [];
  }

  instance[`$${lifetimeKey}`].push(hook);
};

export const onLoad = (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) =>
  lifetimeOn(instance, "onLoad", hook);
export const onShow = (hook: WechatMiniprogram.Page.ILifetime["onShow"]) =>
  lifetimeOn(instance, "onShow", hook);
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  lifetimeOn(instance, "onReady", hook);
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  lifetimeOn(instance, "onHide", hook);
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
