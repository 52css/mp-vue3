import { type EffectScope } from "@vue/reactivity";
import { type PageQueries, type PageQuery } from "./router";
export type PageInstance = WechatMiniprogram.Page.Instance<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption & {
    $scope: EffectScope;
    $query: Record<string, any>;
    $context: {};
}>;
export type PageOptions = WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>;
export type PageHook<TQuery> = (this: PageInstance, query: TQuery, context: PageContext) => Record<string, any> | void;
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
