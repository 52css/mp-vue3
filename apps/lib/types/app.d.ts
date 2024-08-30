export type AppInstance = Record<string, any>;
export type AppOptions = Record<string, any>;
export declare let launchPromise: Promise<true>;
export type AppHook = (this: AppInstance, option: WechatMiniprogram.App.LaunchShowOption) => Record<string, any> | void;
export declare const createApp: (hook: AppHook | (AppOptions & {
    setup?: AppHook;
})) => void;
