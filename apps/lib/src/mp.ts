import { isFunction } from "./utils";
import { effectScope } from "@vue/reactivity";
import { deepToRaw, deepWatch } from "./shared";
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

export type ComponentContext = {
  emit?(key: string, val: any): void;
};

export type ComponentHook = (
  props: ComponentProps,
  context: ComponentContext
) => Record<string, any>;

export type AppInstance = Record<string, any>;

export type PageOptions = WechatMiniprogram.Page.Options<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;
export type PageInstance = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

export type ComponentOptions = WechatMiniprogram.Component.Options<
  WechatMiniprogram.Component.DataOption,
  {},
  WechatMiniprogram.Component.MethodOption,
  {},
  false
>;
export type ComponentInstance = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.Component.DataOption,
  {},
  WechatMiniprogram.Component.MethodOption,
  {},
  false
>;

let _currentPage: PageInstance | null = null;
let _currentComponent: ComponentInstance | null = null;

function methodEmit(
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimesKey: string,
  ...args: any[]
) {
  if (options && options[lifetimesKey]) {
    options[lifetimesKey].apply(instance, args);
  }
  if (!instance[`$${lifetimesKey}`]) {
    return;
  }

  instance[`$${lifetimesKey}`].forEach((fn: Function) => {
    fn(...args);
  });
}

function methodOnce(
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimesKey: string,
  ...args: any[]
) {
  if (options && options[lifetimesKey]) {
    return options[lifetimesKey].apply(instance, args);
  }
  if (!instance[`$${lifetimesKey}`]) {
    return;
  }

  if (instance[`$${lifetimesKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimesKey}`);
  }

  return instance[`$${lifetimesKey}`][0](...args);
}

function methodOn(
  instance: PageInstance | ComponentInstance | null,
  lifetimesKey: string,
  hook: Function
) {
  if (!instance) {
    return;
  }

  if (!instance[`$${lifetimesKey}`]) {
    instance[`$${lifetimesKey}`] = [];
  }

  instance[`$${lifetimesKey}`].push(hook);
}

function createProps(
  instance: PageInstance | ComponentInstance,
  props: Record<string, any>
) {
  return new Proxy(props, {
    get(target, key: string, _receiver) {
      let value = instance.data[key];

      if (
        value === undefined &&
        target[key] &&
        typeof target[key].value !== "undefined"
      ) {
        value = target[key].value;
      }

      return value;
    },
    set: function (target, key, value, receiver) {
      instance.setData({
        [key]: value,
      });
      // 发送自定义事件，传递数据
      instance.triggerEvent(key as string, { value });
      return Reflect.set(target, key, value, receiver);
    },
  });
}

/**
 * 使用 Hook 函数并将结果与上下文关联
 * @param context - 当前上下文
 * @param hook - Hook 函数
 */
