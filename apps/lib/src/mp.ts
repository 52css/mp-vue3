import { proxyRefs } from "@vue/reactivity";
import { watch } from "./watch";
import {
  type PageOptions,
  type PageFunction,
  type PageLifeCycle,
} from "./type";

// 定义页面
declare const Page: PageFunction;

type Hook = () => any;
type Context = any;

let _context: Context;

/**
 * 使用 Hook 函数并将结果与上下文关联
 * @param context - 当前上下文
 * @param hook - Hook 函数
 */
function useHook(context: Context, hook: Hook) {
  _context = context;
  const splitFieldsAndMethods = (obj: Record<string, any>) => {
    const fields: Record<string, any> = {};
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
  const setData = (result: Record<string, any>) => {
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
export function definePage(hook: Hook | (PageOptions & { setup: Hook })) {
  let option = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;
    option = other || {};
    hook = setup;
  }

  Page({
    ...option,
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
function getProperties(props: Record<string, any>) {
  return Object.keys(props).reduce((prev, item) => {
    const value = props[item].default || props[item].value;
    prev[item] = value
      ? {
          type: props[item].type,
          value,
        }
      : props[item];
    return prev;
  }, {} as Record<string, any>);
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
        observers?: Record<string, any>;
        behaviors?: any[];
        componentGenerics?: Record<string, any>;
        setup: Hook;
      }
) {
  let props: Record<string, any> = {};
  let observers: Record<string, any> = {};
  let behaviors: any[] = [];
  let componentGenerics: Record<string, any> = {};
  if (typeof hook !== "function") {
    props = hook.props || props;
    observers = hook.observers || observers;
    behaviors = hook.behaviors || behaviors;
    componentGenerics = hook.componentGenerics || componentGenerics;
    hook = hook.setup;
  }

  //@ts-ignore 微信自带方法
  Component({
    observers,
    behaviors,
    componentGenerics,
    options: {
      virtualHost: true,
      styleIsolation: "apply-shared",
      dynamicSlots: true,
      multipleSlots: true,
    },
    externalClasses: ["class"],
    properties: getProperties(props),
    data: {},
    lifetimes: {
      attached() {
        const emit = (key: string, value: any) => {
          // @ts-ignore 微信自带触发
          this.triggerEvent(key, { value });
        };
        //@ts-ignore 自定义 emit 方法
        this.emit = emit;
        // @ts-ignore 微信自带属性
        useHook(this, hook.bind(this, this.properties, this));
      },
      ready(...args: any[]) {
        hooksEmit.call(this, "ready", args);
      },
      moved(...args: any[]) {
        hooksEmit.call(this, "moved", args);
      },
      detached(...args: any[]) {
        hooksEmit.call(this, "detached", args);
      },
      error(...args: any[]) {
        hooksEmit.call(this, "error", args);
      },
    },
    methods: {},
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

export const onShow = (hook: PageLifeCycle["onShow"]) =>
  hooksOn(hook, "onShow");
export const onReady = (hook: PageLifeCycle["onReady"]) =>
  hooksOn(hook, "onReady");
export const onHide = (hook: PageLifeCycle["onHide"]) =>
  hooksOn(hook, "onHide");
export const onUnload = (hook: PageLifeCycle["onUnload"]) =>
  hooksOn(hook, "onUnload");
export const onRouteDone = (hook: PageLifeCycle["onRouteDone"]) =>
  hooksOn(hook, "onRouteDone");
export const onPullDownRefresh = (hook: PageLifeCycle["onPullDownRefresh"]) =>
  hooksOn(hook, "onPullDownRefresh");
export const onReachBottom = (hook: PageLifeCycle["onReachBottom"]) =>
  hooksOn(hook, "onReachBottom");
export const onPageScroll = (hook: PageLifeCycle["onPageScroll"]) =>
  hooksOn(hook, "onPageScroll");
export const onAddToFavorites = (hook: PageLifeCycle["onAddToFavorites"]) =>
  hooksOn(hook, "onAddToFavorites");
export const onShareAppMessage = (hook: PageLifeCycle["onShareAppMessage"]) =>
  hooksOn(hook, "onShareAppMessage");
export const onShareTimeline = (hook: PageLifeCycle["onShareTimeline"]) =>
  hooksOn(hook, "onShareTimeline");
export const onResize = (hook: PageLifeCycle["onResize"]) =>
  hooksOn(hook, "onResize");
export const onTabItemTap = (hook: PageLifeCycle["onTabItemTap"]) =>
  hooksOn(hook, "onTabItemTap");
export const onSaveExitState = (hook: PageLifeCycle["onSaveExitState"]) =>
  hooksOn(hook, "onSaveExitState");

export const ready = (hook: Function) => hooksOn(hook, "ready");
export const moved = (hook: Function) => hooksOn(hook, "moved");
export const detached = (hook: Function) => hooksOn(hook, "detached");
export const error = (hook: Function) => hooksOn(hook, "error");
