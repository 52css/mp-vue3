import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
import { type AppInstance } from "./app";
export declare const lifetimeEmit: (instance: PageInstance | ComponentInstance | AppInstance, options: any, lifetimeKey: string, ...args: any[]) => void;
export declare const lifetimeEmitOnce: (instance: PageInstance | ComponentInstance | AppInstance, options: any, lifetimeKey: string, ...args: any[]) => any;
export declare const lifetimeOn: (instance: PageInstance | ComponentInstance | AppInstance | null, lifetimeKey: string, hook: Function) => void;
export declare const onLoad: (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) => void;
export declare const onShow: (hook: WechatMiniprogram.Page.ILifetime["onShow"] | WechatMiniprogram.App.Instance<{}>["onShow"]) => void;
export declare const onReady: (hook: WechatMiniprogram.Page.ILifetime["onReady"]) => void;
export declare const onHide: (hook: WechatMiniprogram.Page.ILifetime["onHide"] | WechatMiniprogram.App.Instance<{}>["onHide"]) => void;
export declare const onUnload: (hook: WechatMiniprogram.Page.ILifetime["onUnload"]) => void;
export declare const onRouteDone: (hook: () => void) => void;
export declare const onPullDownRefresh: (hook: WechatMiniprogram.Page.ILifetime["onPullDownRefresh"]) => void;
export declare const onReachBottom: (hook: WechatMiniprogram.Page.ILifetime["onReachBottom"]) => void;
export declare const onPageScroll: (hook: WechatMiniprogram.Page.ILifetime["onPageScroll"]) => void;
export declare const onAddToFavorites: (hook: WechatMiniprogram.Page.ILifetime["onAddToFavorites"]) => void;
export declare const onShareAppMessage: (hook: WechatMiniprogram.Page.ILifetime["onShareAppMessage"]) => void;
export declare const onShareTimeline: (hook: WechatMiniprogram.Page.ILifetime["onShareTimeline"]) => void;
export declare const onResize: (hook: WechatMiniprogram.Page.ILifetime["onResize"]) => void;
export declare const onTabItemTap: (hook: WechatMiniprogram.Page.ILifetime["onTabItemTap"]) => void;
export declare const onSaveExitState: (hook: () => void) => void;
export declare const attached: (hook: WechatMiniprogram.Component.Lifetimes["attached"]) => void;
export declare const ready: (hook: WechatMiniprogram.Component.Lifetimes["ready"]) => void;
export declare const moved: (hook: WechatMiniprogram.Component.Lifetimes["moved"]) => void;
export declare const detached: (hook: WechatMiniprogram.Component.Lifetimes["detached"]) => void;
export declare const error: (hook: WechatMiniprogram.Component.Lifetimes["error"]) => void;
export declare const show: (hook: WechatMiniprogram.Component.PageLifetimes["show"]) => void;
export declare const hide: (hook: WechatMiniprogram.Component.PageLifetimes["hide"]) => void;
export declare const resize: (hook: WechatMiniprogram.Component.PageLifetimes["resize"]) => void;
export declare const routeDone: (hook: WechatMiniprogram.Component.PageLifetimes["routeDone"]) => void;
export declare const onLaunch: (hook: WechatMiniprogram.App.Instance<{}>["onLaunch"]) => void;
export declare const onError: (hook: WechatMiniprogram.App.Instance<{}>["onError"]) => void;
export declare const onPageNotFound: (hook: WechatMiniprogram.App.Instance<{}>["onPageNotFound"]) => void;
export declare const onUnhandledRejection: (hook: WechatMiniprogram.App.Instance<{}>["onUnhandledRejection"]) => void;
export declare const onThemeChange: (hook: WechatMiniprogram.App.Instance<{}>["onThemeChange"]) => void;