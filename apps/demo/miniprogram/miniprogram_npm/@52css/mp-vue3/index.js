module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1723247185708, function(require, module, exports) {
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MpVue3={})}(this,(function(t){
/**
  * @vue/shared v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
/*! #__NO_SIDE_EFFECTS__ */function e(t,e){const n=new Set(t.split(","));return t=>n.has(t)}const n=()=>{},s=Object.assign,o=Object.prototype.hasOwnProperty,i=(t,e)=>o.call(t,e),r=Array.isArray,c=t=>"[object Map]"===f(t),l=t=>"function"==typeof t,a=t=>"symbol"==typeof t,u=t=>null!==t&&"object"==typeof t,h=Object.prototype.toString,f=t=>h.call(t),d=t=>f(t).slice(8,-1),p=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,_=(t,e)=>!Object.is(t,e);
/**
  * @vue/reactivity v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
let v,g;class y{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=v,!t&&v&&(this.index=(v.scopes||(v.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=v;try{return v=this,t()}finally{v=e}}}on(){v=this}off(){v=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function w(t,e=v){e&&e.active&&e.effects.push(t)}function S(){return v}class R{constructor(t,e,n,s){this.fn=t,this.trigger=e,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,w(this,s)}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,I();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(m(e.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),j()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=E,e=g;try{return E=!0,g=this,this._runnings++,b(this),this.fn()}finally{P(this),this._runnings--,g=e,E=t}}stop(){this.active&&(b(this),P(this),this.onStop&&this.onStop(),this.active=!1)}}function m(t){return t.value}function b(t){t._trackId++,t._depsLength=0}function P(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)L(t.deps[e],t);t.deps.length=t._depsLength}}function L(t,e){const n=t.get(e);void 0!==n&&e._trackId!==n&&(t.delete(e),0===t.size&&t.cleanup())}let E=!0,O=0;const k=[];function I(){k.push(E),E=!1}function j(){const t=k.pop();E=void 0===t||t}function A(){O++}function T(){for(O--;!O&&$.length;)$.shift()()}function x(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const n=t.deps[t._depsLength];n!==e?(n&&L(n,t),t.deps[t._depsLength++]=e):t._depsLength++}}const $=[];function M(t,e,n){A();for(const n of t.keys()){let s;n._dirtyLevel<e&&(null!=s?s:s=t.get(n)===n._trackId)&&(n._shouldSchedule||(n._shouldSchedule=0===n._dirtyLevel),n._dirtyLevel=e),n._shouldSchedule&&(null!=s?s:s=t.get(n)===n._trackId)&&(n.trigger(),n._runnings&&!n.allowRecurse||2===n._dirtyLevel||(n._shouldSchedule=!1,n.scheduler&&$.push(n.scheduler)))}T()}const N=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},z=new WeakMap,D=Symbol(""),V=Symbol("");function C(t,e,n){if(E&&g){let e=z.get(t);e||z.set(t,e=new Map);let s=e.get(n);s||e.set(n,s=N((()=>e.delete(n)))),x(g,s)}}function H(t,e,n,s,o,i){const l=z.get(t);if(!l)return;let u=[];if("clear"===e)u=[...l.values()];else if("length"===n&&r(t)){const t=Number(s);l.forEach(((e,n)=>{("length"===n||!a(n)&&n>=t)&&u.push(e)}))}else switch(void 0!==n&&u.push(l.get(n)),e){case"add":r(t)?p(n)&&u.push(l.get("length")):(u.push(l.get(D)),c(t)&&u.push(l.get(V)));break;case"delete":r(t)||(u.push(l.get(D)),c(t)&&u.push(l.get(V)));break;case"set":c(t)&&u.push(l.get(D))}A();for(const t of u)t&&M(t,4);T()}const F=e("__proto__,__v_isRef,__isVue"),W=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(a)),U=B();function B(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const n=Tt(this);for(let t=0,e=this.length;t<e;t++)C(n,0,t+"");const s=n[e](...t);return-1===s||!1===s?n[e](...t.map(Tt)):s}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){I(),A();const n=Tt(this)[e].apply(this,t);return T(),j(),n}})),t}function K(t){a(t)||(t=String(t));const e=Tt(this);return C(e,0,t),e.hasOwnProperty(t)}class Y{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){const s=this._isReadonly,o=this._isShallow;if("__v_isReactive"===e)return!s;if("__v_isReadonly"===e)return s;if("__v_isShallow"===e)return o;if("__v_raw"===e)return n===(s?o?Lt:Pt:o?bt:mt).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const c=r(t);if(!s){if(c&&i(U,e))return Reflect.get(U,e,n);if("hasOwnProperty"===e)return K}const l=Reflect.get(t,e,n);return(a(e)?W.has(e):F(e))?l:(s||C(t,0,e),o?l:Dt(l)?c&&p(e)?l:l.value:u(l)?s?Ot(l):Et(l):l)}}class q extends Y{constructor(t=!1){super(!1,t)}set(t,e,n,s){let o=t[e];if(!this._isShallow){const e=jt(o);if(At(n)||jt(n)||(o=Tt(o),n=Tt(n)),!r(t)&&Dt(o)&&!Dt(n))return!e&&(o.value=n,!0)}const c=r(t)&&p(e)?Number(e)<t.length:i(t,e),l=Reflect.set(t,e,n,s);return t===Tt(s)&&(c?_(n,o)&&H(t,"set",e,n):H(t,"add",e,n)),l}deleteProperty(t,e){const n=i(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&H(t,"delete",e,void 0),s}has(t,e){const n=Reflect.has(t,e);return a(e)&&W.has(e)||C(t,0,e),n}ownKeys(t){return C(t,0,r(t)?"length":D),Reflect.ownKeys(t)}}class G extends Y{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const J=new q,Q=new G,X=new q(!0),Z=new G(!0),tt=t=>t,et=t=>Reflect.getPrototypeOf(t);function nt(t,e,n=!1,s=!1){const o=Tt(t=t.__v_raw),i=Tt(e);n||(_(e,i)&&C(o,0,e),C(o,0,i));const{has:r}=et(o),c=s?tt:n?$t:xt;return r.call(o,e)?c(t.get(e)):r.call(o,i)?c(t.get(i)):void(t!==o&&t.get(e))}function st(t,e=!1){const n=this.__v_raw,s=Tt(n),o=Tt(t);return e||(_(t,o)&&C(s,0,t),C(s,0,o)),t===o?n.has(t):n.has(t)||n.has(o)}function ot(t,e=!1){return t=t.__v_raw,!e&&C(Tt(t),0,D),Reflect.get(t,"size",t)}function it(t,e=!1){e||At(t)||jt(t)||(t=Tt(t));const n=Tt(this);return et(n).has.call(n,t)||(n.add(t),H(n,"add",t,t)),this}function rt(t,e,n=!1){n||At(e)||jt(e)||(e=Tt(e));const s=Tt(this),{has:o,get:i}=et(s);let r=o.call(s,t);r||(t=Tt(t),r=o.call(s,t));const c=i.call(s,t);return s.set(t,e),r?_(e,c)&&H(s,"set",t,e):H(s,"add",t,e),this}function ct(t){const e=Tt(this),{has:n,get:s}=et(e);let o=n.call(e,t);o||(t=Tt(t),o=n.call(e,t)),s&&s.call(e,t);const i=e.delete(t);return o&&H(e,"delete",t,void 0),i}function lt(){const t=Tt(this),e=0!==t.size,n=t.clear();return e&&H(t,"clear",void 0,void 0),n}function at(t,e){return function(n,s){const o=this,i=o.__v_raw,r=Tt(i),c=e?tt:t?$t:xt;return!t&&C(r,0,D),i.forEach(((t,e)=>n.call(s,c(t),c(e),o)))}}function ut(t,e,n){return function(...s){const o=this.__v_raw,i=Tt(o),r=c(i),l="entries"===t||t===Symbol.iterator&&r,a="keys"===t&&r,u=o[t](...s),h=n?tt:e?$t:xt;return!e&&C(i,0,a?V:D),{next(){const{value:t,done:e}=u.next();return e?{value:t,done:e}:{value:l?[h(t[0]),h(t[1])]:h(t),done:e}},[Symbol.iterator](){return this}}}}function ht(t){return function(...e){return"delete"!==t&&("clear"===t?void 0:this)}}function ft(){const t={get(t){return nt(this,t)},get size(){return ot(this)},has:st,add:it,set:rt,delete:ct,clear:lt,forEach:at(!1,!1)},e={get(t){return nt(this,t,!1,!0)},get size(){return ot(this)},has:st,add(t){return it.call(this,t,!0)},set(t,e){return rt.call(this,t,e,!0)},delete:ct,clear:lt,forEach:at(!1,!0)},n={get(t){return nt(this,t,!0)},get size(){return ot(this,!0)},has(t){return st.call(this,t,!0)},add:ht("add"),set:ht("set"),delete:ht("delete"),clear:ht("clear"),forEach:at(!0,!1)},s={get(t){return nt(this,t,!0,!0)},get size(){return ot(this,!0)},has(t){return st.call(this,t,!0)},add:ht("add"),set:ht("set"),delete:ht("delete"),clear:ht("clear"),forEach:at(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((o=>{t[o]=ut(o,!1,!1),n[o]=ut(o,!0,!1),e[o]=ut(o,!1,!0),s[o]=ut(o,!0,!0)})),[t,n,e,s]}const[dt,pt,_t,vt]=ft();function gt(t,e){const n=e?t?vt:_t:t?pt:dt;return(e,s,o)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(i(n,s)&&s in e?n:e,s,o)}const yt={get:gt(!1,!1)},wt={get:gt(!1,!0)},St={get:gt(!0,!1)},Rt={get:gt(!0,!0)},mt=new WeakMap,bt=new WeakMap,Pt=new WeakMap,Lt=new WeakMap;function Et(t){return jt(t)?t:kt(t,!1,J,yt,mt)}function Ot(t){return kt(t,!0,Q,St,Pt)}function kt(t,e,n,s,o){if(!u(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const i=o.get(t);if(i)return i;const r=(c=t).__v_skip||!Object.isExtensible(c)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(d(c));var c;if(0===r)return t;const l=new Proxy(t,2===r?s:n);return o.set(t,l),l}function It(t){return jt(t)?It(t.__v_raw):!(!t||!t.__v_isReactive)}function jt(t){return!(!t||!t.__v_isReadonly)}function At(t){return!(!t||!t.__v_isShallow)}function Tt(t){const e=t&&t.__v_raw;return e?Tt(e):t}const xt=t=>u(t)?Et(t):t,$t=t=>u(t)?Ot(t):t;class Mt{constructor(t,e,n,s){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new R((()=>t(this._value)),(()=>zt(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const t=Tt(this);return t._cacheable&&!t.effect.dirty||!_(t._value,t._value=t.effect.run())||zt(t,4),Nt(t),t.effect._dirtyLevel>=2&&zt(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Nt(t){var e;E&&g&&(t=Tt(t),x(g,null!=(e=t.dep)?e:t.dep=N((()=>t.dep=void 0),t instanceof Mt?t:void 0)))}function zt(t,e=4,n,s){const o=(t=Tt(t)).dep;o&&M(o,e)}function Dt(t){return!(!t||!0!==t.__v_isRef)}function Vt(t){return Ct(t,!1)}function Ct(t,e){return Dt(t)?t:new Ht(t,e)}class Ht{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:Tt(t),this._value=e?t:xt(t)}get value(){return Nt(this),this._value}set value(t){const e=this.__v_isShallow||At(t)||jt(t);t=e?t:Tt(t),_(t,this._rawValue)&&(this._rawValue,this._rawValue=t,this._value=e?t:xt(t),zt(this,4))}}function Ft(t){return Dt(t)?t.value:t}const Wt={get:(t,e,n)=>Ft(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return Dt(o)&&!Dt(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};function Ut(t){return It(t)?t:new Proxy(t,Wt)}class Bt{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:n}=t((()=>Nt(this)),(()=>zt(this)));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}class Kt{constructor(t,e,n){this._object=t,this._key=e,this._defaultValue=n,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return function(t,e){const n=z.get(t);return n&&n.get(e)}(Tt(this._object),this._key)}}class Yt{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function qt(t,e,n){const s=t[e];return Dt(s)?s:new Kt(t,e,n)}const Gt={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",IS_SHALLOW:"__v_isShallow",RAW:"__v_raw"},Jt=()=>{},{isArray:Qt}=Array;function Xt(t){return Object.prototype.toString.call(t).slice(8,-1)}function Zt(t){return"function"==typeof t}function te(t,e){return t!==e&&(t==t||e==e)}var ee=!1;let ne=!1,se=!1;const oe=[];let ie=0;const re=Promise.resolve();function ce(t){0!==oe.length&&oe.includes(t,ne&&t.allowRecurse?ie+1:ie)||(oe.push(t),ne||se||(se=!0,re.then(le)))}function le(t){se=!1,ne=!0;const e=/* istanbul ignore next -- @preserve  */Jt;try{for(ie=0;ie<oe.length;ie++){const t=oe[ie];!1!==t.active&&(ee&&e(t),t())}}finally{ie=0,oe.length=0,ne=!1}}const ae={};function ue(t,e,n){return he(t,e,n)}function he(t,e,{immediate:n,deep:s,flush:o,once:i,onTrack:r,onTrigger:c}={}){if(e&&i){const t=e;e=(...e)=>{t(...e),w()}}const l=t=>!0===s?t:fe(t,!1===s?1:void 0);let a,u,h=!1,f=!1;if(Dt(t)?(a=()=>t.value,h=At(t)):It(t)?(a=()=>l(t),h=!0):Qt(t)?(f=!0,h=t.some((t=>It(t)||At(t))),a=()=>t.map((t=>Dt(t)?t.value:It(t)?l(t):Zt(t)?t():void 0))):a=Zt(t)?e?()=>t():()=>(u&&u(),t(d)):Jt,e&&s){const t=a;a=()=>fe(t())}const d=t=>{u=g.onStop=()=>{t(),u=g.onStop=void 0}};let p=f?Array.from({length:t.length}).fill(ae):ae;const _=()=>{if(g.active&&g.dirty)if(e){const t=g.run();(s||h||(f?t.some(((t,e)=>te(t,p[e]))):te(t,p)))&&(u&&u(),e(t,p===ae?void 0:f&&p[0]===ae?[]:p,d),p=t)}else g.run()};let v;_.allowRecurse=Boolean(e),v="sync"===o?_:"post"===o?()=>{}:()=>{ce(_)};const g=new R(a,Jt,v),y=S(),w=()=>{g.stop(),y&&function(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}(y.effects,g)};return e?n?_():p=g.run():g.run(),w}function fe(t,e=Number.POSITIVE_INFINITY,n){if(e<=0||(null===(s=t)||"object"!=typeof s)||t[Gt.SKIP])return t;var s;if((n=n||new Set).has(t))return t;
/* istanbul ignore else -- @preserve  */
if(n.add(t),e--,Dt(t))fe(t.value,e,n);else if(Qt(t))for(let s=0;s<t.length;s++)fe(t[s],e,n);else if(function(t){return"Set"===Xt(t)}(t)||function(t){return"Map"===Xt(t)}(t))t.forEach((t=>{fe(t,e,n)}));else if(function(t){return"Object"===Xt(t)}(t)){for(const s in t)fe(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&fe(t[s],e,n)}return t}let de;function pe(t,e,n){t&&t[e]&&t[e].apply(this,n),this[`$${e}`]&&this[`$${e}`].forEach((t=>{t.apply(this,n)}))}function _e(t,e,n){if(t&&t[e])return t[e].apply(this,n);if(this[`$${e}`]){if(this[`$${e}`].length)throw new Error(`一个page只能配置一个${e}`);return this[`$${e}`][0].apply(this,n)}}function ve(t,e,n){n&&(n[`$${e}`]||(n[`$${e}`]=[]),n[`$${e}`].push(t.bind(n)))}function ge(t,e){de=t;const n=Ut(e.call(t));ue((()=>n),(e=>{(e=>{if(0===getCurrentPages().length){if(e)for(let n in e)t[n]=e[n];return}const{fields:n,methods:s}=(t=>{const e={},n={};for(const s in t)"function"==typeof t[s]?n[s]=t[s]:e[s]=t[s];return{fields:e,methods:n}})(e);Object.keys(s).forEach((e=>{t[e]=s[e]})),t.setData(n)})(e)}),{deep:!0,immediate:!0})}const ye=getApp;const we=()=>{const t=getCurrentPages();return t[t.length-1]};const Se=()=>de;t.EffectScope=y,t.ReactiveEffect=R,t.attached=t=>ve(t,"attached",Se()),t.computed=function(t,e,s=!1){let o,i;const r=l(t);return r?(o=t,i=n):(o=t.get,i=t.set),new Mt(o,i,r||!i,s)},t.createApp=function(t){if(!t)return App({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s||{},t=n}App({...e,onLaunch(n){t&&ge(this,t),pe.call(this,e,"onLaunch",[n])},onShow(){pe.call(this,e,"onShow")},onHide(){pe.call(this,e,"onHide")},onError(t){pe.call(this,e,"onError",[t])},onPageNotFound(t){pe.call(this,e,"onPageNotFound",[t])}})},t.customRef=function(t){return new Bt(t)},t.defineComponent=function(t){if(!t)return Component({options:{virtualHost:!0,styleIsolation:"apply-shared",multipleSlots:!0}});let e={},n={};if("function"!=typeof t){const{setup:s,props:o,...i}=t;e=i,n=function(t){if(!t)return{};for(let e in t){const n=t[e];if(n&&n.type&&(n.value=void 0!==n.default?n.default:n.value,Array.isArray(n.type))){const t=n.type;n.type=t[0],n.optionalTypes=void 0!==n.optionalTypes?n.optionalTypes:t}}return t}(o),t=s,"properties"in i&&console.warn('属性使用"props"')}const s=e.options,o=(t,e)=>s&&void 0!==s[t]?s[t]:e;Component({...e,options:{...s,virtualHost:o("virtualHost",!0),styleIsolation:o("styleIsolation","apply-shared"),multipleSlots:o("multipleSlots",!0)},properties:n,lifetimes:{attached(){this.emit=(t,e)=>{this.triggerEvent(t,{value:e})},t&&ge(this,t.bind(this,this.properties,this)),pe.call(this,e,"attached")},ready(){pe.call(this,e,"ready")},moved(){pe.call(this,e,"moved")},detached(){pe.call(this,e,"detached")},error(t){pe.call(this,e,"error",[t])}}})},t.definePage=function(t){if(!t)return Page({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s||{},t=n}Page({...e,onLoad(n){t&&ge(this,t),pe.call(this,e,"onLoad",[n])},onShow(){pe.call(this,e,"onShow")},onReady(){pe.call(this,e,"onReady")},onHide(){pe.call(this,e,"onHide")},onUnload(){pe.call(this,e,"onUnload")},onRouteDone(){pe.call(this,e,"onRouteDone")},onPullDownRefresh(){pe.call(this,e,"onPullDownRefresh")},onReachBottom(){pe.call(this,e,"onReachBottom")},onPageScroll(t){pe.call(this,e,"onPageScroll",[t])},onAddToFavorites(t){return _e.call(this,e,"onAddToFavorites",[t])},onShareAppMessage(t){return _e.call(this,e,"onShareAppMessage",[t])},onShareTimeline(){return _e.call(this,e,"onShareTimeline")},onResize(t){pe.call(this,e,"onResize",[t])},onTabItemTap(t){pe.call(this,e,"onTabItemTap",[t])},onSaveExitState(){pe.call(this,e,"onSaveExitState")}})},t.detached=t=>ve(t,"detached",Se()),t.effect=function(t,e){t.effect instanceof R&&(t=t.effect.fn);const o=new R(t,n,(()=>{o.dirty&&o.run()}));e&&(s(o,e),e.scope&&w(o,e.scope)),e&&e.lazy||o.run();const i=o.run.bind(o);return i.effect=o,i},t.effectScope=function(t){return new y(t)},t.error=t=>ve(t,"error",Se()),t.getCurrentScope=S,t.isProxy=function(t){return!!t&&!!t.__v_raw},t.isReactive=It,t.isReadonly=jt,t.isRef=Dt,t.isShallow=At,t.markRaw=function(t){return Object.isExtensible(t)&&((t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})})(t,"__v_skip",!0),t},t.moved=t=>ve(t,"moved",Se()),t.onAddToFavorites=t=>ve(t,"onAddToFavorites",we()),t.onError=t=>ve(t,"onError",ye()),t.onHide=t=>ve(t,"onHide",0===getCurrentPages().length?ye():we()),t.onLaunch=t=>ve(t,"onLaunch",ye()),t.onLoad=t=>ve(t,"onLoad",we()),t.onPageNotFound=t=>ve(t,"onPageNotFound",ye()),t.onPageScroll=t=>ve(t,"onPageScroll",we()),t.onPullDownRefresh=t=>ve(t,"onPullDownRefresh",we()),t.onReachBottom=t=>ve(t,"onReachBottom",we()),t.onReady=t=>ve(t,"onReady",we()),t.onResize=t=>ve(t,"onResize",we()),t.onRouteDone=t=>ve(t,"onRouteDone",we()),t.onSaveExitState=t=>ve(t,"onSaveExitState",we()),t.onScopeDispose=function(t){v&&v.cleanups.push(t)},t.onShareAppMessage=t=>ve(t,"onShareAppMessage",we()),t.onShareTimeline=t=>ve(t,"onShareTimeline",we()),t.onShow=t=>ve(t,"onShow",0===getCurrentPages().length?ye():we()),t.onTabItemTap=t=>ve(t,"onTabItemTap",we()),t.onUnhandledRejection=t=>ve(t,"onUnhandledRejection",ye()),t.onUnload=t=>ve(t,"onUnload",we()),t.proxyRefs=Ut,t.reactive=Et,t.readonly=Ot,t.ready=t=>ve(t,"ready",Se()),t.ref=Vt,t.shallowReactive=function(t){return kt(t,!1,X,wt,bt)},t.shallowReadonly=function(t){return kt(t,!0,Z,Rt,Lt)},t.shallowRef=function(t){return Ct(t,!0)},t.stop=function(t){t.effect.stop()},t.toRaw=Tt,t.toRef=function(t,e,n){return Dt(t)?t:l(t)?new Yt(t):u(t)&&arguments.length>1?qt(t,e,n):Vt(t)},t.toRefs=function(t){const e=r(t)?new Array(t.length):{};for(const n in t)e[n]=qt(t,n);return e},t.toValue=function(t){return l(t)?t():Ft(t)},t.triggerRef=function(t){zt(t,4)},t.unref=Ft,t.useApp=ye,t.useComponent=Se,t.useObserver=(t,e)=>{const n=(t,e,n)=>{let s=t[e];Object.defineProperty(t,e,{get:()=>s,set(t){s=t,n&&n(t)}})};if(t in de.properties)n(de.properties,t,e);else{if(!(t in de.data))throw new Error(`未找到可以 observer ${t}`);n(de.data,t,e)}},t.usePage=we,t.watch=ue,t.watchEffect=function(t,e){return he(t,null,e)},t.watchPostEffect=function(t,e){return he(t,null,/* istanbul ignore next -- @preserve */{flush:"post"})},t.watchSyncEffect=function(t,e){return he(t,null,/* istanbul ignore next -- @preserve */{flush:"sync"})}}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1723247185708);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map