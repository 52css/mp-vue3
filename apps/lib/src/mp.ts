import { proxyRefs } from "@vue/reactivity";
import { watch } from "./watch";
import "miniprogram-api-typings";

export type AppHook = () => Record<string, any>;

// 定义页面
export type ComponentPropType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | ObjectConstructor
  | null;

type ComponentPropInferValueType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : T extends ArrayConstructor
  ? any[]
  : T extends ObjectConstructor
  ? Record<string, any>
  : any;

export type ComponentPropDefinition<T extends ComponentPropType> = {
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

export type PageHook = () => Record<string, any>;

export type ComponentHook = (
  props: ComponentProps,
  context: Context & ComponentEmit
) => Record<string, any>;

export type Context =
  | WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>
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

function methodEmit(
  this: any,
  options: any,
  lifetimesKey: string,
  args?: any[]
) {
  if (options && options[lifetimesKey]) {
    options[lifetimesKey].apply(this, args);
  }
  if (!this[`$${lifetimesKey}`]) {
    return;
  }

  this[`$${lifetimesKey}`].forEach((fn: Function) => {
    fn.apply(this, args);
  });
}

function methodOnce(
  this: any,
  options: any,
  lifetimesKey: string,
  args?: any[]
) {
  if (options && options[lifetimesKey]) {
    return options[lifetimesKey].apply(this, args);
  }
  if (!this[`$${lifetimesKey}`]) {
    return;
  }

  if (this[`$${lifetimesKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimesKey}`);
  }

  return this[`$${lifetimesKey}`][0].apply(this, args);
}

function methodOn(hook: Function, lifetimesKey: string, context: Context) {
  if (!context) {
    return;
  }

  if (!context[`$${lifetimesKey}`]) {
    context[`$${lifetimesKey}`] = [];
  }

  context[`$${lifetimesKey}`].push(hook.bind(context));
}

/**
 * 使用 Hook 函数并将结果与上下文关联
 * @param context - 当前上下文
 * @param hook - Hook 函数
 */
function useHook<T>(context: Context, hook?: T) {
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
    // 是app，直接给当前实例赋值
    if (getCurrentPages().length === 0) {
      if (result) {
        for (let key in result) {
          context[key] = result[key];
        }
      }
      return;
    }

    const { fields, methods } = splitFieldsAndMethods(result);

    Object.keys(methods).forEach((key) => {
      context[key] = methods[key];
    });

    context.setData(fields);
  };
  const result = proxyRefs((hook as Function).call(context));
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
export function createApp(
  hook?:
    | AppHook
    | {
        setup?: AppHook;
      }
) {
  if (!hook) {
    return App({});
  }
  let options = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;
    options = other || {};
    hook = setup;
  }

  App({
    ...options,
    // 生命周期回调函数
    onLaunch(object) {
      hook && useHook<AppHook>(this, hook as AppHook);
      methodEmit.call(this, options, "onLaunch", [object]);
    },
    onShow() {
      methodEmit.call(this, options, "onShow");
    },
    onHide() {
      methodEmit.call(this, options, "onHide");
    },
    onError(error) {
      methodEmit.call(this, options, "onError", [error]);
    },
    onPageNotFound(object) {
      methodEmit.call(this, options, "onPageNotFound", [object]);
    },
  });
}

export const useApp = getApp;

export const onLaunch = (hook: Function) =>
  methodOn(hook, "onLaunch", useApp());
export const onError = (hook: Function) => methodOn(hook, "onError", useApp());
export const onPageNotFound = (hook: Function) =>
  methodOn(hook, "onPageNotFound", useApp());
export const onUnhandledRejection = (hook: Function) =>
  methodOn(hook, "onUnhandledRejection", useApp());

/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export function definePage(
  hook?:
    | PageHook
    | (WechatMiniprogram.Page.Options<
        WechatMiniprogram.Page.DataOption,
        WechatMiniprogram.Page.CustomOption
      > & { setup?: PageHook })
) {
  if (!hook) {
    return Page({});
  }

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
      hook && useHook<PageHook>(this, hook as PageHook);
      methodEmit.call(this, options, "onLoad", [query]);
    },
    onShow() {
      methodEmit.call(this, options, "onShow");
    },
    onReady() {
      methodEmit.call(this, options, "onReady");
    },
    onHide() {
      methodEmit.call(this, options, "onHide");
    },
    onUnload() {
      methodEmit.call(this, options, "onUnload");
    },
    onRouteDone() {
      methodEmit.call(this, options, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh() {
      methodEmit.call(this, options, "onPullDownRefresh");
    },
    onReachBottom() {
      methodEmit.call(this, options, "onReachBottom");
    },
    onPageScroll(object) {
      methodEmit.call(this, options, "onPageScroll", [object]);
    },
    onAddToFavorites(object) {
      return methodOnce.call(this, options, "onAddToFavorites", [object]);
    },
    onShareAppMessage(event) {
      return methodOnce.call(this, options, "onShareAppMessage", [event]);
    },
    onShareTimeline() {
      return methodOnce.call(this, options, "onShareTimeline");
    },
    onResize(event) {
      methodEmit.call(this, options, "onResize", [event]);
    },
    onTabItemTap(object) {
      methodEmit.call(this, options, "onTabItemTap", [object]);
    },
    onSaveExitState() {
      methodEmit.call(this, options, "onSaveExitState");
    },
  });
}

