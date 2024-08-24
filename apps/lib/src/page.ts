import { effectScope } from "@vue/reactivity";
import { deepToRaw, deepWatch, type PropType } from "./shared";
import { isFunction } from "./utils";
import { lifetimeEmit, lifetimeOnce, lifetimeOn } from "./lifetime";
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

let _currentPage: PageInstance | null = null;
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
        lifetimeEmit(this, options, "onLoad", query);
      });
      _currentPage = null;
    },
    onShow(this: PageInstance) {
      lifetimeEmit(this, options, "onShow");
    },
    onReady(this: PageInstance) {
      lifetimeEmit(this, options, "onReady");
    },
    onHide(this: PageInstance) {
      lifetimeEmit(this, options, "onHide");
    },
    onUnload(this: PageInstance) {
      lifetimeEmit(this, options, "onUnload");
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
      lifetimeEmit(this, options, "onRouteDone");
    },
    // 页面事件处理函数
    onPullDownRefresh(this: PageInstance) {
      lifetimeEmit(this, options, "onPullDownRefresh");
    },
    onReachBottom(this: PageInstance) {
      lifetimeEmit(this, options, "onReachBottom");
    },
    onPageScroll(this: PageInstance, event) {
      lifetimeEmit(this, options, "onPageScroll", event);
    },
    onAddToFavorites(this: PageInstance, object) {
      return lifetimeOnce(this, options, "onAddToFavorites", object);
    },
    onShareAppMessage(this: PageInstance, event) {
      return lifetimeOnce(this, options, "onShareAppMessage", event);
    },
    onShareTimeline(this: PageInstance) {
      return lifetimeOnce(this, options, "onShareTimeline");
    },
    onResize(this: PageInstance, event) {
      lifetimeEmit(this, options, "onResize", event);
    },
    onTabItemTap(this: PageInstance, object) {
      lifetimeEmit(this, options, "onTabItemTap", object);
    },
    onSaveExitState(this: PageInstance) {
      lifetimeEmit(this, options, "onSaveExitState");
    },
  });
};

export const usePage = () => {
  return _currentPage;
};

export const onLoad = (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) =>
  lifetimeOn(usePage(), "onLoad", hook);
export const onShow = (hook: WechatMiniprogram.Page.ILifetime["onShow"]) =>
  lifetimeOn(usePage(), "onShow", hook);
export const onReady = (hook: WechatMiniprogram.Page.ILifetime["onReady"]) =>
  lifetimeOn(usePage(), "onReady", hook);
export const onHide = (hook: WechatMiniprogram.Page.ILifetime["onHide"]) =>
  lifetimeOn(usePage(), "onHide", hook);
export const onUnload = (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) =>
  lifetimeOn(usePage(), "onUnload", hook);
export const onRouteDone = (hook: () => void) =>
  lifetimeOn(usePage(), "onRouteDone", hook);
export const onPullDownRefresh = (
  hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]
) => lifetimeOn(usePage(), "onPullDownRefresh", hook);
export const onReachBottom = (
  hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]
) => lifetimeOn(usePage(), "onReachBottom", hook);
export const onPageScroll = (
  hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]
) => lifetimeOn(usePage(), "onPageScroll", hook);
export const onAddToFavorites = (
  hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]
) => lifetimeOn(usePage(), "onAddToFavorites", hook);
export const onShareAppMessage = (
  hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]
) => lifetimeOn(usePage(), "onShareAppMessage", hook);
export const onShareTimeline = (
  hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]
) => lifetimeOn(usePage(), "onShareTimeline", hook);
export const onResize = (hook: WechatMiniprogram.Page.ILifetime["onResize"]) =>
  lifetimeOn(usePage(), "onResize", hook);
export const onTabItemTap = (
  hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]
) => lifetimeOn(usePage(), "onTabItemTap", hook);
export const onSaveExitState = (hook: () => void) =>
  lifetimeOn(usePage(), "onSaveExitState", hook);
