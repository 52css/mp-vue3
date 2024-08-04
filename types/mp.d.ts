type Hook = () => any;
/**
 * 创建页面并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare function definePage(hook: Hook | {
    observers?: Record<string, any>;
    behaviors?: any[];
    setup: Hook;
}): void;
/**
 * 创建组件并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export declare function defineComponent(hook: Hook | {
    props?: Record<string, any>;
    observers?: Record<string, any>;
    behaviors?: any[];
    componentGenerics?: Record<string, any>;
    setup: Hook;
}): void;
export declare const getCurrentPage: () => any;
export declare const useObserver: (key: string, fn: Function) => void;
export declare const getCurrentInstance: () => {
    proxy: any;
};
export declare const onShow: (hook: Function) => void;
export declare const onReady: (hook: Function) => void;
export declare const onHide: (hook: Function) => void;
export declare const onUnload: (hook: Function) => void;
export declare const onRouteDone: (hook: Function) => void;
export declare const onPullDownRefresh: (hook: Function) => void;
export declare const onReachBottom: (hook: Function) => void;
export declare const onPageScroll: (hook: Function) => void;
export declare const onAddToFavorites: (hook: Function) => void;
export declare const onShareAppMessage: (hook: Function) => void;
export declare const onShareTimeline: (hook: Function) => void;
export declare const onResize: (hook: Function) => void;
export declare const onTabItemTap: (hook: Function) => void;
export declare const onSaveExitState: (hook: Function) => void;
export declare const ready: (hook: Function) => void;
export declare const moved: (hook: Function) => void;
export declare const detached: (hook: Function) => void;
export declare const error: (hook: Function) => void;
export {};
