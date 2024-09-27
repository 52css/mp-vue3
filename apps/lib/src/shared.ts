import { isRef, isProxy, toRaw, watch } from "@vue/reactivity";
import {
  isArray,
  getType,
  isSimpleValue,
  isObject,
  isPlainObject,
  isFunction,
} from "./utils";
import { flushPostFlushCbs } from "./scheduler";
import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
import { type AppInstance } from "./app";

// 定义 PropType 辅助类型
export type PropType<T> = () => T;

export function deepToRaw(x: unknown): unknown {
  if (isSimpleValue(x) || isFunction(x)) {
    return x;
  }

  if (isRef(x)) {
    return deepToRaw(x.value);
  }

  if (isProxy(x)) {
    return deepToRaw(toRaw(x));
  }

  if (isArray(x)) {
    return x.map((item) => deepToRaw(item));
  }

  if (isPlainObject(x)) {
    const obj: Record<string, unknown> = {};
    Object.keys(x).forEach((key) => {
      obj[key] = deepToRaw(x[key]);
    });
    return obj;
  }

  throw new TypeError(`${getType(x)} value is not supported`);
}

export function deepWatch(
  this: Pick<
    WechatMiniprogram.Component.InstanceMethods<Record<string, unknown>>,
    "setData"
  >,
  key: string,
  value: unknown
): void {
  if (!isObject(value)) {
    return;
  }

  watch(
    isRef(value) ? value : () => value,
    () => {
      this.setData({ [key]: deepToRaw(value) }, flushPostFlushCbs);
    },
    {
      deep: true,
    }
  );
}

export let _instance: PageInstance | ComponentInstance | AppInstance | null =
  null;
export const useInstance = () => _instance;
export const setInstance = (
  newInstance: PageInstance | ComponentInstance | AppInstance | null
) => {
  _instance = newInstance;
};
