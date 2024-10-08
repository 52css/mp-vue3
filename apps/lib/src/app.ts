export type AppInstance = Record<string, any>;
export type AppOptions = Record<string, any>;
import { lifetimeEmit } from "./lifetime";
import { setInstance } from "./shared";

export let launchPromise: Promise<true> = Promise.resolve(true);
export let isReady = true;
export let onAppLaunched = (fn: () => void) => {
  if (isReady) {
    fn();
  } else {
    launchPromise.then(fn);
  }
};

// 页面setup函数
export type AppHook = (
  this: AppInstance,
  option: WechatMiniprogram.App.LaunchShowOption
) => Record<string, any> | void;

export const createApp = (
  hook: AppHook | (AppOptions & { setup?: AppHook })
) => {
  if (!hook) {
    return App({});
  }

  let options: AppOptions = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;

    options = other;
    //@ts-expect-error 不要报错
    hook = setup;
  }

  if (!hook) {
    return App(options);
  }

  return App({
    ...options,
    onLaunch(this: AppInstance, onLaunchOption) {
      // console.log("🚀 ~ onLaunch ~ onLaunch:");
      isReady = false;
      launchPromise = new Promise(async (resolve) => {
        setInstance(this);
        const bindings = await hook.call(this, onLaunchOption);
        if (bindings !== undefined) {
          Object.keys(bindings).forEach((key) => {
            this[key] = bindings[key];
          });
        }
        lifetimeEmit(this, options, "onLaunch", onLaunchOption);
        setInstance(null);
        resolve(true);
        isReady = true;
      });
    },
    onShow(this: AppInstance, onShowOption) {
      lifetimeEmit(this, options, "onShow", onShowOption);
    },
    onHide(this: AppInstance) {
      lifetimeEmit(this, options, "onHide");
    },
    onError(this: AppInstance, onErrorOption) {
      lifetimeEmit(this, options, "onError", onErrorOption);
    },
    onPageNotFound(this: AppInstance, onPageNotFoundOption) {
      lifetimeEmit(this, options, "onPageNotFound", onPageNotFoundOption);
    },
    onUnhandledRejection(this: AppInstance, onUnhandledRejectionOption) {
      lifetimeEmit(
        this,
        options,
        "onUnhandledRejection",
        onUnhandledRejectionOption
      );
    },
    onThemeChange(this: AppInstance, onThemeChangeOption) {
      lifetimeEmit(this, options, "onThemeChange", onThemeChangeOption);
    },
  });
};
