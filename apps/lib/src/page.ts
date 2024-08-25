import { effectScope, type EffectScope } from "@vue/reactivity";
import { deepToRaw, deepWatch, type PropType, setInstance } from "./shared";
import { isFunction } from "./utils";
import { lifetimeEmit, lifetimeEmitOnce } from "./lifetime";
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
  this: PageInstance,
  query: TQuery,
  context: PageContext
) => Record<string, any> | void;

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
      setInstance(this);
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
      setInstance(null);
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
