import { isFunction } from "./utils";
import { effectScope } from "@vue/reactivity";
import { deepToRaw, deepWatch } from "./shared";
import "miniprogram-api-typings";

export type AppHook = () => Record<string, any>;

type IAnyObject = Record<string, any>;

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

export type PageQuery<T> = T;

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

export type ComponentOptionsProps = {
  [key: string]: ComponentPropType | ComponentPropDefinition<ComponentPropType>;
};

export type ComponentProps<T> = T;

export type ComponentContext<T> =
  WechatMiniprogram.Component.InstanceProperties &
    Omit<
      WechatMiniprogram.Component.InstanceMethods<Record<string, any>>,
      "setData" | "groupSetData" | "hasBehavior"
    > &
    T;

export type PageContext = WechatMiniprogram.Page.InstanceProperties &
  Omit<
    WechatMiniprogram.Page.InstanceMethods<Record<string, any>>,
    "setData" | "groupSetData" | "hasBehavior"
  >;

export type PageHook<T> = (
  props: PageQuery<T>,
  context: PageContext
) => Record<string, any>;

export type ComponentHook<T, E> = (
  props: ComponentProps<T>,
  context: ComponentContext<E>
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

  const eventBackMap = {
    onLoad: "onUnload",
    onShow: "onHide",
    attached: "detached",
  };
  const lifetimesBackKey =
    eventBackMap[lifetimesKey as keyof typeof eventBackMap];

  instance[`$${lifetimesKey}`].forEach((fn: Function) => {
    // 反面有没有对应的off
    if (lifetimesBackKey) {
      const backFn =
        instance[`$${lifetimesBackKey}`] &&
        instance[`$${lifetimesBackKey}`].find((x: any) => x.front === fn);

      if (backFn) {
        backFn();
      }
    }

    const off = fn(...args);
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

/**
 * 获取属性并将其转换为组件属性格式
 * @param props - 组件的属性
 * @returns 转换后的属性对象
 */
function getProperties<T>(props?: ComponentProps<T>) {
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
export function definePage<T extends IAnyObject>(
  hook?:
    | PageHook<T>
    | (WechatMiniprogram.Page.Options<
        WechatMiniprogram.Page.DataOption,
        WechatMiniprogram.Page.CustomOption
      > & { setup: PageHook<T> })
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

  if (!hook) {
    return Page(options);
  }

  Page({
    ...options,
    // 生命周期回调函数
    onLoad(query) {
      _currentPage = this;
      this.$scope = effectScope();

      this.$query = query;

      this.$context = {
        is: this.is,
        id: this.id,
        dataset: this.dataset,
        exitState: this.exitState,
        router: this.router,
        pageRouter: this.pageRouter,
        renderer: this.renderer,
        triggerEvent: this.triggerEvent.bind(this),
        createSelectorQuery: this.createSelectorQuery.bind(this),
        createIntersectionObserver: this.createIntersectionObserver.bind(this),
        createMediaQueryObserver: this.createMediaQueryObserver.bind(this),
        selectComponent: this.selectComponent.bind(this),
        selectAllComponents: this.selectAllComponents.bind(this),
        selectOwnerComponent: this.selectOwnerComponent.bind(this),
        getRelationNodes: this.getRelationNodes.bind(this),
        getTabBar: this.getTabBar.bind(this),
        getPageId: this.getPageId.bind(this),
        animate: this.animate.bind(this),
        clearAnimation: this.clearAnimation.bind(this),
        getOpenerEventChannel: this.getOpenerEventChannel.bind(this),
        applyAnimatedStyle: this.applyAnimatedStyle.bind(this),
        clearAnimatedStyle: this.clearAnimatedStyle.bind(this),
        setUpdatePerformanceListener:
          this.setUpdatePerformanceListener.bind(this),
        getPassiveEvent: this.getPassiveEvent.bind(this),
        setPassiveEvent: this.setPassiveEvent.bind(this),
      };
      this.$scope.run(() => {
        const bindings = hook(this.$query, this.$context);
        if (bindings !== undefined) {
          Object.keys(bindings).forEach((key) => {
            const value = bindings[key];
            if (isFunction(value)) {
              this[key] = value;
              return;
            }

            this.setData({ [key]: deepToRaw(value) });
            deepWatch(this, key, value);
          });
        }
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
      if (this.$scope) {
        this.$scope.stop();
      }
      // 删除自己创建的变量
      Object.keys(this).forEach((key) => {
        if (/^\$/.test(key)) {
          delete this[key];
        }
      });
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
export function defineComponent<T extends IAnyObject, E extends IAnyObject>(
  hook?:
    | ComponentHook<T, E>
    | (WechatMiniprogram.Component.Options<
        WechatMiniprogram.Component.DataOption,
        {},
        WechatMiniprogram.Component.MethodOption,
        {},
        false
      > & {
        props?: ComponentOptionsProps;
        setup: ComponentHook<T, E>;
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

  if (!hook) {
    return Component({
      ...options,
      options: {
        ...optionsOptions,
        virtualHost: getOptionsValue("virtualHost", true),
        styleIsolation: getOptionsValue("styleIsolation", "apply-shared"),
        multipleSlots: getOptionsValue("multipleSlots", true),
      },
      properties,
    });
  }

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
        this.$scope = effectScope();
        //@ts-expect-error 增加的props
        this.$prop = new Proxy(this.properties, {
          set: (target, key, value, receiver) => {
            this.setData({
              [key]: value,
            });
            // 发送自定义事件，传递数据
            this.triggerEvent(key as string, { value });
            return Reflect.set(target, key, value, receiver);
          },
        });

        //@ts-expect-error 增加context
        this.$context = {
          is: this.is,
          id: this.id,
          dataset: this.dataset,
          exitState: this.exitState,
          router: this.router,
          pageRouter: this.pageRouter,
          renderer: this.renderer,
          triggerEvent: this.triggerEvent.bind(this),
          createSelectorQuery: this.createSelectorQuery.bind(this),
          createIntersectionObserver:
            this.createIntersectionObserver.bind(this),
          createMediaQueryObserver: this.createMediaQueryObserver.bind(this),
          selectComponent: this.selectComponent.bind(this),
          selectAllComponents: this.selectAllComponents.bind(this),
          selectOwnerComponent: this.selectOwnerComponent.bind(this),
          getRelationNodes: this.getRelationNodes.bind(this),
          getTabBar: this.getTabBar.bind(this),
          getPageId: this.getPageId.bind(this),
          animate: this.animate.bind(this),
          clearAnimation: this.clearAnimation.bind(this),
          getOpenerEventChannel: this.getOpenerEventChannel.bind(this),
          applyAnimatedStyle: this.applyAnimatedStyle.bind(this),
          clearAnimatedStyle: this.clearAnimatedStyle.bind(this),
          setUpdatePerformanceListener:
            this.setUpdatePerformanceListener.bind(this),
          getPassiveEvent: this.getPassiveEvent.bind(this),
          setPassiveEvent: this.setPassiveEvent.bind(this),
          emit: (key: string, value: any) => {
            this.triggerEvent(key, { value });
          },
        } as ComponentContext<E>;
        //@ts-expect-error 增加作用域
        this.$scope.run(() => {
          //@ts-expect-error 不要报错
          const bindings = hook(this.$prop, this.$context);
          if (bindings !== undefined) {
            Object.keys(bindings).forEach((key) => {
              const value = bindings[key];
              if (isFunction(value)) {
                this[key] = value;
                return;
              }

              this.setData({ [key]: deepToRaw(value) });
              deepWatch(this, key, value);
            });
          }

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
        if (this.$scope) {
          //@ts-expect-error 增加作用域
          this.$scope.stop();
        }

        // 删除自己创建的变量
        Object.keys(this).forEach((key) => {
          if (/^\$/.test(key)) {
            delete this[key];
          }
        });
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
