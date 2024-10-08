import { effectScope, type EffectScope } from "@vue/reactivity";
import { deepToRaw, deepWatch, setInstance } from "./shared";
import { isFunction } from "./utils";
import { lifetimeEmit, lifetimeEmitOnce } from "./lifetime";
import { onAppLaunched } from "./app";
import {
  _queries,
  createQuery,
  setQueries,
  type PageQueries,
  type PageQuery,
} from "./router";
import { flushPostFlushCbs } from "./scheduler";

// 页面实例
export type PageInstance = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption & {
    $scope: EffectScope;
    $query: Record<string, any>;
    $context: {};
  }
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

// 页面setup函数
export type PageHook<TQuery> = (
  this: PageInstance,
  query: TQuery,
  context: PageContext
) => Record<string, any> | void;

// 页面setup第一个参数，query

// 页面setup第二参数，context
export type PageContext = WechatMiniprogram.Page.InstanceProperties &
  Omit<
    WechatMiniprogram.Page.InstanceMethods<Record<string, any>>,
    "setData" | "groupSetData" | "hasBehavior"
  >;

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

  return Page({
    ...otherOptions,
    // 生命周期回调函数
    onLoad(this: PageInstance, query) {
      // console.log("🚀 ~ onLoad ~ onLoad:");
      onAppLaunched(() => {
        setInstance(this);
        setQueries(queries);
        this.$scope = effectScope();

        this.$query = createQuery(query, queries);

        this.$context = {};
        this.$scope.run(() => {
          const bindings = hook.call(this, this.$query, this.$context);
          if (bindings !== undefined) {
            let data: Record<string, unknown> | undefined = {};
            Object.keys(bindings).forEach((key) => {
              const value = bindings[key];
              if (isFunction(value)) {
                this[key] = value;
                return;
              }

              data[key] = deepToRaw(value);
              deepWatch.call(this, key, value);
            });
            if (Object.keys(data).length !== 0) {
              this.setData(data, flushPostFlushCbs);
            }
          }
          lifetimeEmit(this, options, "onLoad", query);
        });
        setQueries({});
        setInstance(null);
      });
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
      return lifetimeEmitOnce(this, options, "onAddToFavorites", object);
    },
    onShareAppMessage(this: PageInstance, event) {
      return lifetimeEmitOnce(this, options, "onShareAppMessage", event);
    },
    onShareTimeline(this: PageInstance) {
      return lifetimeEmitOnce(this, options, "onShareTimeline");
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

export const getCurrentPage = () => {
  const pageList = getCurrentPages();
  return pageList && pageList[pageList.length - 1];
};
