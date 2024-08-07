import "miniprogram-api-typings";
export type AppHook = () => Record<string, any>;
export type ComponentPropType = StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor | null;
type ComponentPropInferValueType<T> = T extends StringConstructor ? string : T extends NumberConstructor ? number : T extends BooleanConstructor ? boolean : T extends ArrayConstructor ? any[] : T extends ObjectConstructor ? Record<string, any> : any;
export type ComponentPropDefinition<T extends ComponentPropType> = {
    type: T | T[];
    optionalTypes?: ComponentPropType[];
    default?: ComponentPropInferValueType<T>;
    value?: ComponentPropInferValueType<T>;
    observer?(newVal: ComponentPropInferValueType<T>, oldVal: ComponentPropInferValueType<T>): void;
};
export type ComponentProps = {
    [key: string]: ComponentPropType | ComponentPropDefinition<ComponentPropType>;
};
export type ComponentEmit = {
    emit?(key: string, val: any): void;
};
export type PageHook = () => Record<string, any>;
export type ComponentHook = (props: ComponentProps, context: Context & ComponentEmit) => Record<string, any>;
export type Context = WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject> | WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, Record<string, any>, WechatMiniprogram.Component.MethodOption, {}, false> | WechatMiniprogram.Page.Instance<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>;
export declare function createApp(hook?: AppHook | {
    setup?: AppHook;
}): void;
export declare const useApp: WechatMiniprogram.App.GetApp;
export declare const onLaunch: (hook: Function) => void;
export declare const onError: (hook: Function) => void;
export declare const onPageNotFound: (hook: Function) => void;
export declare const onUnhandledRejection: (hook: Function) => void;
/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare function definePage(hook?: PageHook | (WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption> & {
    setup?: PageHook;
})): void;
export declare const usePage: () => WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
export declare const onLoad: (hook: WechatMiniprogram.Page.ILifetime["onLoad"]) => void;
export declare const onShow: (hook: WechatMiniprogram.Page.ILifetime["onShow"]) => void;
export declare const onReady: (hook: WechatMiniprogram.Page.ILifetime["onReady"]) => void;
export declare const onHide: (hook: WechatMiniprogram.Page.ILifetime["onHide"]) => void;
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
/**
 * 创建组件并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare function defineComponent(hook?: ComponentHook | (WechatMiniprogram.Component.Options<WechatMiniprogram.Component.DataOption, {}, WechatMiniprogram.Component.MethodOption, {}, false> & {
    props?: ComponentProps;
    setup?: ComponentHook;
})): string | undefined;
export declare const useComponent: () => Context;
export declare const attached: (hook: WechatMiniprogram.Component.Lifetimes["attached"]) => void;
export declare const ready: (hook: WechatMiniprogram.Component.Lifetimes["ready"]) => void;
export declare const moved: (hook: WechatMiniprogram.Component.Lifetimes["moved"]) => void;
export declare const detached: (hook: WechatMiniprogram.Component.Lifetimes["detached"]) => void;
export declare const error: (hook: WechatMiniprogram.Component.Lifetimes["error"]) => void;
export declare const useObserver: (key: string, fn: Function) => void;
export {};
