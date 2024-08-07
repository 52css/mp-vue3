import { proxyRefs } from "@vue/reactivity";
import { watch } from "./watch";
import "miniprogram-api-typings";

// 定义页面
// declare const Page: PageFunction;
export type ComponentPropType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | null;

type ComponentPropInferValueType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : any;

export type ComponentPropDefinition<T> = {
  type: T | T[];
  optionalTypes?: ComponentPropType[];
  default?: ComponentPropInferValueType<T>;
  value?: ComponentPropInferValueType<T>;
  observer?(
    newVal: ComponentPropInferValueType<T>,
    oldVal: ComponentPropInferValueType<T>
  ): void;
};

export type ComponentProps = {
  [key: string]: ComponentPropType | ComponentPropDefinition<ComponentPropType>;
};

export type ComponentEmit = {
  emit?(key: string, val: any): void;
};

export type Hook = (
  props?: ComponentProps,
  context?: Context & ComponentEmit
) => Record<string, any>;

export type Context =
  | WechatMiniprogram.Component.Instance<
      WechatMiniprogram.Component.DataOption,
      Record<string, any>,
      WechatMiniprogram.Component.MethodOption,
      {},
      false
    >
  | WechatMiniprogram.Page.Instance<
      WechatMiniprogram.Page.DataOption,
      WechatMiniprogram.Page.CustomOption
    >;
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
      methodEmit.call(this, "onLoad", [query]);
    },
    onShow() {
      methodEmit.call(this, "onShow");
    },
    onReady() {
      methodEmit.call(this, "onReady");
    },
    onHide() {
      methodEmit.call(this, "onHide");
    },
    onUnload() {
      methodEmit.call(this, "onUnload");
    },
    onRouteDone() {
      methodEmit.call(this, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh() {
      methodEmit.call(this, "onPullDownRefresh");
    },
    onReachBottom() {
      methodEmit.call(this, "onReachBottom");
    },
    onPageScroll(object) {
      methodEmit.call(this, "onPageScroll", [object]);
    },
    onAddToFavorites(object) {
      return methodOnce.call(this, "onAddToFavorites", [object]);
    },
    onShareAppMessage(event) {
      return methodOnce.call(this, "onShareAppMessage", [event]);
    },
    onShareTimeline() {
      return methodOnce.call(this, "onShareTimeline");
    },
    onResize(event) {
      methodEmit.call(this, "onResize", [event]);
    },
    onTabItemTap(object) {
      methodEmit.call(this, "onTabItemTap", [object]);
    },
    onSaveExitState() {
      methodEmit.call(this, "onSaveExitState");
    },
  });
}

/**
 * 获取属性并将其转换为组件属性格式
 * @param props - 组件的属性
 * @returns 转换后的属性对象
 */
function getProperties(props?: ComponentProps) {
  if (!props) {
    return {};
  }
  for (let prop in props) {
    const val = props[prop] as ComponentPropDefinition<ComponentPropType>;
    if (val && val.type) {
      val.value = typeof val.default !== "undefined" ? val.default : val.value;
      if (Array.isArray(val.type)) {
        const optionalTypes = val.type;
        val.type = optionalTypes[0];
        val.optionalTypes =
          typeof val.optionalTypes !== "undefined"
            ? val.optionalTypes
            : optionalTypes;
      }
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
        props?: ComponentProps;
        setup: Hook;
      }
) {
  let options = {};
  let properties = {};
  if (typeof hook !== "function") {
    const { setup, props, ...other } = hook;

    options = other;
    properties = getProperties(props);
    hook = setup;
    if ("properties" in other) {
      console.warn(`属性使用"props"`);
    }
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
        methodEmit.call(this, "attached");
      },
      ready() {
        methodEmit.call(this, "ready");
      },
      moved() {
        methodEmit.call(this, "moved");
      },
      detached() {
        methodEmit.call(this, "detached");
      },
      error(err: WechatMiniprogram.Error) {
        methodEmit.call(this, "error", [err]);
      },
    },
  });
}

export const getCurrentPage = () => {
  //@ts-ignore 微信自带方法
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

function methodEmit(this: any, lifetimesKey: string, args?: any[]) {
  if (!this[`$${lifetimesKey}`]) {
    return;
  }

  this[`$${lifetimesKey}`].forEach((fn: Function) => {
    fn.apply(this, args);
  });
}

function methodOnce(this: any, lifetimesKey: string, args?: any[]) {
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

function methodOn(hook: Function, lifetimesKey: string) {
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
  methodOn(hook, "onShow");
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  methodOn(hook, "onReady");
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  methodOn(hook, "onHide");
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  methodOn(hook, "onUnload");
export const onRouteDone = (hook: () => void) => methodOn(hook, "onRouteDone");
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => methodOn(hook, "onPullDownRefresh");
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => methodOn(hook, "onReachBottom");
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => methodOn(hook, "onPageScroll");
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => methodOn(hook, "onAddToFavorites");
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => methodOn(hook, "onShareAppMessage");
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => methodOn(hook, "onShareTimeline");
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  methodOn(hook, "onResize");
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => methodOn(hook, "onTabItemTap");
export const onSaveExitState = (hook: () => void) =>
  methodOn(hook, "onSaveExitState");

export const attached = (
  hook: WechatMiniprogram.Component.Lifetimes["attached"]
) => methodOn(hook, "attached");
export const ready = (hook: WechatMiniprogram.Component.Lifetimes["ready"]) =>
  methodOn(hook, "ready");
export const moved = (hook: WechatMiniprogram.Component.Lifetimes["moved"]) =>
  methodOn(hook, "moved");
export const detached = (
  hook: WechatMiniprogram.Component.Lifetimes["detached"]
) => methodOn(hook, "detached");
export const error = (hook: WechatMiniprogram.Component.Lifetimes["error"]) =>
  methodOn(hook, "error");
