module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1723818103592, function(require, module, exports) {
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MpVue3={})}(this,(function(t){
/**
  * @vue/shared v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
/*! #__NO_SIDE_EFFECTS__ */function e(t,e){const n=new Set(t.split(","));return t=>n.has(t)}const n=()=>{},s=Object.assign,i=Object.prototype.hasOwnProperty,o=(t,e)=>i.call(t,e),r=Array.isArray,c=t=>"[object Map]"===f(t),a=t=>"function"==typeof t,l=t=>"symbol"==typeof t,h=t=>null!==t&&"object"==typeof t,u=Object.prototype.toString,f=t=>u.call(t),d=t=>f(t).slice(8,-1),_=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,p=(t,e)=>!Object.is(t,e);
/**
  * @vue/reactivity v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
let v,g;class y{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=v,!t&&v&&(this.index=(v.scopes||(v.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=v;try{return v=this,t()}finally{v=e}}}on(){v=this}off(){v=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function b(t){return new y(t)}function m(t,e=v){e&&e.active&&e.effects.push(t)}function w(){return v}class S{constructor(t,e,n,s){this.fn=t,this.trigger=e,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,m(this,s)}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,k();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(R(e.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),x()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=I,e=g;try{return I=!0,g=this,this._runnings++,E(this),this.fn()}finally{O(this),this._runnings--,g=e,I=t}}stop(){this.active&&(E(this),O(this),this.onStop&&this.onStop(),this.active=!1)}}function R(t){return t.value}function E(t){t._trackId++,t._depsLength=0}function O(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)P(t.deps[e],t);t.deps.length=t._depsLength}}function P(t,e){const n=t.get(e);void 0!==n&&e._trackId!==n&&(t.delete(e),0===t.size&&t.cleanup())}let I=!0,A=0;const L=[];function k(){L.push(I),I=!1}function x(){const t=L.pop();I=void 0===t||t}function T(){A++}function j(){for(A--;!A&&M.length;)M.shift()()}function C(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const n=t.deps[t._depsLength];n!==e?(n&&P(n,t),t.deps[t._depsLength++]=e):t._depsLength++}}const M=[];function $(t,e,n){T();for(const n of t.keys()){let s;n._dirtyLevel<e&&(null!=s?s:s=t.get(n)===n._trackId)&&(n._shouldSchedule||(n._shouldSchedule=0===n._dirtyLevel),n._dirtyLevel=e),n._shouldSchedule&&(null!=s?s:s=t.get(n)===n._trackId)&&(n.trigger(),n._runnings&&!n.allowRecurse||2===n._dirtyLevel||(n._shouldSchedule=!1,n.scheduler&&M.push(n.scheduler)))}j()}const D=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},N=new WeakMap,z=Symbol(""),V=Symbol("");function H(t,e,n){if(I&&g){let e=N.get(t);e||N.set(t,e=new Map);let s=e.get(n);s||e.set(n,s=D((()=>e.delete(n)))),C(g,s)}}function B(t,e,n,s,i,o){const a=N.get(t);if(!a)return;let h=[];if("clear"===e)h=[...a.values()];else if("length"===n&&r(t)){const t=Number(s);a.forEach(((e,n)=>{("length"===n||!l(n)&&n>=t)&&h.push(e)}))}else switch(void 0!==n&&h.push(a.get(n)),e){case"add":r(t)?_(n)&&h.push(a.get("length")):(h.push(a.get(z)),c(t)&&h.push(a.get(V)));break;case"delete":r(t)||(h.push(a.get(z)),c(t)&&h.push(a.get(V)));break;case"set":c(t)&&h.push(a.get(z))}T();for(const t of h)t&&$(t,4);j()}const W=e("__proto__,__v_isRef,__isVue"),Q=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(l)),U=F();function F(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const n=Ct(this);for(let t=0,e=this.length;t<e;t++)H(n,0,t+"");const s=n[e](...t);return-1===s||!1===s?n[e](...t.map(Ct)):s}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){k(),T();const n=Ct(this)[e].apply(this,t);return j(),x(),n}})),t}function K(t){l(t)||(t=String(t));const e=Ct(this);return H(e,0,t),e.hasOwnProperty(t)}class q{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){const s=this._isReadonly,i=this._isShallow;if("__v_isReactive"===e)return!s;if("__v_isReadonly"===e)return s;if("__v_isShallow"===e)return i;if("__v_raw"===e)return n===(s?i?Pt:Ot:i?Et:Rt).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const c=r(t);if(!s){if(c&&o(U,e))return Reflect.get(U,e,n);if("hasOwnProperty"===e)return K}const a=Reflect.get(t,e,n);return(l(e)?Q.has(e):W(e))?a:(s||H(t,0,e),i?a:Vt(a)?c&&_(e)?a:a.value:h(a)?s?At(a):It(a):a)}}class Y extends q{constructor(t=!1){super(!1,t)}set(t,e,n,s){let i=t[e];if(!this._isShallow){const e=xt(i);if(Tt(n)||xt(n)||(i=Ct(i),n=Ct(n)),!r(t)&&Vt(i)&&!Vt(n))return!e&&(i.value=n,!0)}const c=r(t)&&_(e)?Number(e)<t.length:o(t,e),a=Reflect.set(t,e,n,s);return t===Ct(s)&&(c?p(n,i)&&B(t,"set",e,n):B(t,"add",e,n)),a}deleteProperty(t,e){const n=o(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&B(t,"delete",e,void 0),s}has(t,e){const n=Reflect.has(t,e);return l(e)&&Q.has(e)||H(t,0,e),n}ownKeys(t){return H(t,0,r(t)?"length":z),Reflect.ownKeys(t)}}class G extends q{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const J=new Y,X=new G,Z=new Y(!0),tt=new G(!0),et=t=>t,nt=t=>Reflect.getPrototypeOf(t);function st(t,e,n=!1,s=!1){const i=Ct(t=t.__v_raw),o=Ct(e);n||(p(e,o)&&H(i,0,e),H(i,0,o));const{has:r}=nt(i),c=s?et:n?$t:Mt;return r.call(i,e)?c(t.get(e)):r.call(i,o)?c(t.get(o)):void(t!==i&&t.get(e))}function it(t,e=!1){const n=this.__v_raw,s=Ct(n),i=Ct(t);return e||(p(t,i)&&H(s,0,t),H(s,0,i)),t===i?n.has(t):n.has(t)||n.has(i)}function ot(t,e=!1){return t=t.__v_raw,!e&&H(Ct(t),0,z),Reflect.get(t,"size",t)}function rt(t,e=!1){e||Tt(t)||xt(t)||(t=Ct(t));const n=Ct(this);return nt(n).has.call(n,t)||(n.add(t),B(n,"add",t,t)),this}function ct(t,e,n=!1){n||Tt(e)||xt(e)||(e=Ct(e));const s=Ct(this),{has:i,get:o}=nt(s);let r=i.call(s,t);r||(t=Ct(t),r=i.call(s,t));const c=o.call(s,t);return s.set(t,e),r?p(e,c)&&B(s,"set",t,e):B(s,"add",t,e),this}function at(t){const e=Ct(this),{has:n,get:s}=nt(e);let i=n.call(e,t);i||(t=Ct(t),i=n.call(e,t)),s&&s.call(e,t);const o=e.delete(t);return i&&B(e,"delete",t,void 0),o}function lt(){const t=Ct(this),e=0!==t.size,n=t.clear();return e&&B(t,"clear",void 0,void 0),n}function ht(t,e){return function(n,s){const i=this,o=i.__v_raw,r=Ct(o),c=e?et:t?$t:Mt;return!t&&H(r,0,z),o.forEach(((t,e)=>n.call(s,c(t),c(e),i)))}}function ut(t,e,n){return function(...s){const i=this.__v_raw,o=Ct(i),r=c(o),a="entries"===t||t===Symbol.iterator&&r,l="keys"===t&&r,h=i[t](...s),u=n?et:e?$t:Mt;return!e&&H(o,0,l?V:z),{next(){const{value:t,done:e}=h.next();return e?{value:t,done:e}:{value:a?[u(t[0]),u(t[1])]:u(t),done:e}},[Symbol.iterator](){return this}}}}function ft(t){return function(...e){return"delete"!==t&&("clear"===t?void 0:this)}}function dt(){const t={get(t){return st(this,t)},get size(){return ot(this)},has:it,add:rt,set:ct,delete:at,clear:lt,forEach:ht(!1,!1)},e={get(t){return st(this,t,!1,!0)},get size(){return ot(this)},has:it,add(t){return rt.call(this,t,!0)},set(t,e){return ct.call(this,t,e,!0)},delete:at,clear:lt,forEach:ht(!1,!0)},n={get(t){return st(this,t,!0)},get size(){return ot(this,!0)},has(t){return it.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:ht(!0,!1)},s={get(t){return st(this,t,!0,!0)},get size(){return ot(this,!0)},has(t){return it.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:ht(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((i=>{t[i]=ut(i,!1,!1),n[i]=ut(i,!0,!1),e[i]=ut(i,!1,!0),s[i]=ut(i,!0,!0)})),[t,n,e,s]}const[_t,pt,vt,gt]=dt();function yt(t,e){const n=e?t?gt:vt:t?pt:_t;return(e,s,i)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(o(n,s)&&s in e?n:e,s,i)}const bt={get:yt(!1,!1)},mt={get:yt(!1,!0)},wt={get:yt(!0,!1)},St={get:yt(!0,!0)},Rt=new WeakMap,Et=new WeakMap,Ot=new WeakMap,Pt=new WeakMap;function It(t){return xt(t)?t:Lt(t,!1,J,bt,Rt)}function At(t){return Lt(t,!0,X,wt,Ot)}function Lt(t,e,n,s,i){if(!h(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const o=i.get(t);if(o)return o;const r=(c=t).__v_skip||!Object.isExtensible(c)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(d(c));var c;if(0===r)return t;const a=new Proxy(t,2===r?s:n);return i.set(t,a),a}function kt(t){return xt(t)?kt(t.__v_raw):!(!t||!t.__v_isReactive)}function xt(t){return!(!t||!t.__v_isReadonly)}function Tt(t){return!(!t||!t.__v_isShallow)}function jt(t){return!!t&&!!t.__v_raw}function Ct(t){const e=t&&t.__v_raw;return e?Ct(e):t}const Mt=t=>h(t)?It(t):t,$t=t=>h(t)?At(t):t;class Dt{constructor(t,e,n,s){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new S((()=>t(this._value)),(()=>zt(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const t=Ct(this);return t._cacheable&&!t.effect.dirty||!p(t._value,t._value=t.effect.run())||zt(t,4),Nt(t),t.effect._dirtyLevel>=2&&zt(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Nt(t){var e;I&&g&&(t=Ct(t),C(g,null!=(e=t.dep)?e:t.dep=D((()=>t.dep=void 0),t instanceof Dt?t:void 0)))}function zt(t,e=4,n,s){const i=(t=Ct(t)).dep;i&&$(i,e)}function Vt(t){return!(!t||!0!==t.__v_isRef)}function Ht(t){return Bt(t,!1)}function Bt(t,e){return Vt(t)?t:new Wt(t,e)}class Wt{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:Ct(t),this._value=e?t:Mt(t)}get value(){return Nt(this),this._value}set value(t){const e=this.__v_isShallow||Tt(t)||xt(t);t=e?t:Ct(t),p(t,this._rawValue)&&(this._rawValue,this._rawValue=t,this._value=e?t:Mt(t),zt(this,4))}}function Qt(t){return Vt(t)?t.value:t}const Ut={get:(t,e,n)=>Qt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Vt(i)&&!Vt(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};class Ft{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:n}=t((()=>Nt(this)),(()=>zt(this)));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}class Kt{constructor(t,e,n){this._object=t,this._key=e,this._defaultValue=n,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return function(t,e){const n=N.get(t);return n&&n.get(e)}(Ct(this._object),this._key)}}class qt{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Yt(t,e,n){const s=t[e];return Vt(s)?s:new Kt(t,e,n)}const Gt={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",IS_SHALLOW:"__v_isShallow",RAW:"__v_raw"},Jt=()=>{},{isArray:Xt}=Array;function Zt(t){return Object.prototype.toString.call(t).slice(8,-1)}function te(t){return null!==t&&"object"==typeof t}function ee(t){return"Object"===Zt(t)}function ne(t){return"function"==typeof t}function se(t,e){return t!==e&&(t==t||e==e)}var ie=!1;let oe=!1,re=!1;const ce=[];let ae=0;const le=[];let he=null,ue=0;const fe=Promise.resolve();function de(t){0!==ce.length&&ce.includes(t,oe&&t.allowRecurse?ae+1:ae)||(ce.push(t),oe||re||(re=!0,fe.then(pe)))}function _e(){if(le.length>0){for(he=[...new Set(le)],le.length=0,ue=0;ue<he.length;ue++){const t=he[ue];!1!==t.active&&t()}he=null,ue=0}}function pe(t){re=!1,oe=!0;const e=/* istanbul ignore next -- @preserve  */Jt;try{for(ae=0;ae<ce.length;ae++){const t=ce[ae];!1!==t.active&&(ie&&e(t),t())}}finally{ae=0,ce.length=0,oe=!1}}const ve={};function ge(t,e,n){return ye(t,e,n)}function ye(t,e,{immediate:n,deep:s,flush:i,once:o,onTrack:r,onTrigger:c}={}){if(e&&o){const t=e;e=(...e)=>{t(...e),b()}}const a=t=>!0===s?t:be(t,!1===s?1:void 0);let l,h,u=!1,f=!1;if(Vt(t)?(l=()=>t.value,u=Tt(t)):kt(t)?(l=()=>a(t),u=!0):Xt(t)?(f=!0,u=t.some((t=>kt(t)||Tt(t))),l=()=>t.map((t=>Vt(t)?t.value:kt(t)?a(t):ne(t)?t():void 0))):l=ne(t)?e?()=>t():()=>(h&&h(),t(d)):Jt,e&&s){const t=l;l=()=>be(t())}const d=t=>{h=g.onStop=()=>{t(),h=g.onStop=void 0}};let _=f?Array.from({length:t.length}).fill(ve):ve;const p=()=>{if(g.active&&g.dirty)if(e){const t=g.run();(s||u||(f?t.some(((t,e)=>se(t,_[e]))):se(t,_)))&&(h&&h(),e(t,_===ve?void 0:f&&_[0]===ve?[]:_,d),_=t)}else g.run()};let v;p.allowRecurse=Boolean(e),v="sync"===i?p:"post"===i?()=>{!function(t){he&&he.includes(t,t.allowRecurse?ue+1:ue)||le.push(t)}(p)}:()=>{de(p)};const g=new S(l,Jt,v),y=w(),b=()=>{g.stop(),y&&function(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}(y.effects,g)};return e?n?p():_=g.run():g.run(),b}function be(t,e=Number.POSITIVE_INFINITY,n){if(e<=0||!te(t)||t[Gt.SKIP])return t;if((n=n||new Set).has(t))return t;
/* istanbul ignore else -- @preserve  */
if(n.add(t),e--,Vt(t))be(t.value,e,n);else if(Xt(t))for(let s=0;s<t.length;s++)be(t[s],e,n);else if("Set"===Zt(t)||function(t){return"Map"===Zt(t)}(t))t.forEach((t=>{be(t,e,n)}));else if(ee(t)){for(const s in t)be(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&be(t[s],e,n)}return t}function me(t){if(function(t){const e=new Set(["undefined","boolean","number","string"]);return null===t||e.has(typeof t)}(t)||ne(t))return t;if(Vt(t))return me(t.value);if(jt(t))return me(Ct(t));if(Xt(t))return t.map((t=>me(t)));if(ee(t)){const e={};return Object.keys(t).forEach((n=>{e[n]=me(t[n])})),e}throw new TypeError(`${Zt(t)} value is not supported`)}function we(t,e,n){te(n)&&ge(Vt(n)?n:()=>n,(()=>{t.setData({[e]:me(n)},_e)}),{deep:!0})}let Se=null,Re=null;function Ee(t,e,n,...s){e&&e[n]&&e[n].apply(t,s),t[`$${n}`]&&t[`$${n}`].forEach((t=>{t(...s)}))}function Oe(t,e,n,...s){if(e&&e[n])return e[n].apply(t,s);if(t[`$${n}`]){if(t[`$${n}`].length)throw new Error(`一个page只能配置一个${n}`);return t[`$${n}`][0](...s)}}function Pe(t,e,n){t&&(t[`$${e}`]||(t[`$${e}`]=[]),t[`$${e}`].push(n))}const Ie=()=>Se;const Ae=()=>Re;t.EffectScope=y,t.ReactiveEffect=S,t.attached=t=>Pe(Ae(),"attached",t),t.computed=function(t,e,s=!1){let i,o;const r=a(t);return r?(i=t,o=n):(i=t.get,o=t.set),new Dt(i,o,r||!o,s)},t.customRef=function(t){return new Ft(t)},t.defineComponent=function(t){if(!t)return Component({options:{virtualHost:!0,styleIsolation:"apply-shared",multipleSlots:!0}});let e={},n={};if("function"!=typeof t){const{setup:s,props:i,...o}=t;e=o,n=function(t){if(!t)return{};for(let e in t){const n=t[e];if(n&&n.type&&(n.value=void 0!==n.default?n.default:n.value,Array.isArray(n.type))){const t=n.type;n.type=t[0],n.optionalTypes=void 0!==n.optionalTypes?n.optionalTypes:t}}return t}(i),t=s,"properties"in o&&console.warn('属性使用"props"')}const s=e.options,i=(t,e)=>s&&void 0!==s[t]?s[t]:e;if(!t)return Component({...e,options:{...s,virtualHost:i("virtualHost",!0),styleIsolation:i("styleIsolation","apply-shared"),multipleSlots:i("multipleSlots",!0)},properties:n});Component({...e,options:{...s,virtualHost:i("virtualHost",!0),styleIsolation:i("styleIsolation","apply-shared"),multipleSlots:i("multipleSlots",!0)},properties:n,lifetimes:{attached(){Re=this,this.__scope__=b(),this.__props__=new Proxy(this.properties,{set:(t,e,n,s)=>(this.setData({[e]:n}),this.triggerEvent(e,{value:n}),Reflect.set(t,e,n,s))}),this.__context__={is:this.is,id:this.id,dataset:this.dataset,exitState:this.exitState,router:this.router,pageRouter:this.pageRouter,renderer:this.renderer,triggerEvent:this.triggerEvent.bind(this),createSelectorQuery:this.createSelectorQuery.bind(this),createIntersectionObserver:this.createIntersectionObserver.bind(this),createMediaQueryObserver:this.createMediaQueryObserver.bind(this),selectComponent:this.selectComponent.bind(this),selectAllComponents:this.selectAllComponents.bind(this),selectOwnerComponent:this.selectOwnerComponent.bind(this),getRelationNodes:this.getRelationNodes.bind(this),getTabBar:this.getTabBar.bind(this),getPageId:this.getPageId.bind(this),animate:this.animate.bind(this),clearAnimation:this.clearAnimation.bind(this),getOpenerEventChannel:this.getOpenerEventChannel.bind(this),applyAnimatedStyle:this.applyAnimatedStyle.bind(this),clearAnimatedStyle:this.clearAnimatedStyle.bind(this),setUpdatePerformanceListener:this.setUpdatePerformanceListener.bind(this),getPassiveEvent:this.getPassiveEvent.bind(this),setPassiveEvent:this.setPassiveEvent.bind(this),emit:(t,e)=>{this.triggerEvent(t,{value:e})}},this.__scope__.run((()=>{const e=t(this.__props__,this.__context__);void 0!==e&&Object.keys(e).forEach((t=>{const n=e[t];ne(n)?this[t]=n:(this.setData({[t]:me(n)}),we(this,t,n))}))})),Re=null;const n=e&&e.lifetimes&&e.lifetimes.attached;n&&n()},ready(){Ee(this,e,"ready")},moved(){Ee(this,e,"moved")},detached(){Ee(this,e,"detached"),this.__scope__&&this.__scope__.stop(),Object.keys(this).forEach((t=>{delete this[t]}))},error(t){Ee(this,e,"error",t)}}})},t.definePage=function(t){if(!t)return Page({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s||{},t=n}if(!t)return Page(e);Page({...e,onLoad(n){Se=this,this.__scope__=b(),this.__query__=n,this.__context__={is:this.is,id:this.id,dataset:this.dataset,exitState:this.exitState,router:this.router,pageRouter:this.pageRouter,renderer:this.renderer,triggerEvent:this.triggerEvent.bind(this),createSelectorQuery:this.createSelectorQuery.bind(this),createIntersectionObserver:this.createIntersectionObserver.bind(this),createMediaQueryObserver:this.createMediaQueryObserver.bind(this),selectComponent:this.selectComponent.bind(this),selectAllComponents:this.selectAllComponents.bind(this),selectOwnerComponent:this.selectOwnerComponent.bind(this),getRelationNodes:this.getRelationNodes.bind(this),getTabBar:this.getTabBar.bind(this),getPageId:this.getPageId.bind(this),animate:this.animate.bind(this),clearAnimation:this.clearAnimation.bind(this),getOpenerEventChannel:this.getOpenerEventChannel.bind(this),applyAnimatedStyle:this.applyAnimatedStyle.bind(this),clearAnimatedStyle:this.clearAnimatedStyle.bind(this),setUpdatePerformanceListener:this.setUpdatePerformanceListener.bind(this),getPassiveEvent:this.getPassiveEvent.bind(this),setPassiveEvent:this.setPassiveEvent.bind(this)},this.__scope__.run((()=>{const e=t(this.__query__,this.__context__);void 0!==e&&Object.keys(e).forEach((t=>{const n=e[t];ne(n)?this[t]=n:(this.setData({[t]:me(n)}),we(this,t,n))}))})),Se=null,e.onLoad&&e.onLoad(n)},onShow(){Ee(this,e,"onShow")},onReady(){Ee(this,e,"onReady")},onHide(){Ee(this,e,"onHide")},onUnload(){Ee(this,e,"onUnload"),this.__scope__&&this.__scope__.stop(),Object.keys(this).forEach((t=>{delete this[t]}))},onRouteDone(){Ee(this,e,"onRouteDone")},onPullDownRefresh(){Ee(this,e,"onPullDownRefresh")},onReachBottom(){Ee(this,e,"onReachBottom")},onPageScroll(t){Ee(this,e,"onPageScroll",t)},onAddToFavorites(t){return Oe(this,e,"onAddToFavorites",t)},onShareAppMessage(t){return Oe(this,e,"onShareAppMessage",t)},onShareTimeline(){return Oe(this,e,"onShareTimeline")},onResize(t){Ee(this,e,"onResize",t)},onTabItemTap(t){Ee(this,e,"onTabItemTap",t)},onSaveExitState(){Ee(this,e,"onSaveExitState")}})},t.detached=t=>Pe(Ae(),"detached",t),t.effect=function(t,e){t.effect instanceof S&&(t=t.effect.fn);const i=new S(t,n,(()=>{i.dirty&&i.run()}));e&&(s(i,e),e.scope&&m(i,e.scope)),e&&e.lazy||i.run();const o=i.run.bind(i);return o.effect=i,o},t.effectScope=b,t.error=t=>Pe(Ae(),"error",t),t.getCurrentScope=w,t.isProxy=jt,t.isReactive=kt,t.isReadonly=xt,t.isRef=Vt,t.isShallow=Tt,t.markRaw=function(t){return Object.isExtensible(t)&&((t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})})(t,"__v_skip",!0),t},t.moved=t=>Pe(Ae(),"moved",t),t.onAddToFavorites=t=>Pe(Ie(),"onAddToFavorites",t),t.onHide=t=>Pe(Ie(),"onHide",t),t.onLoad=t=>Pe(Ie(),"onLoad",t),t.onPageScroll=t=>Pe(Ie(),"onPageScroll",t),t.onPullDownRefresh=t=>Pe(Ie(),"onPullDownRefresh",t),t.onReachBottom=t=>Pe(Ie(),"onReachBottom",t),t.onReady=t=>Pe(Ie(),"onReady",t),t.onResize=t=>Pe(Ie(),"onResize",t),t.onRouteDone=t=>Pe(Ie(),"onRouteDone",t),t.onSaveExitState=t=>Pe(Ie(),"onSaveExitState",t),t.onScopeDispose=function(t){v&&v.cleanups.push(t)},t.onShareAppMessage=t=>Pe(Ie(),"onShareAppMessage",t),t.onShareTimeline=t=>Pe(Ie(),"onShareTimeline",t),t.onShow=t=>Pe(Ie(),"onShow",t),t.onTabItemTap=t=>Pe(Ie(),"onTabItemTap",t),t.onUnload=t=>Pe(Ie(),"onUnload",t),t.proxyRefs=function(t){return kt(t)?t:new Proxy(t,Ut)},t.reactive=It,t.readonly=At,t.ready=t=>Pe(Ae(),"ready",t),t.ref=Ht,t.shallowReactive=function(t){return Lt(t,!1,Z,mt,Et)},t.shallowReadonly=function(t){return Lt(t,!0,tt,St,Pt)},t.shallowRef=function(t){return Bt(t,!0)},t.stop=function(t){t.effect.stop()},t.toRaw=Ct,t.toRef=function(t,e,n){return Vt(t)?t:a(t)?new qt(t):h(t)&&arguments.length>1?Yt(t,e,n):Ht(t)},t.toRefs=function(t){const e=r(t)?new Array(t.length):{};for(const n in t)e[n]=Yt(t,n);return e},t.toValue=function(t){return a(t)?t():Qt(t)},t.triggerRef=function(t){zt(t,4)},t.unref=Qt,t.useComponent=Ae,t.usePage=Ie,t.watch=ge,t.watchEffect=function(t,e){return ye(t,null,e)},t.watchPostEffect=function(t,e){return ye(t,null,/* istanbul ignore next -- @preserve */{flush:"post"})},t.watchSyncEffect=function(t,e){return ye(t,null,/* istanbul ignore next -- @preserve */{flush:"sync"})}}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1723818103592);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map