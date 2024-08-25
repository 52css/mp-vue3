import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
export type PropType<T> = () => T;
export declare function deepToRaw(x: unknown): unknown;
export declare function deepWatch(instance: Pick<WechatMiniprogram.Component.InstanceMethods<Record<string, unknown>>, "setData">, key: string, value: unknown): void;
export declare let instance: PageInstance | ComponentInstance | null;
export declare const useInstance: () => PageInstance | ComponentInstance | null;
export declare const setInstance: (newInstance: PageInstance | ComponentInstance | null) => void;
