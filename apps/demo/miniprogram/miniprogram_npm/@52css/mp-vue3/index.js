module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1724419480849, function(require, module, exports) {
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MpVue3 = {}));
})(this, (function (exports) { 

  /**
  * @vue/shared v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str, expectsLowerCase) {
    const set = new Set(str.split(","));
    return (val) => set.has(val);
  }
  const NOOP$1 = () => {
  };
  const extend = Object.assign;
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray$1 = Array.isArray;
  const isMap$1 = (val) => toTypeString(val) === "[object Map]";
  const isFunction$1 = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const hasChanged$1 = (value, oldValue) => !Object.is(value, oldValue);
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };

  /**
  * @vue/reactivity v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/

  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      /**
       * @internal
       */
      this._active = true;
      /**
       * @internal
       */
      this.effects = [];
      /**
       * @internal
       */
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    }
  }

  let activeEffect;
  class ReactiveEffect {
    constructor(fn, trigger, scheduler, scope) {
      this.fn = fn;
      this.trigger = trigger;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      /**
       * @internal
       */
      this._dirtyLevel = 4;
      /**
       * @internal
       */
      this._trackId = 0;
      /**
       * @internal
       */
      this._runnings = 0;
      /**
       * @internal
       */
      this._shouldSchedule = false;
      /**
       * @internal
       */
      this._depsLength = 0;
      recordEffectScope(this, scope);
    }
    get dirty() {
      if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
        this._dirtyLevel = 1;
        pauseTracking();
        for (let i = 0; i < this._depsLength; i++) {
          const dep = this.deps[i];
          if (dep.computed) {
            triggerComputed(dep.computed);
            if (this._dirtyLevel >= 4) {
              break;
            }
          }
        }
        if (this._dirtyLevel === 1) {
          this._dirtyLevel = 0;
        }
        resetTracking();
      }
      return this._dirtyLevel >= 4;
    }
    set dirty(v) {
      this._dirtyLevel = v ? 4 : 0;
    }
    run() {
      this._dirtyLevel = 0;
      if (!this.active) {
        return this.fn();
      }
      let lastShouldTrack = shouldTrack;
      let lastEffect = activeEffect;
      try {
        shouldTrack = true;
        activeEffect = this;
        this._runnings++;
        preCleanupEffect(this);
        return this.fn();
      } finally {
        postCleanupEffect(this);
        this._runnings--;
        activeEffect = lastEffect;
        shouldTrack = lastShouldTrack;
      }
    }
    stop() {
      if (this.active) {
        preCleanupEffect(this);
        postCleanupEffect(this);
        this.onStop && this.onStop();
        this.active = false;
      }
    }
  }
  function triggerComputed(computed) {
    return computed.value;
  }
  function preCleanupEffect(effect2) {
    effect2._trackId++;
    effect2._depsLength = 0;
  }
  function postCleanupEffect(effect2) {
    if (effect2.deps.length > effect2._depsLength) {
      for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
        cleanupDepEffect(effect2.deps[i], effect2);
      }
      effect2.deps.length = effect2._depsLength;
    }
  }
  function cleanupDepEffect(dep, effect2) {
    const trackId = dep.get(effect2);
    if (trackId !== void 0 && effect2._trackId !== trackId) {
      dep.delete(effect2);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
  function effect(fn, options) {
    if (fn.effect instanceof ReactiveEffect) {
      fn = fn.effect.fn;
    }
    const _effect = new ReactiveEffect(fn, NOOP$1, () => {
      if (_effect.dirty) {
        _effect.run();
      }
    });
    if (options) {
      extend(_effect, options);
      if (options.scope) recordEffectScope(_effect, options.scope);
    }
    if (!options || !options.lazy) {
      _effect.run();
    }
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
  }
  function stop(runner) {
    runner.effect.stop();
  }
  let shouldTrack = true;
  let pauseScheduleStack = 0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function pauseScheduling() {
    pauseScheduleStack++;
  }
  function resetScheduling() {
    pauseScheduleStack--;
    while (!pauseScheduleStack && queueEffectSchedulers.length) {
      queueEffectSchedulers.shift()();
    }
  }
  function trackEffect(effect2, dep, debuggerEventExtraInfo) {
    if (dep.get(effect2) !== effect2._trackId) {
      dep.set(effect2, effect2._trackId);
      const oldDep = effect2.deps[effect2._depsLength];
      if (oldDep !== dep) {
        if (oldDep) {
          cleanupDepEffect(oldDep, effect2);
        }
        effect2.deps[effect2._depsLength++] = dep;
      } else {
        effect2._depsLength++;
      }
    }
  }
  const queueEffectSchedulers = [];
  function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
    pauseScheduling();
    for (const effect2 of dep.keys()) {
      let tracking;
      if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
        effect2._dirtyLevel = dirtyLevel;
      }
      if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2.trigger();
        if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
          effect2._shouldSchedule = false;
          if (effect2.scheduler) {
            queueEffectSchedulers.push(effect2.scheduler);
          }
        }
      }
    }
    resetScheduling();
  }

  const createDep = (cleanup, computed) => {
    const dep = /* @__PURE__ */ new Map();
    dep.cleanup = cleanup;
    dep.computed = computed;
    return dep;
  };

  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = Symbol("");
  const MAP_KEY_ITERATE_KEY = Symbol("");
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
      }
      trackEffect(
        activeEffect,
        dep);
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray$1(target)) {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    pauseScheduling();
    for (const dep of deps) {
      if (dep) {
        triggerEffects(
          dep,
          4);
      }
    }
    resetScheduling();
  }
  function getDepFromReactive(object, key) {
    const depsMap = targetMap.get(object);
    return depsMap && depsMap.get(key);
  }

  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        pauseScheduling();
        const res = toRaw(this)[key].apply(this, args);
        resetScheduling();
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray$1(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject$1(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged$1(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray$1(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
    true
  );
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged$1(key, rawKey)) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged$1(key, rawKey)) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set(key, value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged$1(value, oldValue)) {
      trigger(target, "set", key, value);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow2) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap$1(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add(value) {
        return add.call(this, value, true);
      },
      set(key, value) {
        return set.call(this, key, value, true);
      },
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(
        method,
        true,
        true
      );
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations
  ] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };

  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1 /* COMMON */;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2 /* COLLECTION */;
      default:
        return 0 /* INVALID */;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$1(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly, isSSR) {
      this.getter = getter;
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this["__v_isReadonly"] = false;
      this.effect = new ReactiveEffect(
        () => getter(this._value),
        () => triggerRefValue(
          this,
          this.effect._dirtyLevel === 2 ? 2 : 3
        )
      );
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly;
    }
    get value() {
      const self = toRaw(this);
      if ((!self._cacheable || self.effect.dirty) && hasChanged$1(self._value, self._value = self.effect.run())) {
        triggerRefValue(self, 4);
      }
      trackRefValue(self);
      if (self.effect._dirtyLevel >= 2) {
        triggerRefValue(self, 2);
      }
      return self._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(v) {
      this.effect.dirty = v;
    }
    // #endregion
  }
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction$1(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP$1;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }

  function trackRefValue(ref2) {
    var _a;
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      trackEffect(
        activeEffect,
        (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
          () => ref2.dep = void 0,
          ref2 instanceof ComputedRefImpl ? ref2 : void 0
        ));
    }
  }
  function triggerRefValue(ref2, dirtyLevel = 4, newVal, oldVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      triggerEffects(
        dep,
        dirtyLevel);
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal);
      if (hasChanged$1(newVal, this._rawValue)) {
        this._rawValue;
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal);
        triggerRefValue(this, 4);
      }
    }
  }
  function triggerRef(ref2) {
    triggerRefValue(ref2, 4);
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  function toValue(source) {
    return isFunction$1(source) ? source() : unref(source);
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class CustomRefImpl {
    constructor(factory) {
      this.dep = void 0;
      this.__v_isRef = true;
      const { get, set } = factory(
        () => trackRefValue(this),
        () => triggerRefValue(this)
      );
      this._get = get;
      this._set = set;
    }
    get value() {
      return this._get();
    }
    set value(newVal) {
      this._set(newVal);
    }
  }
  function customRef(factory) {
    return new CustomRefImpl(factory);
  }
  function toRefs(object) {
    const ret = isArray$1(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this.__v_isRef = true;
    }
    get value() {
      const val = this._object[this._key];
      return val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  }
  class GetterRefImpl {
    constructor(_getter) {
      this._getter = _getter;
      this.__v_isRef = true;
      this.__v_isReadonly = true;
    }
    get value() {
      return this._getter();
    }
  }
  function toRef(source, key, defaultValue) {
    if (isRef(source)) {
      return source;
    } else if (isFunction$1(source)) {
      return new GetterRefImpl(source);
    } else if (isObject$1(source) && arguments.length > 1) {
      return propertyToRef(source, key, defaultValue);
    } else {
      return ref(source);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
  }
  const ReactiveFlags = {
    "SKIP": "__v_skip",
    "IS_REACTIVE": "__v_isReactive",
    "IS_READONLY": "__v_isReadonly",
    "IS_SHALLOW": "__v_isShallow",
    "RAW": "__v_raw"
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const NOOP = () => { };
  const { isArray } = Array;
  function getType(x) {
      return Object.prototype.toString.call(x).slice(8, -1);
  }
  function isSimpleValue(x) {
      const simpleTypes = new Set(["undefined", "boolean", "number", "string"]);
      return x === null || simpleTypes.has(typeof x);
  }
  function isObject(x) {
      return x !== null && typeof x === "object";
  }
  function isPlainObject(x) {
      return getType(x) === "Object";
  }
  function isFunction(x) {
      return typeof x === "function";
  }
  function isMap(x) {
      return getType(x) === "Map";
  }
  function isSet(x) {
      return getType(x) === "Set";
  }
  // Compare whether a value has changed, accounting for NaN.
  function hasChanged(value, oldValue) {
      // eslint-disable-next-line no-self-compare
      return value !== oldValue && (value === value || oldValue === oldValue);
  }
  function remove(arr, el) {
      const i = arr.indexOf(el);
      if (i > -1) {
          arr.splice(i, 1);
      }
  }

  var __DEV__ = false;
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  // eslint-disable-next-line spaced-comment
  const resolvedPromise = /*#__PURE__*/ Promise.resolve();
  function queueJob(job) {
      // The dedupe search uses the startIndex argument of Array.includes()
      // by default the search index includes the current job that is being run
      // so it cannot recursively trigger itself again.
      // if the job is a watch() callback, the search will start with a +1 index to
      // allow it recursively trigger itself - it is the user's responsibility to
      // ensure it doesn't end up in an infinite loop.
      if (queue.length === 0 ||
          !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
          queue.push(job);
          queueFlush();
      }
  }
  function queueFlush() {
      if (!isFlushing && !isFlushPending) {
          isFlushPending = true;
          // eslint-disable-next-line promise/prefer-await-to-then
          resolvedPromise.then(flushJobs);
      }
  }
  function queuePostFlushCb(cb) {
      if (!activePostFlushCbs ||
          !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
          pendingPostFlushCbs.push(cb);
      }
  }
  function flushPostFlushCbs() {
      if (pendingPostFlushCbs.length > 0) {
          activePostFlushCbs = [...new Set(pendingPostFlushCbs)];
          pendingPostFlushCbs.length = 0;
          for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
              const cb = activePostFlushCbs[postFlushIndex];
              if (cb.active !== false)
                  cb();
          }
          activePostFlushCbs = null;
          postFlushIndex = 0;
      }
  }
  function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      // Conditional usage of checkRecursiveUpdate must be determined out of
      // try ... catch block since Rollup by default de-optimizes treeshaking
      // inside try-catch. This can leave all warning code unshaked. Although
      // they would get eventually shaken by a minifier like terser, some minifiers
      // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
      const check = /* istanbul ignore next -- @preserve  */ NOOP;
      try {
          for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
              const job = queue[flushIndex];
              if (job.active !== false) {
                  /* istanbul ignore if -- @preserve  */
                  if (__DEV__ && check(job)) ;
                  job();
              }
          }
      }
      finally {
          flushIndex = 0;
          queue.length = 0;
          isFlushing = false;
      }
  }

  // Simple effect.
  function watchEffect(effect, options) {
      return doWatch(effect, null, options);
  }
  function watchPostEffect(effect, options) {
      return doWatch(effect, null, /* istanbul ignore next -- @preserve */ { flush: "post" });
  }
  function watchSyncEffect(effect, options) {
      return doWatch(effect, null, /* istanbul ignore next -- @preserve */ { flush: "sync" });
  }
  // Initial value for watchers to trigger on undefined initial values
  const INITIAL_WATCHER_VALUE = {};
  // Implementation
  function watch(source, cb, options) {
      return doWatch(source, cb, options);
  }
  // eslint-disable-next-line complexity
  function doWatch(source, cb, { immediate, deep, flush, once, onTrack, onTrigger } = {}) {
      if (cb && once) {
          const _cb = cb;
          cb = (...args) => {
              _cb(...args);
              unwatch();
          };
      }
      const reactiveGetter = (source) => deep === true
          ? source // Traverse will happen in wrapped getter below
          : // For deep: false, only traverse root-level properties
              traverse(source, deep === false ? 1 : undefined);
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
          getter = () => source.value;
          forceTrigger = isShallow(source);
      }
      else if (isReactive(source)) {
          getter = () => reactiveGetter(source);
          forceTrigger = true;
      }
      else if (isArray(source)) {
          isMultiSource = true;
          forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
          getter = () => source.map((s) => {
              if (isRef(s)) {
                  return s.value;
              }
              if (isReactive(s)) {
                  return reactiveGetter(s);
              }
              if (isFunction(s)) {
                  return s();
              }
              return undefined;
          });
      }
      else if (isFunction(source)) {
          if (cb) {
              // Getter with cb
              getter = () => source();
          }
          else {
              // No cb -> simple effect
              getter = () => {
                  if (cleanup) {
                      cleanup();
                  }
                  return source(onCleanup);
              };
          }
      }
      else {
          getter = NOOP;
      }
      if (cb && deep) {
          const baseGetter = getter;
          getter = () => traverse(baseGetter());
      }
      let cleanup;
      const onCleanup = (fn) => {
          // eslint-disable-next-line no-multi-assign
          cleanup = effect.onStop = () => {
              fn();
              // eslint-disable-next-line no-multi-assign
              cleanup = effect.onStop = undefined;
          };
      };
      let oldValue = isMultiSource
          ? Array.from({ length: source.length }).fill(INITIAL_WATCHER_VALUE)
          : INITIAL_WATCHER_VALUE;
      const job = () => {
          if (!effect.active || !effect.dirty) {
              return;
          }
          if (cb) {
              // Watch(source, cb)
              const newValue = effect.run();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                      : hasChanged(newValue, oldValue))) {
                  // Cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  cb(newValue, 
                  // Pass undefined as the old value when it's changed for the first time
                  oldValue === INITIAL_WATCHER_VALUE
                      ? undefined
                      : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
                          ? []
                          : oldValue, onCleanup);
                  oldValue = newValue;
              }
          }
          else {
              // WatchEffect
              effect.run();
          }
      };
      // Important: mark the job as a watcher callback so that scheduler knows
      // it is allowed to self-trigger
      job.allowRecurse = Boolean(cb);
      let scheduler;
      if (flush === "sync") {
          scheduler = job; // The scheduler function gets called directly
      }
      else if (flush === "post") {
          scheduler = () => {
              queuePostFlushCb(job);
          };
      }
      else {
          scheduler = () => {
              queueJob(job);
          };
      }
      const effect = new ReactiveEffect(getter, NOOP, scheduler);
      const scope = getCurrentScope();
      const unwatch = () => {
          effect.stop();
          if (scope) {
              // @ts-expect-error
              remove(scope.effects, effect);
          }
      };
      // Initial run
      if (cb) {
          if (immediate) {
              job();
          }
          else {
              oldValue = effect.run();
          }
      }
      else {
          effect.run();
      }
      return unwatch;
  }
  function traverse(value, depth = Number.POSITIVE_INFINITY, seen) {
      if (depth <= 0 || !isObject(value) || value[ReactiveFlags.SKIP]) {
          return value;
      }
      seen = seen || new Set();
      if (seen.has(value)) {
          return value;
      }
      seen.add(value);
      depth--;
      /* istanbul ignore else -- @preserve  */
      if (isRef(value)) {
          traverse(value.value, depth, seen);
      }
      else if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
              traverse(value[i], depth, seen);
          }
      }
      else if (isSet(value) || isMap(value)) {
          value.forEach((v) => {
              traverse(v, depth, seen);
          });
      }
      else if (isPlainObject(value)) {
          // eslint-disable-next-line guard-for-in
          for (const key in value) {
              traverse(value[key], depth, seen);
          }
          for (const key of Object.getOwnPropertySymbols(value)) {
              if (Object.prototype.propertyIsEnumerable.call(value, key)) {
                  traverse(value[key], depth, seen);
              }
          }
      }
      return value;
  }

  function deepToRaw(x) {
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
          const obj = {};
          Object.keys(x).forEach((key) => {
              obj[key] = deepToRaw(x[key]);
          });
          return obj;
      }
      throw new TypeError(`${getType(x)} value is not supported`);
  }
  function deepWatch(instance, key, value) {
      if (!isObject(value)) {
          return;
      }
      watch(isRef(value) ? value : () => value, () => {
          instance.setData({ [key]: deepToRaw(value) }, flushPostFlushCbs);
      }, {
          deep: true,
      });
  }

  let _currentPage = null;
  let _currentComponent = null;
  const methodEmit = (instance, options, lifetimesKey, ...args) => {
      if (options && options[lifetimesKey]) {
          options[lifetimesKey](...args);
      }
      if (!instance[`$${lifetimesKey}`]) {
          return;
      }
      const eventBackMap = {
          onLoad: "onUnload",
          onShow: "onHide",
          attached: "detached",
      };
      const lifetimesBackKey = eventBackMap[lifetimesKey];
      instance[`$${lifetimesKey}`].forEach((fn) => {
          // 反面有没有对应的off
          if (lifetimesBackKey) {
              const backFn = instance[`$${lifetimesBackKey}`] &&
                  instance[`$${lifetimesBackKey}`].find((x) => x.front === fn);
              if (backFn) {
                  backFn();
              }
          }
          const off = fn.apply(instance, args);
          // 调用是否返回函数，用于销毁
          if (lifetimesBackKey && typeof off === "function") {
              let backFn = instance[`$${lifetimesBackKey}`] &&
                  instance[`$${lifetimesBackKey}`].find((x) => x.front === fn);
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
  const methodOnce = (instance, options, lifetimesKey, ...args) => {
      if (options && options[lifetimesKey]) {
          return options[lifetimesKey](...args);
      }
      if (!instance[`$${lifetimesKey}`]) {
          return;
      }
      if (instance[`$${lifetimesKey}`].length) {
          throw new Error(`一个page只能配置一个${lifetimesKey}`);
      }
      return instance[`$${lifetimesKey}`][0].apply(instance, args);
  };
  const methodOn = (instance, lifetimesKey, hook) => {
      if (!instance) {
          return;
      }
      if (!instance[`$${lifetimesKey}`]) {
          instance[`$${lifetimesKey}`] = [];
      }
      instance[`$${lifetimesKey}`].push(hook);
  };
  /**
   * 创建页面并关联生命周期函数
   * @param hook - Hook 函数或包含 setup 的对象
   */
  const definePage = (hook) => {
      if (!hook) {
          return Page({});
      }
      let options = {};
      if (typeof hook !== "function") {
          const { setup, ...other } = hook;
          options = other || {};
          hook = setup;
      }
      if (!hook) {
          return Page(options);
      }
      Page({
          ...options,
          // 生命周期回调函数
          onLoad(query) {
              _currentPage = this;
              this.$scope = effectScope();
              this.$query = query;
              this.$context = {};
              this.$scope.run(() => {
                  const bindings = hook.call(this, this.$query, this.$context);
                  if (bindings !== undefined) {
                      Object.keys(bindings).forEach((key) => {
                          const value = bindings[key];
                          if (isFunction(value)) {
                              this[key] = value;
                              return;
                          }
                          this.setData({ [key]: deepToRaw(value) });
                          deepWatch(this, key, value);
                      });
                  }
                  methodEmit(this, options, "onLoad", query);
              });
              _currentPage = null;
          },
          onShow() {
              methodEmit(this, options, "onShow");
          },
          onReady() {
              methodEmit(this, options, "onReady");
          },
          onHide() {
              methodEmit(this, options, "onHide");
          },
          onUnload() {
              methodEmit(this, options, "onUnload");
              if (this.$scope) {
                  this.$scope.stop();
              }
              // 手动销毁
              Object.keys(this).forEach((key) => {
                  try {
                      delete this[key];
                  }
                  catch (ex) {
                      console.error("销毁异常", ex);
                  }
              });
          },
          onRouteDone() {
              methodEmit(this, options, "onRouteDone");
          },
          // 页面事件处理函数
          onPullDownRefresh() {
              methodEmit(this, options, "onPullDownRefresh");
          },
          onReachBottom() {
              methodEmit(this, options, "onReachBottom");
          },
          onPageScroll(event) {
              methodEmit(this, options, "onPageScroll", event);
          },
          onAddToFavorites(object) {
              return methodOnce(this, options, "onAddToFavorites", object);
          },
          onShareAppMessage(event) {
              return methodOnce(this, options, "onShareAppMessage", event);
          },
          onShareTimeline() {
              return methodOnce(this, options, "onShareTimeline");
          },
          onResize(event) {
              methodEmit(this, options, "onResize", event);
          },
          onTabItemTap(object) {
              methodEmit(this, options, "onTabItemTap", object);
          },
          onSaveExitState() {
              methodEmit(this, options, "onSaveExitState");
          },
      });
  };
  const usePage = () => {
      return _currentPage;
  };
  const onLoad = (hook) => methodOn(usePage(), "onLoad", hook);
  const onShow = (hook) => methodOn(usePage(), "onShow", hook);
  const onReady = (hook) => methodOn(usePage(), "onReady", hook);
  const onHide = (hook) => methodOn(usePage(), "onHide", hook);
  const onUnload = (hook) => methodOn(usePage(), "onUnload", hook);
  const onRouteDone = (hook) => methodOn(usePage(), "onRouteDone", hook);
  const onPullDownRefresh = (hook) => methodOn(usePage(), "onPullDownRefresh", hook);
  const onReachBottom = (hook) => methodOn(usePage(), "onReachBottom", hook);
  const onPageScroll = (hook) => methodOn(usePage(), "onPageScroll", hook);
  const onAddToFavorites = (hook) => methodOn(usePage(), "onAddToFavorites", hook);
  const onShareAppMessage = (hook) => methodOn(usePage(), "onShareAppMessage", hook);
  const onShareTimeline = (hook) => methodOn(usePage(), "onShareTimeline", hook);
  const onResize = (hook) => methodOn(usePage(), "onResize", hook);
  const onTabItemTap = (hook) => methodOn(usePage(), "onTabItemTap", hook);
  const onSaveExitState = (hook) => methodOn(usePage(), "onSaveExitState", hook);
  /**
   * 创建组件并关联生命周期函数
   * @param hook - Hook 函数或包含 setup 的对象
   */
  const defineComponent = (hook) => {
      if (!hook) {
          return Component({});
      }
      let options = {};
      if (typeof hook !== "function") {
          const { setup, ...other } = hook;
          options = other;
          hook = setup;
      }
      if (!hook) {
          return Component(options);
      }
      let properties = null;
      if (options.properties) {
          properties = Object.keys(options.properties);
      }
      if (properties) {
          if (options.observers === undefined) {
              options.observers = {};
          }
          properties.forEach((property) => {
              //@ts-expect-error 不要报错
              const originObserver = options.observers[property];
              //@ts-expect-error 不要报错
              options.observers[property] = function (value) {
                  // Observer executes before attached
                  if (this.$props) {
                      //@ts-expect-error 不要报错
                      this.$props[property] = value;
                  }
                  if (originObserver !== undefined) {
                      originObserver.call(this, value);
                  }
              };
          });
      }
      Component({
          ...options,
          lifetimes: {
              attached() {
                  _currentComponent = this;
                  //@ts-expect-error 增加作用域
                  this.$scope = effectScope();
                  const rawProps = {};
                  if (properties) {
                      properties.forEach((property) => {
                          rawProps[property] = this.data[property];
                      });
                  }
                  //@ts-expect-error 增加的props
                  this.$props = shallowReactive(rawProps);
                  // this.$props = shallowReactive(
                  //   new Proxy(this.properties, {
                  //     set: (target, key, value, receiver) => {
                  //       this.setData({
                  //         [key]: value,
                  //       });
                  //       // 发送自定义事件，传递数据
                  //       this.triggerEvent(key as string, { value });
                  //       return Reflect.set(target, key, value, receiver);
                  //     },
                  //   })
                  // );
                  //@ts-expect-error 增加context
                  this.$context = {
                      emit: (key, value) => {
                          this.triggerEvent(key, { value });
                      },
                  };
                  //@ts-expect-error 增加作用域
                  this.$scope.run(() => {
                      //@ts-expect-error 不要报错
                      const bindings = hook.call(this, this.$props, this.$context);
                      if (bindings !== undefined) {
                          Object.keys(bindings).forEach((key) => {
                              const value = bindings[key];
                              if (isFunction(value)) {
                                  this[key] = value;
                                  return;
                              }
                              this.setData({ [key]: deepToRaw(value) });
                              deepWatch(this, key, value);
                          });
                      }
                      methodEmit(this, options, "attached");
                  });
                  _currentComponent = null;
              },
              ready() {
                  methodEmit(this, options, "ready");
              },
              moved() {
                  methodEmit(this, options, "moved");
              },
              detached() {
                  methodEmit(this, options, "detached");
                  if (this.$scope) {
                      //@ts-expect-error 增加作用域
                      this.$scope.stop();
                  }
                  // 手动销毁
                  Object.keys(this).forEach((key) => {
                      try {
                          delete this[key];
                      }
                      catch (ex) {
                          console.error("销毁异常", ex);
                      }
                  });
              },
              error(err) {
                  methodEmit(this, options, "error", err);
              },
          },
      });
  };
  const useComponent = () => _currentComponent;
  const attached = (hook) => methodOn(useComponent(), "attached", hook);
  const ready = (hook) => methodOn(useComponent(), "ready", hook);
  const moved = (hook) => methodOn(useComponent(), "moved", hook);
  const detached = (hook) => methodOn(useComponent(), "detached", hook);
  const error = (hook) => methodOn(useComponent(), "error", hook);

  exports.EffectScope = EffectScope;
  exports.ReactiveEffect = ReactiveEffect;
  exports.attached = attached;
  exports.computed = computed;
  exports.customRef = customRef;
  exports.defineComponent = defineComponent;
  exports.definePage = definePage;
  exports.detached = detached;
  exports.effect = effect;
  exports.effectScope = effectScope;
  exports.error = error;
  exports.getCurrentScope = getCurrentScope;
  exports.isProxy = isProxy;
  exports.isReactive = isReactive;
  exports.isReadonly = isReadonly;
  exports.isRef = isRef;
  exports.isShallow = isShallow;
  exports.markRaw = markRaw;
  exports.moved = moved;
  exports.onAddToFavorites = onAddToFavorites;
  exports.onHide = onHide;
  exports.onLoad = onLoad;
  exports.onPageScroll = onPageScroll;
  exports.onPullDownRefresh = onPullDownRefresh;
  exports.onReachBottom = onReachBottom;
  exports.onReady = onReady;
  exports.onResize = onResize;
  exports.onRouteDone = onRouteDone;
  exports.onSaveExitState = onSaveExitState;
  exports.onScopeDispose = onScopeDispose;
  exports.onShareAppMessage = onShareAppMessage;
  exports.onShareTimeline = onShareTimeline;
  exports.onShow = onShow;
  exports.onTabItemTap = onTabItemTap;
  exports.onUnload = onUnload;
  exports.proxyRefs = proxyRefs;
  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.ready = ready;
  exports.ref = ref;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;
  exports.shallowRef = shallowRef;
  exports.stop = stop;
  exports.toRaw = toRaw;
  exports.toRef = toRef;
  exports.toRefs = toRefs;
  exports.toValue = toValue;
  exports.triggerRef = triggerRef;
  exports.unref = unref;
  exports.useComponent = useComponent;
  exports.usePage = usePage;
  exports.watch = watch;
  exports.watchEffect = watchEffect;
  exports.watchPostEffect = watchPostEffect;
  exports.watchSyncEffect = watchSyncEffect;

}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1724419480849);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map