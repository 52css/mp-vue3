import { effectScope, EffectScope, ref, Ref } from "@52css/mp-vue3";

export interface Pinia {
  install: Function;
  scope: EffectScope;
  stores: Record<string, any>;
  state: Ref<any>;
}

// eslint-disable-next-line import/no-mutable-exports
export let activePinia: Pinia | undefined;

export function setActivatePinia(p: Pinia) {
  activePinia = p;
}
export function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => {
    return ref({});
  }) as Ref<any>;

  const pinia: Pinia = {
    install() {
      setActivatePinia(pinia);
    },
    scope,
    state,
    stores: {} as Record<string, any>,
  };

  return pinia;
}
