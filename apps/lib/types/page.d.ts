import { type EffectScope } from "@vue/reactivity";
import { type PropType } from "./shared";
export type PageInstance = WechatMiniprogram.Page.Instance<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption & {
    $scope: EffectScope;
    $query: Record<string, any>;
    $context: {};
}>;
export type PageOptions = WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>;
type PageQueriesValue<T> = T extends {
    type: PropType<infer U>;
} ? {
    type: PropType<U>;
    formatter?: (value: string) => U;
} : T extends PropType<infer U> ? PropType<U> : undefined;
export type PageQueries<T> = {
    [K in keyof T]?: PageQueriesValue<T[K]>;
};
export type PageHook<TQuery> = (this: PageInstance, query: TQuery, context: PageContext) => Record<string, any>;
type PageQueryValue<T> = T extends PropType<infer U> ? U : T extends null ? any : undefined;
export type PageQuery<T> = {
    [K in keyof T]?: PageQueryValue<T[K]>;
};
export type PageContext = WechatMiniprogram.Page.InstanceProperties & Omit<WechatMiniprogram.Page.InstanceMethods<Record<string, any>>, "setData" | "groupSetData" | "hasBehavior">;
/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare const definePage: <TQueries extends PageQueries<TQueries>>(hook?: PageHook<PageQuery<TQueries>> | (PageOptions & {
    queries?: TQueries;
    setup?: PageHook<PageQuery<TQueries>>;
})) => void;
export declare const getCurrentPage: () => WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
export {};