function useHook(
  instance: PageInstance | ComponentInstance,
  hook: ComponentHook,
  props: ComponentProps,
  context: ComponentContext
) {
  const bindings = hook(props, context);
  if (bindings !== undefined) {
    Object.keys(bindings).forEach((key) => {
      const value = bindings[key];
      if (isFunction(value)) {
        instance[key] = value;
        return;
      }

      instance.setData({ [key]: deepToRaw(value) });
      deepWatch(instance, key, value);
    });
  }
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
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export function definePage(
  hook?:
    | ComponentHook
    | (WechatMiniprogram.Page.Options<
        WechatMiniprogram.Page.DataOption,
        WechatMiniprogram.Page.CustomOption
      > & { setup?: ComponentHook })
) {
  if (!hook) {
    return Page({});
  }

  let options: PageOptions = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;
    options = other || {};
    hook = setup;
  }

  Page({
    ...options,
    // 生命周期回调函数
    onLoad(query) {
      _currentPage = this;
      this.__scope__ = effectScope();
      this.__scope__.run(() => {
        this.__props__ = createProps(this, {});

        hook &&
          useHook(this, hook as ComponentHook, this.__props__, {
            emit: (key: string, value: any) => {
              this.triggerEvent(key, { value });
            },
          });
        methodEmit(this, options, "onLoad", query);
      });
      _currentPage = null;
    },
    onShow() {
      methodEmit(this, options, "onShow");
    },
    onReady() {
      methodEmit(this, options, "onReady");
    },
    onHide() {
      methodEmit(this, options, "onHide");
    },
    onUnload() {
      methodEmit(this, options, "onUnload");
      if (this.__scope__) {
        this.__scope__.stop();
      }
      Object.keys(this).forEach((key) => {
        delete this[key];
      });
      console.log("onUnload", this);
    },
    onRouteDone() {
      methodEmit(this, options, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh() {
      methodEmit(this, options, "onPullDownRefresh");
    },
    onReachBottom() {
      methodEmit(this, options, "onReachBottom");
    },
    onPageScroll(event) {
      methodEmit(this, options, "onPageScroll", event);
    },
    onAddToFavorites(object) {
      return methodOnce(this, options, "onAddToFavorites", object);
    },
    onShareAppMessage(event) {
      return methodOnce(this, options, "onShareAppMessage", event);
    },
    onShareTimeline() {
      return methodOnce(this, options, "onShareTimeline");
    },
    onResize(event) {
      methodEmit(this, options, "onResize", event);
    },
    onTabItemTap(object) {
      methodEmit(this, options, "onTabItemTap", object);
    },
    onSaveExitState() {
      methodEmit(this, options, "onSaveExitState");
    },
  });
}

export const usePage = () => {
  return _currentPage;
};

export const onLoad = (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) =>
  methodOn(usePage(), "onLoad", hook);
export const onShow = (hook: WechatMiniprogram.Page.ILifetime["onShow"]) =>
  methodOn(usePage(), "onShow", hook);
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  methodOn(usePage(), "onReady", hook);
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  methodOn(usePage(), "onHide", hook);
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  methodOn(usePage(), "onUnload", hook);
export const onRouteDone = (hook: () => void) =>
  methodOn(usePage(), "onRouteDone", hook);
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => methodOn(usePage(), "onPullDownRefresh", hook);
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => methodOn(usePage(), "onReachBottom", hook);
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => methodOn(usePage(), "onPageScroll", hook);
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => methodOn(usePage(), "onAddToFavorites", hook);
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => methodOn(usePage(), "onShareAppMessage", hook);
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => methodOn(usePage(), "onShareTimeline", hook);
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  methodOn(usePage(), "onResize", hook);
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => methodOn(usePage(), "onTabItemTap", hook);
export const onSaveExitState = (hook: () => void) =>
  methodOn(usePage(), "onSaveExitState", hook);

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

  let options: ComponentOptions = {};
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
        _currentComponent = this;
        //@ts-expect-error 增加作用域
        this.__scope__ = effectScope();
        //@ts-expect-error 增加作用域
        this.__scope__.run(() => {
          //@ts-expect-error 增加的props
          this.__props__ = createProps(this, properties);
          hook &&
            //@ts-expect-error 增加的props
            useHook(this, hook as ComponentHook, this.__props__, {
              emit: (key: string, value: any) => {
                this.triggerEvent(key, { value });
              },
            });
          methodEmit(this, options, "attached");
        });

        _currentComponent = null;
      },
      ready() {
        methodEmit(this, options, "ready");
      },
      moved() {
        methodEmit(this, options, "moved");
      },
      detached() {
        methodEmit(this, options, "detached");
        if (this.__scope__) {
          //@ts-expect-error 增加作用域
          this.__scope__.stop();
        }
        Object.keys(this).forEach((key) => {
          delete this[key];
        });
        console.log("detached", this);
      },
      error(err: WechatMiniprogram.Error) {
        methodEmit(this, options, "error", err);
      },
    },
  });
}

export const useComponent = () => _currentComponent;

export const attached = (
  hook: WechatMiniprogram.Component.Lifetimes["attached"]
) => methodOn(useComponent(), "attached", hook);
export const ready = (hook: WechatMiniprogram.Component.Lifetimes["ready"]) =>
  methodOn(useComponent(), "ready", hook);
export const moved = (hook: WechatMiniprogram.Component.Lifetimes["moved"]) =>
  methodOn(useComponent(), "moved", hook);
export const detached = (
  hook: WechatMiniprogram.Component.Lifetimes["detached"]
) => methodOn(useComponent(), "detached", hook);
export const error = (hook: WechatMiniprogram.Component.Lifetimes["error"]) =>
  methodOn(useComponent(), "error", hook);
