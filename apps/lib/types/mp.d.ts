import "miniprogram-api-typings";
export type AppHook = () => Record<string, any>;
export type PropType<T> = () => T;
export type PageInstance = WechatMiniprogram.Page.Instance<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>;
export type PageOptions = WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>;
export type PageHook<TQuery> = (query: TQuery, context: PageContext) => Record<string, any>;
type PageExtractQueryType<T> = T extends PropType<infer U> ? U : T extends null ? any : undefined;
type PageQueryFromQueries<T> = {
    [K in keyof T]?: PageExtractQueryType<T[K]>;
};
export type PageQuery<T> = PageQueryFromQueries<T>;
export type PageContext = WechatMiniprogram.Page.InstanceProperties & Omit<WechatMiniprogram.Page.InstanceMethods<Record<string, any>>, "setData" | "groupSetData" | "hasBehavior">;
export type ComponentInstance = WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, {}, WechatMiniprogram.Component.MethodOption, {}, false>;
export type ComponentOptions = WechatMiniprogram.Component.Options<WechatMiniprogram.Component.DataOption, {}, WechatMiniprogram.Component.MethodOption, {}, false>;
type ComponentExtractPropertyType<T> = T extends {
    type: null;
} ? {
    type: null;
    optionalTypes?: Array<PropType<any>>;
    value?: any;
} : T extends {
    type: PropType<infer U>;
    optionalTypes?: Array<PropType<any>>;
} ? {
    type: PropType<U>;
    optionalTypes?: Array<PropType<any>>;
    value?: U | (T extends {
        optionalTypes: (infer O)[];
    } ? ComponentExtractPropType<O> : never);
} : T extends {
    type: PropType<infer U>;
} ? {
    type: PropType<U>;
    value?: U;
} : T extends null ? null : T extends PropType<infer U> ? PropType<U> : undefined;
export type ComponentProperties<T> = {
    [K in keyof T]?: ComponentExtractPropertyType<T[K]>;
};
export type ComponentHook<TComponentProps, TComponentContext> = (props: TComponentProps, context: TComponentContext) => Record<string, any>;
type ComponentExtractPropType<T> = T extends {
    type: PropType<infer U>;
    optionalTypes?: Array<PropType<any>>;
} ? U | (T extends {
    optionalTypes: (infer O)[];
} ? ComponentExtractPropType<O> : never) : T extends {
    type: PropType<infer U>;
} ? U : T extends PropType<infer U> ? U : T extends null ? any : undefined;
type ComponentPropsFromProperties<T> = {
    [K in keyof T]?: ComponentExtractPropType<T[K]>;
};
export type ComponentProps<T> = ComponentPropsFromProperties<T>;
type EmitFunction<E> = <K extends keyof E>(event: K, ...args: E[K] extends (...args: infer P) => any ? P : never) => void;
export type ComponentContext<TEmits> = {
    emit: EmitFunction<TEmits>;
};
/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare const definePage: <TQueries extends object = {}>(hook?: PageHook<PageQuery<TQueries>> | (PageOptions & {
    queries?: TQueries;
    setup?: PageHook<PageQuery<TQueries>>;
})) => void;
export declare const usePage: () => PageInstance | null;
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
export declare const defineComponent: <TProperties extends ComponentProperties<TProperties>, TEmits extends object = {}>(hook?: ComponentHook<ComponentProps<TProperties>, ComponentContext<TEmits>> | (ComponentOptions & {
    properties?: TProperties;
    emits?: TEmits;
    setup?: ComponentHook<ComponentProps<TProperties>, ComponentContext<TEmits>>;
})) => string | undefined;
export declare const useComponent: () => ComponentInstance | null;
export declare const attached: (hook: WechatMiniprogram.Component.Lifetimes["attached"]) => void;
export declare const ready: (hook: WechatMiniprogram.Component.Lifetimes["ready"]) => void;
export declare const moved: (hook: WechatMiniprogram.Component.Lifetimes["moved"]) => void;
export declare const detached: (hook: WechatMiniprogram.Component.Lifetimes["detached"]) => void;
export declare const error: (hook: WechatMiniprogram.Component.Lifetimes["error"]) => void;
export {};
