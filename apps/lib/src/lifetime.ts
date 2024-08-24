import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";

export const lifetimeEmit = (
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    options[lifetimeKey](...args);
  }
  if (!instance[`$${lifetimeKey}`]) {
    return;
  }

  const eventBackMap = {
    onLoad: "onUnload",
    onShow: "onHide",
    attached: "detached",
  };
  const lifetimesBackKey =
    eventBackMap[lifetimeKey as keyof typeof eventBackMap];

  instance[`$${lifetimeKey}`].forEach((fn: Function) => {
    // 反面有没有对应的off
    if (lifetimesBackKey) {
      const backFn =
        instance[`$${lifetimesBackKey}`] &&
        instance[`$${lifetimesBackKey}`].find((x: any) => x.front === fn);

      if (backFn) {
        backFn();
      }
    }

    const off = fn.apply(instance, args);
    // 调用是否返回函数，用于销毁
    if (lifetimesBackKey && typeof off === "function") {
      let backFn =
        instance[`$${lifetimesBackKey}`] &&
        instance[`$${lifetimesBackKey}`].find((x: any) => x.front === fn);

      if (!backFn) {
        off.front === fn;
        if (!instance[`$${lifetimesBackKey}`]) {
          instance[`$${lifetimesBackKey}`] = [];
        }
        instance[`$${lifetimesBackKey}`].push(off);
      }
    }
  });
};

export const lifetimeOnce = (
  instance: PageInstance | ComponentInstance,
  options: any,
  lifetimeKey: string,
  ...args: any[]
) => {
  if (options && options[lifetimeKey]) {
    return options[lifetimeKey](...args);
  }
  if (!instance[`$${lifetimeKey}`]) {
    return;
  }

  if (instance[`$${lifetimeKey}`].length) {
    throw new Error(`一个page只能配置一个${lifetimeKey}`);
  }

  return instance[`$${lifetimeKey}`][0].apply(instance, args);
};

export const lifetimeOn = (
  instance: PageInstance | ComponentInstance | null,
  lifetimeKey: string,
  hook: Function
) => {
  if (!instance) {
    return;
  }

  if (!instance[`$${lifetimeKey}`]) {
    instance[`$${lifetimeKey}`] = [];
  }

  instance[`$${lifetimeKey}`].push(hook);
};
