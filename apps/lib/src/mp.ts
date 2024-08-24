import { isFunction } from "./utils";
import { effectScope, shallowReactive } from "@vue/reactivity";
import { deepToRaw, deepWatch } from "./shared";
import "miniprogram-api-typings";

export type AppHook = () => Record<string, any>;

// 定义 PropType 辅助类型
export type PropType<T> = () => T;

// 页面实例
export type PageInstance = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

// 页面配置
export type PageOptions = WechatMiniprogram.Page.Options<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

// type PageQueriesType =
//   | StringConstructor
//   | NumberConstructor
//   | BooleanConstructor
//   | ArrayConstructor
//   | ObjectConstructor
//   | null;

type PageQueriesValue<T> = T extends {
  type: PropType<infer U>;
}
  ? {
      type: PropType<U>;
      formatter?: (value: string) => U;
    }
  : T extends PropType<infer U>
  ? PropType<U>
  : undefined;

export type PageQueries<T> = {
  [K in keyof T]?: PageQueriesValue<T[K]>;
};

// 页面setup函数
export type PageHook<TQuery> = (
  query: TQuery,
  context: PageContext
) => Record<string, any>;

type PageQueryValue<T> = T extends PropType<infer U>
  ? U
  : T extends null
  ? any
  : undefined;

// 页面setup第一个参数，query
export type PageQuery<T> = {
  [K in keyof T]?: PageQueryValue<T[K]>;
};

// 页面setup第二参数，context
export type PageContext = WechatMiniprogram.Page.InstanceProperties &
  Omit<
    WechatMiniprogram.Page.InstanceMethods<Record<string, any>>,
    "setData" | "groupSetData" | "hasBehavior"
  >;

// 组件实例
export type ComponentInstance = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.Component.DataOption,
  {},
  WechatMiniprogram.Component.MethodOption,
  {},
  false
>;

// 组件配置
export type ComponentOptions = WechatMiniprogram.Component.Options<
  WechatMiniprogram.Component.DataOption,
  {},
  WechatMiniprogram.Component.MethodOption,
  {},
  false
>;

// TODO结合兼容
// type ComponentPropertiesType =
//   | StringConstructor
//   | NumberConstructor
//   | BooleanConstructor
//   | ArrayConstructor
//   | ObjectConstructor
//   | null;

type ComponentPropertiesValue<T> = T extends {
  type: null;
}
  ? {
      type: null;
      optionalTypes?: Array<PropType<any>>;
      value?: any;
      observer?: (newVal: any, oldVal: any) => void;
    }
  : T extends {
      type: PropType<infer U>;
      optionalTypes?: Array<PropType<any>>;
    }
  ? {
      type: PropType<U>;
      optionalTypes?: Array<PropType<any>>;
      value?:
        | U
        | (T extends { optionalTypes: (infer O)[] }
            ? ComponentPropsValue<O>
            : never);
      observer?: (
        newVal:
          | U
          | (T extends { optionalTypes: (infer O)[] }
              ? ComponentPropsValue<O>
              : never),
        oldVal:
          | U
          | (T extends { optionalTypes: (infer O)[] }
              ? ComponentPropsValue<O>
              : never)
      ) => void;
    }
  : T extends {
      type: PropType<infer U>;
    }
  ? {
      type: PropType<U>;
      value?: U;
      observer?: (newVal: U, oldVal: U) => void;
    }
  : T extends null
  ? null
  : T extends PropType<infer U>
  ? PropType<U>
  : undefined;

export type ComponentProperties<T> = {
  [K in keyof T]?: ComponentPropertiesValue<T[K]>;
};

// 组件setup函数
export type ComponentHook<TComponentProps, TComponentContext> = (
  props: TComponentProps,
  context: TComponentContext
) => Record<string, any>;

// 更新 `ExtractPropType` 类型以处理 `optionalTypes`
type ComponentPropsValue<T> = T extends {
  type: PropType<infer U>;
  optionalTypes?: Array<PropType<any>>;
}
  ?
      | U
      | (T extends { optionalTypes: (infer O)[] }
          ? ComponentPropsValue<O>
          : never)
  : T extends { type: PropType<infer U> }
  ? U
  : T extends PropType<infer U>
  ? U
  : T extends null
  ? any
  : undefined;

