import { proxyRefs } from "@vue/reactivity";
import { watch } from "./watch";
import "miniprogram-api-typings";

// 定义页面
// declare const Page: PageFunction;
export type ComponentPropertiesType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | null;

type InferValueType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : any;

export type PropertyDefinition<T> = {
  type: T | T[];
  // optionalTypes?: ComponentPropertiesType[];
  default?: InferValueType<T>;
  observer?(newVal: InferValueType<T>, oldVal: InferValueType<T>): void;
};

export type Properties = {
  [key: string]:
    | ComponentPropertiesType
    | PropertyDefinition<ComponentPropertiesType>;
};

export type Context2 = {
  emit(): void;
};

export type Hook = (props?: Properties, context?: Context2) => void;

export type Context = any;
let _context: Context;

/**
 * 使用 Hook 函数并将结果与上下文关联
 * @param context - 当前上下文
 * @param hook - Hook 函数
 */
function useHook(context: Context, hook: Hook) {
  _context = context;
  const splitFieldsAndMethods = (obj: WechatMiniprogram.Page.DataOption) => {
    const fields: WechatMiniprogram.Page.DataOption = {};
    const methods: Record<string, Function> = {};
    for (const k in obj) {
      if (typeof obj[k] === "function") {
        methods[k] = obj[k];
      } else {
        fields[k] = obj[k];
      }
    }
    return {
      fields,
      methods,
    };
  };
  const setData = (result: WechatMiniprogram.Page.DataOption) => {
    const { fields, methods } = splitFieldsAndMethods(result);

    Object.keys(methods).forEach((key) => {
      context[key] = methods[key];
    });

    context.setData(fields);
  };
  const result = proxyRefs(hook.call(context));
  watch(
    () => result,
    (newVal) => {
      setData(newVal);
    },
    {
      deep: true,
      immediate: true,
    }
  );
}

