export declare const EMPTY_OBJ: Readonly<Record<string, any>>;
export declare const NOOP: () => void;
export declare const isArray: (arg: any) => arg is any[];
export declare const extend: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare function exclude<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export declare function getType(x: unknown): string;
export declare function isSimpleValue(x: unknown): boolean;
export declare function isObject(x: unknown): x is object;
export declare function isPlainObject(x: unknown): x is Record<string, unknown>;
export declare function isFunction(x: unknown): x is Function;
export declare function toHiddenField(name: string): string;
