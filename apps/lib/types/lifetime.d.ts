import { type PageInstance } from "./page";
import { type ComponentInstance } from "./component";
export declare const lifetimeEmit: (instance: PageInstance | ComponentInstance, options: any, lifetimeKey: string, ...args: any[]) => void;
export declare const lifetimeOnce: (instance: PageInstance | ComponentInstance, options: any, lifetimeKey: string, ...args: any[]) => any;
export declare const lifetimeOn: (instance: PageInstance | ComponentInstance | null, lifetimeKey: string, hook: Function) => void;