/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export function definePage(
  hook:
    | Hook
    | (WechatMiniprogram.Page.Options<
        WechatMiniprogram.Page.DataOption,
        WechatMiniprogram.Page.CustomOption
      > & { setup: Hook })
) {
  let options = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;
    options = other || {};
    hook = setup;
  }

  Page({
    ...options,
    // 生命周期回调函数
    onLoad(query) {
      useHook(this, hook);
      hooksEmit.call(this, "onLoad", [query]);
    },
    onShow() {
      hooksEmit.call(this, "onShow");
    },
    onReady() {
      hooksEmit.call(this, "onReady");
    },
    onHide() {
      hooksEmit.call(this, "onHide");
    },
    onUnload() {
      hooksEmit.call(this, "onUnload");
    },
    onRouteDone() {
      hooksEmit.call(this, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh() {
      hooksEmit.call(this, "onPullDownRefresh");
    },
    onReachBottom() {
      hooksEmit.call(this, "onReachBottom");
    },
    onPageScroll(object) {
      hooksEmit.call(this, "onPageScroll", [object]);
    },
    onAddToFavorites(object) {
      return hooksOnce.call(this, "onAddToFavorites", [object]);
    },
    onShareAppMessage(event) {
      return hooksOnce.call(this, "onShareAppMessage", [event]);
    },
    onShareTimeline() {
      return hooksOnce.call(this, "onShareTimeline");
    },
    onResize(event) {
      hooksEmit.call(this, "onResize", [event]);
    },
    onTabItemTap(object) {
      hooksEmit.call(this, "onTabItemTap", [object]);
    },
    onSaveExitState() {
      hooksEmit.call(this, "onSaveExitState");
    },
  });
}

/**
 * 获取属性并将其转换为组件属性格式
 * @param props - 组件的属性
 * @returns 转换后的属性对象
 */
function getProperties(props: Properties) {
  for (let prop in props) {
    if (props[prop] && props[prop].type) {
      props[prop].value = props[prop].default;
    }
  }

  return props;
}

/**
 * 创建组件并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export function defineComponent(
  hook:
    | Hook
    | {
        props?: Record<string, any>;
        setup: Hook;
      }
) {
  let options = {};
  let properties: Record<string, any> = {};
  if (typeof hook !== "function") {
    const { setup, props, ...other } = hook;

    options = other;
    properties = getProperties(props);
    hook = setup;
  }

  Component({
    ...options,
    options: {
      virtualHost: true,
      styleIsolation: "apply-shared",
      multipleSlots: true,
    },
    properties,
    lifetimes: {
      attached() {
        const emit = (key: string, value: any) => {
          this.triggerEvent(key, { value });
        };
        this.emit = emit;
        useHook(this, hook.bind(this, this.properties, this));
        hooksEmit.call(this, "attached");
      },
      ready() {
        hooksEmit.call(this, "ready");
      },
      moved() {
        hooksEmit.call(this, "moved");
      },
      detached() {
        hooksEmit.call(this, "detached");
      },
      error(err: WechatMiniprogram.Error) {
        hooksEmit.call(this, "error", [err]);
      },
    },
  });
}

export const getCurrentPage = () => {
  //@ts-ignore 微信自带方法
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

function hooksEmit(this: any, lifetimesKey: string, args?: any[]) {
  if (!this[`$${lifetimesKey}`]) {
    return;
  }

  this[`$${lifetimesKey}`].forEach((fn: Function) => {
    fn.apply(this, args);
  });
}

function hooksOnce(this: any, lifetimesKey: string, args?: any[]) {
  if (!this[`$${lifetimesKey}`]) {
    return;
  }

  if (this[`$${lifetimesKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimesKey}`);
  }

  return this[`$${lifetimesKey}`][0].apply(this, args);
}

export const useObserver = (key: string, fn: Function) => {
  const defineReactive = (obj: any, key: string, callback?: Function) => {
    let val = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        val = newVal;
        callback && callback(newVal);
      },
    });
  };
  if (key in _context.properties) {
    defineReactive(_context.properties, key, fn);
  } else if (key in _context.data) {
    defineReactive(_context.data, key, fn);
  } else {
    throw new Error(`未找到可以 observer ${key}`);
  }
};

export const getCurrentInstance = () => {
  return {
    proxy: _context,
  };
};

function hooksOn(hook: Function, lifetimesKey: string) {
  const isPageLifetime = /^on/.test(lifetimesKey);
  const context = isPageLifetime ? getCurrentPage() : _context;

  if (!context) {
    return;
  }

  if (!context[`$${lifetimesKey}`]) {
    context[`$${lifetimesKey}`] = [];
  }

  context[`$${lifetimesKey}`].push(hook.bind(context));
}

export const onShow = (hook: WechatMiniprogram.Page.ILifetime["onShow"]) =>
  hooksOn(hook, "onShow");
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  hooksOn(hook, "onReady");
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  hooksOn(hook, "onHide");
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  hooksOn(hook, "onUnload");
export const onRouteDone = (hook: () => void) => hooksOn(hook, "onRouteDone");
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => hooksOn(hook, "onPullDownRefresh");
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => hooksOn(hook, "onReachBottom");
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => hooksOn(hook, "onPageScroll");
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => hooksOn(hook, "onAddToFavorites");
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => hooksOn(hook, "onShareAppMessage");
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => hooksOn(hook, "onShareTimeline");
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  hooksOn(hook, "onResize");
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => hooksOn(hook, "onTabItemTap");
export const onSaveExitState = (hook: () => void) =>
  hooksOn(hook, "onSaveExitState");

export const attached = (
  hook: WechatMiniprogram.Component.Lifetimes["attached"]
) => hooksOn(hook, "attached");
export const ready = (hook: WechatMiniprogram.Component.Lifetimes["ready"]) =>
  hooksOn(hook, "ready");
export const moved = (hook: WechatMiniprogram.Component.Lifetimes["moved"]) =>
  hooksOn(hook, "moved");
export const detached = (
  hook: WechatMiniprogram.Component.Lifetimes["detached"]
) => hooksOn(hook, "detached");
export const error = (hook: WechatMiniprogram.Component.Lifetimes["error"]) =>
  hooksOn(hook, "error");
