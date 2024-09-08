import { type PropType } from "./shared";
// export type EventChannel = {};
export type PushToOption =
  | string
  | (Omit<WechatMiniprogram.NavigateToOption, "url"> &
      (
        | {
            url: string;
          }
        | {
            path: string;
            query?: Record<string, any>;
          }
      ));

export type ReplaceToOption =
  | string
  | (Omit<WechatMiniprogram.RedirectToOption, "url"> &
      (
        | {
            url: string;
          }
        | {
            path: string;
            query?: Record<string, any>;
          }
      ));

export type BackToOption = WechatMiniprogram.NavigateBackOption;

export type SwitchTabOption =
  | string
  | (Omit<WechatMiniprogram.SwitchTabOption, "url"> &
      (
        | {
            url: string;
          }
        | {
            path: string;
            query?: Record<string, any>;
          }
      ));

export type ReLaunchToOption =
  | string
  | (Omit<WechatMiniprogram.ReLaunchOption, "url"> &
      (
        | {
            url: string;
          }
        | {
            path: string;
            query?: Record<string, any>;
          }
      ));

type PageQueryValue<T> = T extends PropType<infer U>
  ? U
  : T extends null
  ? any
  : undefined;

export type PageQuery<T> = {
  [K in keyof T]?: PageQueryValue<T[K]>;
};

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

const queryString = (query: Record<string, any>) => {
  if (!query) {
    return "";
  }
  return Object.keys(query)
    .map((key) => {
      let val = query[key];
      if (typeof query[key] === "object") {
        val = encodeURIComponent(JSON.stringify(query[key]));
      }
      return `${key}=${val}`;
    })
    .join("&");
};
export const useRouter = () => {
  return {
    push: (to: PushToOption) => {
      if (typeof to === "string") {
        return wx.navigateTo({ url: to });
      }

      let url;

      if ("path" in to) {
        if (to.query) {
          url = `${to.path}?${queryString(to.query)}`;
        } else {
          url = to.path;
        }
      } else {
        url = to.url;
      }

      return wx.navigateTo({
        url,
        ...to,
      });
    },
    replace: (to: ReplaceToOption) => {
      if (typeof to === "string") {
        return wx.redirectTo({ url: to });
      }

      let url;

      if ("path" in to) {
        if (to.query) {
          url = `${to.path}?${queryString(to.query)}`;
        } else {
          url = to.path;
        }
      } else {
        url = to.url;
      }

      return wx.redirectTo({
        url,
        ...to,
      });
    },
    go: (steps: number) => {
      if (steps > 0) {
        console.warn("微信小程序不支持前进历史记录");
        return;
      }
      return wx.navigateBack({ delta: Math.abs(steps) });
    },
    back: (to: BackToOption) => {
      return wx.navigateBack(to);
    },
    switchTab: (to: SwitchTabOption) => {
      if (typeof to === "string") {
        return wx.switchTab({ url: to });
      }

      let url;

      if ("path" in to) {
        if (to.query) {
          url = `${to.path}?${queryString(to.query)}`;
        } else {
          url = to.path;
        }
      } else {
        url = to.url;
      }

      return wx.switchTab({
        url,
        ...to,
      });
    },
    reLaunch: (to: ReLaunchToOption) => {
      if (typeof to === "string") {
        return wx.reLaunch({ url: to });
      }

      let url;

      if ("path" in to) {
        if (to.query) {
          url = `${to.path}?${queryString(to.query)}`;
        } else {
          url = to.path;
        }
      } else {
        url = to.url;
      }

      return wx.reLaunch({
        url,
        ...to,
      });
    },
  };
};

export const useRoute = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1]; // 获取当前页面实例
  return {
    path: currentPage.route,
    query: createQuery(currentPage.options, _queries),
  };
};

export let _queries: PageQuery<{}> = {};
export const setQueries = <TQueries extends PageQueries<TQueries>>(
  queries: TQueries
) => {
  _queries = queries;
};

export const createQuery = <TQueries extends PageQueries<TQueries>>(
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