// 组件setup第一个参数，props
export type ComponentProps<T> = {
  [K in keyof T]?: ComponentPropsValue<T[K]>;
};

type ComponentContextEmit<E> = <K extends keyof E>(
  event: K,
  ...args: E[K] extends (...args: infer P) => any ? P : never
) => void;

// 组件setup第二参数，context
export type ComponentContext<TEmits> = {
  emit: ComponentContextEmit<TEmits>;
};

let _currentPage: PageInstance | null = null;
let _currentComponent: ComponentInstance | null = null;

const methodEmit = (
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimesKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimesKey]) {
    options[lifetimesKey](...args);
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

const methodOnce = (
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimesKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimesKey]) {
    return options[lifetimesKey](...args);
  }
  if (!instance[`$${lifetimesKey}`]) {
    return;
  }

  if (instance[`$${lifetimesKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimesKey}`);
  }

  return instance[`$${lifetimesKey}`][0].apply(instance, args);
};

const methodOn = (
  instance: PageInstance | ComponentInstance | null,
  lifetimesKey: string,
  hook: Function
) => {
  if (!instance) {
    return;
  }

  if (!instance[`$${lifetimesKey}`]) {
    instance[`$${lifetimesKey}`] = [];
  }

  instance[`$${lifetimesKey}`].push(hook);
};

const createQuery = <TQueries extends PageQueries<TQueries>>(
  query: Record<string, string | undefined>,
  queries?: TQueries
) => {
  if (!queries) {
    return query;
  }

  let rtv: { [key: string]: any } = {};

  for (let key in query) {
    if (key in queries) {
      const val = query[key];
      const config: any = queries[key as keyof typeof queries];

      if (!config) {
        rtv[key] = val;
        break;
      }
      const type = config.type || config;

      const formatter = (val: string | undefined) => {
        if ("formatter" in config && config.formatter !== undefined) {
          return config.formatter(val);
        }

        if (type === Boolean) {
          return !!val;
        }

        if (type === Number) {
          return Number(val);
        }

        if (type === Object) {
          return val ? JSON.parse(decodeURIComponent(val)) : {};
        }

        if (type === Array) {
          return val ? JSON.parse(decodeURIComponent(val)) : [];
        }

        if (type === null) {
          return val;
        }

        if (type === String) {
          return val;
        }

        console.error("未知的·type·", type);

        return val;
      };

      rtv[key] = formatter(val);
      // 对数据转换
    } else {
      rtv[key] = query[key];
    }
  }

  return rtv as PageQuery<TQueries>;
};

