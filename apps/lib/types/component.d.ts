import "miniprogram-api-typings";
import { type PropType } from "./shared";
export type AppHook = () => Record<string, any>;
export type ComponentInstance = WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, {}, false>;
export type ComponentOptions = WechatMiniprogram.Component.Options<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, {}, false>;
type ComponentPropertiesValue<T> = T extends {
    type: null;
} ? {
    type: null;
    optionalTypes?: Array<PropType<any>>;
    value?: any;
    observer?: (newVal: any, oldVal: any) => void;
} : T extends {
    type: PropType<infer U>;
    optionalTypes?: Array<PropType<any>>;
} ? {
    type: PropType<U>;
    optionalTypes?: Array<PropType<any>>;
    value?: U | (T extends {
        optionalTypes: (infer O)[];
    } ? ComponentPropsValue<O> : never);
    observer?: (newVal: U | (T extends {
        optionalTypes: (infer O)[];
    } ? ComponentPropsValue<O> : never), oldVal: U | (T extends {
        optionalTypes: (infer O)[];
    } ? ComponentPropsValue<O> : never)) => void;
} : T extends {
    type: PropType<infer U>;
} ? {
    type: PropType<U>;
    value?: U;
    observer?: (newVal: U, oldVal: U) => void;
} : T extends null ? null : T extends PropType<infer U> ? PropType<U> : undefined;
export type ComponentProperties<T> = {
    [K in keyof T]?: ComponentPropertiesValue<T[K]>;
};
export type ComponentHook<TComponentProps, TComponentContext> = (props: TComponentProps, context: TComponentContext) => Record<string, any>;
type ComponentPropsValue<T> = T extends {
    type: PropType<infer U>;
    optionalTypes?: Array<PropType<any>>;
} ? U | (T extends {
    optionalTypes: (infer O)[];
} ? ComponentPropsValue<O> : never) : T extends {
    type: PropType<infer U>;
} ? U : T extends PropType<infer U> ? U : T extends null ? any : undefined;
export type ComponentProps<T> = {
    [K in keyof T]?: ComponentPropsValue<T[K]>;
};
type ComponentContextEmit<E> = <K extends keyof E>(event: K, ...args: E[K] extends (...args: infer P) => any ? P : never) => void;
export type ComponentContext<TEmits> = {
    emit: ComponentContextEmit<TEmits>;
};
export type ComponentLifetimes = {
    created(): void;
    attached(): void;
    ready(): void;
    moved(): void;
    detached(): void;
    error(err: Error): void;
};
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
