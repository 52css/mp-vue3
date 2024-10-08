import { isFunction } from "./utils";
import {
  effectScope,
  shallowReactive,
  type EffectScope,
} from "@vue/reactivity";
import { deepToRaw, deepWatch, setInstance } from "./shared";
import "miniprogram-api-typings";
import { type PropType } from "./shared";
import { lifetimeEmit } from "./lifetime";
import { onAppLaunched } from "./app";
import { flushPostFlushCbs } from "./scheduler";

// 组件实例
export type ComponentInstance<TEmits extends object = {}> =
  WechatMiniprogram.Component.Instance<
    WechatMiniprogram.Component.DataOption,
    WechatMiniprogram.Component.PropertyOption,
    WechatMiniprogram.Component.MethodOption,
    {
      $scope: EffectScope;
      $props: Record<string, any>;
      $context: ComponentContext<TEmits>;
    },
    false
  >;

// 组件配置
export type ComponentOptions = WechatMiniprogram.Component.Options<
  WechatMiniprogram.Component.DataOption,
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption,
  {},
  false
>;

// TODO结合兼容
// type ComponentPropertiesType =
//   | StringConstructor
//   | NumberConstructor
//   | BooleanConstructor
//   | ArrayConstructor
//   | ObjectConstructor
//   | null;

type ComponentPropertiesValue<T> = T extends {
  type: null;
}
  ? {
      type: null;
      optionalTypes?: Array<PropType<any>>;
      value?: any;
      observer?: (newVal: any, oldVal: any) => void;
    }
  : T extends {
      type: PropType<infer U>;
      optionalTypes?: Array<PropType<any>>;
    }
  ? {
      type: PropType<U>;
      optionalTypes?: Array<PropType<any>>;
      value?:
        | U
        | (T extends { optionalTypes: (infer O)[] }
            ? ComponentPropsValue<O>
            : never);
      observer?: (
        newVal:
          | U
          | (T extends { optionalTypes: (infer O)[] }
              ? ComponentPropsValue<O>
              : never),
        oldVal:
          | U
          | (T extends { optionalTypes: (infer O)[] }
              ? ComponentPropsValue<O>
              : never)
      ) => void;
    }
  : T extends {
      type: PropType<infer U>;
    }
  ? {
      type: PropType<U>;
      value?: U;
      observer?: (newVal: U, oldVal: U) => void;
    }
  : T extends null
  ? null
  : T extends PropType<infer U>
  ? PropType<U>
  : undefined;

export type ComponentProperties<T> = {
  [K in keyof T]?: ComponentPropertiesValue<T[K]>;
};

// 组件setup函数
export type ComponentHook<TComponentProps, TComponentContext> = (
  this: ComponentInstance,
  props: TComponentProps,
  context: TComponentContext
) => Record<string, any> | void;

// 更新 `ExtractPropType` 类型以处理 `optionalTypes`
type ComponentPropsValue<T> = T extends {
  type: PropType<infer U>;
  optionalTypes?: Array<PropType<any>>;
}
  ?
      | U
      | (T extends { optionalTypes: (infer O)[] }
          ? ComponentPropsValue<O>
          : never)
  : T extends { type: PropType<infer U> }
  ? U
  : T extends PropType<infer U>
  ? U
  : T extends null
  ? any
  : undefined;

// 组件setup第一个参数，props
export type ComponentProps<T> = {
  [K in keyof T]?: ComponentPropsValue<T[K]>;
};

type ComponentContextEmit<E> = <K extends keyof E>(
  event: K,
  ...args: E[K] extends (...args: infer P) => any ? P : never
) => void;

// 组件setup第二参数，context
export type ComponentContext<TEmits> = {
  emit: ComponentContextEmit<TEmits>;
};

/**
 * 创建组件并关联生命周期函数
 * @param hook - Hook 函数或包含 setup 的对象
 */
export const defineComponent = <
  TProperties extends ComponentProperties<TProperties>,
  TEmits extends object = {}
>(
  hook?:
    | ComponentHook<ComponentProps<TProperties>, ComponentContext<TEmits>>
    | (ComponentOptions & {
        properties?: TProperties;
        emits?: TEmits;
        setup?: ComponentHook<
          ComponentProps<TProperties>,
          ComponentContext<TEmits>
        >;
      })
) => {
  if (!hook) {
    return Component({});
  }

  let options: ComponentOptions = {};
  if (typeof hook !== "function") {
    const { setup, ...other } = hook;

    options = other;
    hook = setup;
  }

  if (!hook) {
    return Component(options);
  }

  let properties: string[] | null = null;

  if (options.properties) {
    properties = Object.keys(options.properties);
  }

  if (properties) {
    properties.forEach((property) => {
      if (options.observers === undefined) {
        options.observers = {};
      }

      const originObserver = options.observers[property];
      options.observers[property] = function (
        this: ComponentInstance,
        value: any
      ) {
        // Observer executes before attached
        if (this.$props) {
          this.$props[property] = value;
        }

        if (originObserver !== undefined) {
          originObserver.call(this, value);
        }
      };
    });
  }

  return Component({
    ...options,
    lifetimes: {
      attached(this: ComponentInstance) {
        onAppLaunched(() => {
          setInstance(this);
          this.$scope = effectScope();
          const rawProps: Record<string, any> = {};
          if (properties) {
            properties.forEach((property) => {
              rawProps[property] = this.data[property];
            });
          }
          this.$props = shallowReactive(rawProps);

          this.$context = {
            emit: (key: string, ...args: any[]) => {
              this.triggerEvent(key, { value: args[0] });
            },
          };
          this.$scope.run(() => {
            const bindings = (
              hook as ComponentHook<
                ComponentProps<TProperties>,
                ComponentContext<TEmits>
              >
            ).call(this, this.$props, this.$context);
            if (bindings !== undefined) {
              let data: Record<string, unknown> | undefined = {};
              Object.keys(bindings).forEach((key) => {
                const value = bindings[key];
                if (isFunction(value)) {
                  this[key] = value;
                  return;
                }

                data[key] = deepToRaw(value);
                deepWatch.call(this, key, value);
              });
              if (Object.keys(data).length !== 0) {
                this.setData(data, flushPostFlushCbs);
              }
            }

            lifetimeEmit(this, options, "attached");
          });
          setInstance(null);
        });
      },
      ready(this: ComponentInstance) {
        lifetimeEmit(this, options, "ready");
      },
      moved(this: ComponentInstance) {
        lifetimeEmit(this, options, "moved");
      },
      detached(this: ComponentInstance) {
        lifetimeEmit(this, options, "detached");
        if (this.$scope) {
          this.$scope.stop();
        }

        // 手动销毁
        Object.keys(this).forEach((key) => {
          try {
            if (/^$/.test(key)) {
              delete this[key];
            }
          } catch (ex) {
            console.error("销毁异常", ex);
          }
        });
      },
      error(this: ComponentInstance, err: WechatMiniprogram.Error) {
        lifetimeEmit(this, options, "error", err);
      },
    },
    pageLifetimes: {
      show(this: ComponentInstance) {
        lifetimeEmit(this, options, "show");
      },
      hide(this: ComponentInstance) {
        lifetimeEmit(this, options, "hide");
      },
      resize(this: ComponentInstance, size) {
        lifetimeEmit(this, options, "resize", size);
      },
      // @ts-expect-error 不要报错
      routeDone(this: ComponentInstance) {
        lifetimeEmit(this, options, "routeDone");
      },
    },
  });
};