/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export const definePage = <TQueries extends PageQueries<TQueries>>(
  hook?:
    | PageHook<PageQuery<TQueries>>
    | (PageOptions & {
        queries?: TQueries;
        setup?: PageHook<PageQuery<TQueries>>;
      })
) => {
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

  const { queries, ...otherOptions } = options;

  Page({
    ...otherOptions,
    // 生命周期回调函数
    onLoad(this: PageInstance, query) {
      _currentPage = this;
      this.$scope = effectScope();

      this.$query = createQuery(query, queries);

      this.$context = {};
      this.$scope.run(() => {
        const bindings = hook.call(this, this.$query, this.$context);
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
    onShow(this: PageInstance) {
      methodEmit(this, options, "onShow");
    },
    onReady(this: PageInstance) {
      methodEmit(this, options, "onReady");
    },
    onHide(this: PageInstance) {
      methodEmit(this, options, "onHide");
    },
    onUnload(this: PageInstance) {
      methodEmit(this, options, "onUnload");
      if (this.$scope) {
        this.$scope.stop();
      }
      // 手动销毁
      Object.keys(this).forEach((key) => {
        try {
          if (/^$/.test(key)) {
            delete this[key];
          }
        } catch (ex) {
          console.error("销毁异常", ex);
        }
      });
    },
    onRouteDone(this: PageInstance) {
      methodEmit(this, options, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh(this: PageInstance) {
      methodEmit(this, options, "onPullDownRefresh");
    },
    onReachBottom(this: PageInstance) {
      methodEmit(this, options, "onReachBottom");
    },
    onPageScroll(this: PageInstance, event) {
      methodEmit(this, options, "onPageScroll", event);
    },
    onAddToFavorites(this: PageInstance, object) {
      return methodOnce(this, options, "onAddToFavorites", object);
    },
    onShareAppMessage(this: PageInstance, event) {
      return methodOnce(this, options, "onShareAppMessage", event);
    },
    onShareTimeline(this: PageInstance) {
      return methodOnce(this, options, "onShareTimeline");
    },
    onResize(this: PageInstance, event) {
      methodEmit(this, options, "onResize", event);
    },
    onTabItemTap(this: PageInstance, object) {
      methodEmit(this, options, "onTabItemTap", object);
    },
    onSaveExitState(this: PageInstance) {
      methodEmit(this, options, "onSaveExitState");
    },
  });
};

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
export const defineComponent = <
  TProperties extends ComponentProperties<TProperties>,
  TEmits extends object = {}
>(
  hook?:
    | ComponentHook<ComponentProps<TProperties>, ComponentContext<TEmits>>
    | (ComponentOptions & {
        properties?: TProperties;
        emits?: TEmits;
        setup?: ComponentHook<
          ComponentProps<TProperties>,
          ComponentContext<TEmits>
        >;
      })
) => {
  if (!hook) {
    return Component({});
  }

  let options: ComponentOptions = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;

    options = other;
    hook = setup;
  }

  if (!hook) {
    return Component(options);
  }

  let properties: string[] | null = null;

  if (options.properties) {
    properties = Object.keys(options.properties);
  }

  if (properties) {
    if (options.observers === undefined) {
      options.observers = {};
    }

    properties.forEach((property) => {
      //@ts-expect-error 不要报错
      const originObserver = options.observers[property];
      //@ts-expect-error 不要报错
      options.observers[property] = function (
        this: ComponentInstance,
        value: any
      ) {
        // Observer executes before attached
        if (this.$props) {
          //@ts-expect-error 不要报错
          this.$props[property] = value;
        }

        if (originObserver !== undefined) {
          originObserver.call(this, value);
        }
      };
    });
  }

  Component({
    ...options,
    lifetimes: {
      attached(this: ComponentInstance) {
        _currentComponent = this;
        //@ts-expect-error 增加作用域
        this.$scope = effectScope();
        const rawProps: Record<string, any> = {};
        if (properties) {
          properties.forEach((property) => {
            rawProps[property] = this.data[property];
          });
        }
        //@ts-expect-error 增加的props
        this.$props = shallowReactive(rawProps);
        // this.$props = shallowReactive(
        //   new Proxy(this.properties, {
        //     set: (target, key, value, receiver) => {
        //       this.setData({
        //         [key]: value,
        //       });
        //       // 发送自定义事件，传递数据
        //       this.triggerEvent(key as string, { value });
        //       return Reflect.set(target, key, value, receiver);
        //     },
        //   })
        // );

        //@ts-expect-error 增加context
        this.$context = {
          emit: (key: string, value: any) => {
            this.triggerEvent(key, { value });
          },
        } as ComponentContext<TEmits>;
        //@ts-expect-error 增加作用域
        this.$scope.run(() => {
          //@ts-expect-error 不要报错
          const bindings = hook.call(this, this.$props, this.$context);
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
      ready(this: ComponentInstance) {
        methodEmit(this, options, "ready");
      },
      moved(this: ComponentInstance) {
        methodEmit(this, options, "moved");
      },
      detached(this: ComponentInstance) {
        methodEmit(this, options, "detached");
        if (this.$scope) {
          //@ts-expect-error 增加作用域
          this.$scope.stop();
        }

        // 手动销毁
        Object.keys(this).forEach((key) => {
          try {
            if (/^$/.test(key)) {
              delete this[key];
            }
          } catch (ex) {
            console.error("销毁异常", ex);
          }
        });
      },
      error(this: ComponentInstance, err: WechatMiniprogram.Error) {
        methodEmit(this, options, "error", err);
      },
    },
  });
};

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
