import { ComputedRef, Ref, ToRef, ToRefs, UnwrapRef, EffectScope } from "@vue/reactivity";
export interface Pinia {
    install: Function;
    scope: EffectScope;
    stores: Record<string, any>;
    state: Ref<any>;
}
export type _Method = (...args: any[]) => any;
export type _UnwrapAll<SS> = {
    [K in keyof SS]: UnwrapRef<SS[K]>;
};
export type _StoreWithGetters<G> = {
    readonly [k in keyof G]: UnwrapRef<G[k]>;
};
export type StateTree = Record<string | number | symbol, any>;
export type Store<Id extends string = string, S extends StateTree = {}, G = {}, A = {}> = UnwrapRef<S> & _StoreWithGetters<G> & A & {
    $id: Id;
};
interface StoreDefinition<Id extends string = string, S extends StateTree = StateTree, G = {}, A = {}> {
    (pinia?: Pinia | undefined): Store<Id, S, G, A>;
}
export type _ExtractStateFromSetupStore_Keys<SS> = keyof {
    [K in keyof SS as SS[K] extends _Method | ComputedRef ? never : K]: any;
};
export type _ExtractStateFromSetupStore<SS> = SS extends undefined | void ? {} : _UnwrapAll<Pick<SS, _ExtractStateFromSetupStore_Keys<SS>>>;
export type _ExtractGettersFromSetupStore_Keys<SS> = keyof {
    [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any;
};
export type _ExtractGettersFromSetupStore<SS> = SS extends undefined | void ? {} : Pick<SS, _ExtractGettersFromSetupStore_Keys<SS>>;
export type _ExtractActionsFromSetupStore_Keys<SS> = keyof {
    [K in keyof SS as SS[K] extends _Method ? K : never]: any;
};
export type _ExtractActionsFromSetupStore<SS> = SS extends undefined | void ? {} : Pick<SS, _ExtractActionsFromSetupStore_Keys<SS>>;
type ToComputedRefs<T> = {
    [K in keyof T]: ToRef<T[K]> extends Ref<infer U> ? ComputedRef<U> : ToRef<T[K]>;
};
export type StoreToRefs<SS> = ToRefs<_ExtractStateFromSetupStore<SS>> & ToComputedRefs<_ExtractGettersFromSetupStore<SS>>;
export declare let activePinia: Pinia | undefined;
export declare function setActivatePinia(p: Pinia): void;
export declare function createPinia(): Pinia;
export declare function defineStore<Id extends string, SS>(id: Id, storeSetup: () => SS, options?: {
    persist: boolean;
}): StoreDefinition<Id, _ExtractStateFromSetupStore<SS>, _ExtractGettersFromSetupStore<SS>, _ExtractActionsFromSetupStore<SS>>;
export declare function storeToRefs<SS extends {}>(store: SS): StoreToRefs<SS>;
export {};
