import {
  ComputedRef,
  isReactive,
  isRef,
  Ref,
  toRaw,
  ToRef,
  toRef,
  ToRefs,
  UnwrapRef,
} from "@52css/mp-vue3";
import { activePinia, Pinia, setActivatePinia } from "./createPinia";

export type _Method = (...args: any[]) => any;
export type _UnwrapAll<SS> = { [K in keyof SS]: UnwrapRef<SS[K]> };

export type _StoreWithGetters<G> = {
  readonly [k in keyof G]: UnwrapRef<G[k]>;
};
export type StateTree = Record<string | number | symbol, any>;

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G = {},
  A = {}
> = UnwrapRef<S> &
  _StoreWithGetters<G> &
  A & {
    $id: Id;
  };

interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  G = {},
  A = {}
> {
  (pinia?: Pinia | undefined): Store<Id, S, G, A>;
}

export type _ExtractStateFromSetupStore_Keys<SS> = keyof {
  [K in keyof SS as SS[K] extends _Method | ComputedRef ? never : K]: any;
};
export type _ExtractStateFromSetupStore<SS> = SS extends undefined | void
  ? {}
  : _UnwrapAll<Pick<SS, _ExtractStateFromSetupStore_Keys<SS>>>;

export type _ExtractGettersFromSetupStore_Keys<SS> = keyof {
  [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any;
};

export type _ExtractGettersFromSetupStore<SS> = SS extends undefined | void
  ? {}
  : Pick<SS, _ExtractGettersFromSetupStore_Keys<SS>>;

export type _ExtractActionsFromSetupStore_Keys<SS> = keyof {
  [K in keyof SS as SS[K] extends _Method ? K : never]: any;
};
export type _ExtractActionsFromSetupStore<SS> = SS extends undefined | void
  ? {}
  : Pick<SS, _ExtractActionsFromSetupStore_Keys<SS>>;

export function defineStore<Id extends string, SS>(
  id: Id,
  storeSetup: () => SS
): StoreDefinition<
  Id,
  _ExtractStateFromSetupStore<SS>,
  _ExtractGettersFromSetupStore<SS>,
  _ExtractActionsFromSetupStore<SS>
>;

export function defineStore(id: string, setup: any) {
  return function useStore(pinia?: Pinia) {
    if (pinia) {
      setActivatePinia(pinia);
    }
    pinia = activePinia;
    if (!pinia) {
      throw new Error("no active pinia");
    }
    if (!pinia.stores[id]) {
      createStore(pinia, id, setup);
    }
    return pinia.stores[id] as any;
  };
}

function createStore(pinia: Pinia, id: string, setup: any) {
  const store = {};
  const setupStore = pinia.scope.run(setup);
  Object.assign(store, setupStore);
  pinia.stores[id] = store as any;
}

type ToComputedRefs<T> = {
  [K in keyof T]: ToRef<T[K]> extends Ref<infer U>
    ? ComputedRef<U>
    : ToRef<T[K]>;
};

export type StoreToRefs<SS> = ToRefs<_ExtractStateFromSetupStore<SS>> &
  ToComputedRefs<_ExtractGettersFromSetupStore<SS>>;

export function storeToRefs<SS extends {}>(store: SS): StoreToRefs<SS> {
  store = toRaw(store);
  const refs = {} as StoreToRefs<SS>;
  for (const key in store) {
    const value = store[key];
    if (isRef(value) || isReactive(value)) {
      // @ts-ignore
      refs[key] = toRef(store, key);
    }
  }
  return refs;
}