export const usePage = () => {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

export const onLoad = (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) =>
  methodOn(hook, "onLoad", usePage());
export const onShow = (hook: WechatMiniprogram.Page.ILifetime["onShow"]) =>
  methodOn(
    hook,
    "onShow",
    getCurrentPages().length === 0 ? useApp() : usePage()
  );
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  methodOn(hook, "onReady", usePage());
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  methodOn(
    hook,
    "onHide",
    getCurrentPages().length === 0 ? useApp() : usePage()
  );
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  methodOn(hook, "onUnload", usePage());
export const onRouteDone = (hook: () => void) =>
  methodOn(hook, "onRouteDone", usePage());
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => methodOn(hook, "onPullDownRefresh", usePage());
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => methodOn(hook, "onReachBottom", usePage());
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => methodOn(hook, "onPageScroll", usePage());
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => methodOn(hook, "onAddToFavorites", usePage());
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => methodOn(hook, "onShareAppMessage", usePage());
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => methodOn(hook, "onShareTimeline", usePage());
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  methodOn(hook, "onResize", usePage());
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => methodOn(hook, "onTabItemTap", usePage());
export const onSaveExitState = (hook: () => void) =>
  methodOn(hook, "onSaveExitState", usePage());

/**
 * 创建组件并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export function defineComponent(
  hook?:
    | ComponentHook
    | (WechatMiniprogram.Component.Options<
        WechatMiniprogram.Component.DataOption,
        {},
        WechatMiniprogram.Component.MethodOption,
        {},
        false
      > & {
        props?: ComponentProps;
        setup?: ComponentHook;
      })
) {
  if (!hook) {
    return Component({
      options: {
        virtualHost: true,
        styleIsolation: "apply-shared",
        multipleSlots: true,
      },
    });
  }

  let options: WechatMiniprogram.Component.Options<
    WechatMiniprogram.Component.DataOption,
    {},
    WechatMiniprogram.Component.MethodOption,
    {},
    false
  > = {};
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
  const optionsOptions = options.options;
  const getOptionsValue = (key: string, defaultValue: string | boolean) => {
    if (
      !optionsOptions ||
      typeof (optionsOptions as any)[key] === "undefined"
    ) {
      return defaultValue;
    }

    return (optionsOptions as any)[key];
  };

  Component({
    ...options,
    options: {
      ...optionsOptions,
      virtualHost: getOptionsValue("virtualHost", true),
      styleIsolation: getOptionsValue("styleIsolation", "apply-shared"),
      multipleSlots: getOptionsValue("multipleSlots", true),
    },
    properties,
    lifetimes: {
      attached() {
        const emit = (key: string, value: any) => {
          this.triggerEvent(key, { value });
        };
        this.emit = emit;
        hook &&
          useHook<ComponentHook>(
            this,
            (hook as ComponentHook).bind(this, this.properties, this)
          );
        methodEmit.call(this, options, "attached");
      },
      ready() {
        methodEmit.call(this, options, "ready");
      },
      moved() {
        methodEmit.call(this, options, "moved");
      },
      detached() {
        methodEmit.call(this, options, "detached");
      },
      error(err: WechatMiniprogram.Error) {
        methodEmit.call(this, options, "error", [err]);
      },
    },
  });
}

export const useComponent = () => _context;

export const attached = (
  hook: WechatMiniprogram.Component.Lifetimes["attached"]
) => methodOn(hook, "attached", useComponent());
export const ready = (hook: WechatMiniprogram.Component.Lifetimes["ready"]) =>
  methodOn(hook, "ready", useComponent());
export const moved = (hook: WechatMiniprogram.Component.Lifetimes["moved"]) =>
  methodOn(hook, "moved", useComponent());
export const detached = (
  hook: WechatMiniprogram.Component.Lifetimes["detached"]
) => methodOn(hook, "detached", useComponent());
export const error = (hook: WechatMiniprogram.Component.Lifetimes["error"]) =>
  methodOn(hook, "error", useComponent());

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
