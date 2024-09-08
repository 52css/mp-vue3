import { type PropType } from "./shared";
export type PushToOption = string | (Omit<WechatMiniprogram.NavigateToOption, "url"> & ({
    url: string;
} | {
    path: string;
    query?: Record<string, any>;
}));
export type ReplaceToOption = string | (Omit<WechatMiniprogram.RedirectToOption, "url"> & ({
    url: string;
} | {
    path: string;
    query?: Record<string, any>;
}));
export type BackToOption = WechatMiniprogram.NavigateBackOption;
export type SwitchTabOption = string | (Omit<WechatMiniprogram.SwitchTabOption, "url"> & ({
    url: string;
} | {
    path: string;
    query?: Record<string, any>;
}));
export type ReLaunchToOption = string | (Omit<WechatMiniprogram.ReLaunchOption, "url"> & ({
    url: string;
} | {
    path: string;
    query?: Record<string, any>;
}));
type PageQueryValue<T> = T extends PropType<infer U> ? U : T extends null ? any : undefined;
export type PageQuery<T> = {
    [K in keyof T]?: PageQueryValue<T[K]>;
};
type PageQueriesValue<T> = T extends {
    type: PropType<infer U>;
} ? {
    type: PropType<U>;
    formatter?: (value: string) => U;
} : T extends PropType<infer U> ? PropType<U> : undefined;
export type PageQueries<T> = {
    [K in keyof T]?: PageQueriesValue<T[K]>;
};
export declare const useRouter: () => {
    push: (to: PushToOption) => Promise<WechatMiniprogram.NavigateToSuccessCallbackResult>;
    replace: (to: ReplaceToOption) => Promise<WechatMiniprogram.GeneralCallbackResult>;
    go: (steps: number) => Promise<WechatMiniprogram.GeneralCallbackResult> | undefined;
    back: (to: BackToOption) => Promise<WechatMiniprogram.GeneralCallbackResult>;
    switchTab: (to: SwitchTabOption) => Promise<WechatMiniprogram.GeneralCallbackResult>;
    reLaunch: (to: ReLaunchToOption) => Promise<WechatMiniprogram.GeneralCallbackResult>;
};
export declare const useRoute: () => {
    path: string;
    query: Record<string, string | undefined> | PageQuery<PageQuery<{}>>;
};
export declare let _queries: PageQuery<{}>;
export declare const setQueries: <TQueries extends PageQueries<TQueries>>(queries: TQueries) => void;
export declare const createQuery: <TQueries extends PageQueries<TQueries>>(query: Record<string, string | undefined>, queries?: TQueries) => Record<string, string | undefined> | PageQuery<TQueries>;
export {};
