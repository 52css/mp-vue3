module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1724456479280, function(require, module, exports) {
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MpVue3={})}(this,(function(t){
/**
  * @vue/shared v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
/*! #__NO_SIDE_EFFECTS__ */function e(t,e){const n=new Set(t.split(","));return t=>n.has(t)}const n=()=>{},s=Object.assign,o=Object.prototype.hasOwnProperty,r=(t,e)=>o.call(t,e),i=Array.isArray,c=t=>"[object Map]"===f(t),a=t=>"function"==typeof t,u=t=>"symbol"==typeof t,l=t=>null!==t&&"object"==typeof t,h=Object.prototype.toString,f=t=>h.call(t),d=t=>f(t).slice(8,-1),p=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,_=(t,e)=>!Object.is(t,e);
/**
  * @vue/reactivity v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
let v,g;class y{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=v,!t&&v&&(this.index=(v.scopes||(v.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=v;try{return v=this,t()}finally{v=e}}}on(){v=this}off(){v=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function w(t){return new y(t)}function S(t,e=v){e&&e.active&&e.effects.push(t)}function R(){return v}class b{constructor(t,e,n,s){this.fn=t,this.trigger=e,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,S(this,s)}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,j();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(m(e.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),x()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=k,e=g;try{return k=!0,g=this,this._runnings++,$(this),this.fn()}finally{O(this),this._runnings--,g=e,k=t}}stop(){this.active&&($(this),O(this),this.onStop&&this.onStop(),this.active=!1)}}function m(t){return t.value}function $(t){t._trackId++,t._depsLength=0}function O(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)E(t.deps[e],t);t.deps.length=t._depsLength}}function E(t,e){const n=t.get(e);void 0!==n&&e._trackId!==n&&(t.delete(e),0===t.size&&t.cleanup())}let k=!0,L=0;const P=[];function j(){P.push(k),k=!1}function x(){const t=P.pop();k=void 0===t||t}function I(){L++}function T(){for(L--;!L&&M.length;)M.shift()()}function A(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const n=t.deps[t._depsLength];n!==e?(n&&E(n,t),t.deps[t._depsLength++]=e):t._depsLength++}}const M=[];function D(t,e,n){I();for(const n of t.keys()){let s;n._dirtyLevel<e&&(null!=s?s:s=t.get(n)===n._trackId)&&(n._shouldSchedule||(n._shouldSchedule=0===n._dirtyLevel),n._dirtyLevel=e),n._shouldSchedule&&(null!=s?s:s=t.get(n)===n._trackId)&&(n.trigger(),n._runnings&&!n.allowRecurse||2===n._dirtyLevel||(n._shouldSchedule=!1,n.scheduler&&M.push(n.scheduler)))}T()}const N=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},z=new WeakMap,V=Symbol(""),C=Symbol("");function W(t,e,n){if(k&&g){let e=z.get(t);e||z.set(t,e=new Map);let s=e.get(n);s||e.set(n,s=N((()=>e.delete(n)))),A(g,s)}}function U(t,e,n,s,o,r){const a=z.get(t);if(!a)return;let l=[];if("clear"===e)l=[...a.values()];else if("length"===n&&i(t)){const t=Number(s);a.forEach(((e,n)=>{("length"===n||!u(n)&&n>=t)&&l.push(e)}))}else switch(void 0!==n&&l.push(a.get(n)),e){case"add":i(t)?p(n)&&l.push(a.get("length")):(l.push(a.get(V)),c(t)&&l.push(a.get(C)));break;case"delete":i(t)||(l.push(a.get(V)),c(t)&&l.push(a.get(C)));break;case"set":c(t)&&l.push(a.get(V))}I();for(const t of l)t&&D(t,4);T()}const B=e("__proto__,__v_isRef,__isVue"),H=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(u)),F=K();function K(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const n=Mt(this);for(let t=0,e=this.length;t<e;t++)W(n,0,t+"");const s=n[e](...t);return-1===s||!1===s?n[e](...t.map(Mt)):s}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){j(),I();const n=Mt(this)[e].apply(this,t);return T(),x(),n}})),t}function q(t){u(t)||(t=String(t));const e=Mt(this);return W(e,0,t),e.hasOwnProperty(t)}class J{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){const s=this._isReadonly,o=this._isShallow;if("__v_isReactive"===e)return!s;if("__v_isReadonly"===e)return s;if("__v_isShallow"===e)return o;if("__v_raw"===e)return n===(s?o?Et:Ot:o?$t:mt).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const c=i(t);if(!s){if(c&&r(F,e))return Reflect.get(F,e,n);if("hasOwnProperty"===e)return q}const a=Reflect.get(t,e,n);return(u(e)?H.has(e):B(e))?a:(s||W(t,0,e),o?a:Wt(a)?c&&p(e)?a:a.value:l(a)?s?Pt(a):kt(a):a)}}class Y extends J{constructor(t=!1){super(!1,t)}set(t,e,n,s){let o=t[e];if(!this._isShallow){const e=It(o);if(Tt(n)||It(n)||(o=Mt(o),n=Mt(n)),!i(t)&&Wt(o)&&!Wt(n))return!e&&(o.value=n,!0)}const c=i(t)&&p(e)?Number(e)<t.length:r(t,e),a=Reflect.set(t,e,n,s);return t===Mt(s)&&(c?_(n,o)&&U(t,"set",e,n):U(t,"add",e,n)),a}deleteProperty(t,e){const n=r(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&U(t,"delete",e,void 0),s}has(t,e){const n=Reflect.has(t,e);return u(e)&&H.has(e)||W(t,0,e),n}ownKeys(t){return W(t,0,i(t)?"length":V),Reflect.ownKeys(t)}}class G extends J{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Q=new Y,X=new G,Z=new Y(!0),tt=new G(!0),et=t=>t,nt=t=>Reflect.getPrototypeOf(t);function st(t,e,n=!1,s=!1){const o=Mt(t=t.__v_raw),r=Mt(e);n||(_(e,r)&&W(o,0,e),W(o,0,r));const{has:i}=nt(o),c=s?et:n?Nt:Dt;return i.call(o,e)?c(t.get(e)):i.call(o,r)?c(t.get(r)):void(t!==o&&t.get(e))}function ot(t,e=!1){const n=this.__v_raw,s=Mt(n),o=Mt(t);return e||(_(t,o)&&W(s,0,t),W(s,0,o)),t===o?n.has(t):n.has(t)||n.has(o)}function rt(t,e=!1){return t=t.__v_raw,!e&&W(Mt(t),0,V),Reflect.get(t,"size",t)}function it(t,e=!1){e||Tt(t)||It(t)||(t=Mt(t));const n=Mt(this);return nt(n).has.call(n,t)||(n.add(t),U(n,"add",t,t)),this}function ct(t,e,n=!1){n||Tt(e)||It(e)||(e=Mt(e));const s=Mt(this),{has:o,get:r}=nt(s);let i=o.call(s,t);i||(t=Mt(t),i=o.call(s,t));const c=r.call(s,t);return s.set(t,e),i?_(e,c)&&U(s,"set",t,e):U(s,"add",t,e),this}function at(t){const e=Mt(this),{has:n,get:s}=nt(e);let o=n.call(e,t);o||(t=Mt(t),o=n.call(e,t)),s&&s.call(e,t);const r=e.delete(t);return o&&U(e,"delete",t,void 0),r}function ut(){const t=Mt(this),e=0!==t.size,n=t.clear();return e&&U(t,"clear",void 0,void 0),n}function lt(t,e){return function(n,s){const o=this,r=o.__v_raw,i=Mt(r),c=e?et:t?Nt:Dt;return!t&&W(i,0,V),r.forEach(((t,e)=>n.call(s,c(t),c(e),o)))}}function ht(t,e,n){return function(...s){const o=this.__v_raw,r=Mt(o),i=c(r),a="entries"===t||t===Symbol.iterator&&i,u="keys"===t&&i,l=o[t](...s),h=n?et:e?Nt:Dt;return!e&&W(r,0,u?C:V),{next(){const{value:t,done:e}=l.next();return e?{value:t,done:e}:{value:a?[h(t[0]),h(t[1])]:h(t),done:e}},[Symbol.iterator](){return this}}}}function ft(t){return function(...e){return"delete"!==t&&("clear"===t?void 0:this)}}function dt(){const t={get(t){return st(this,t)},get size(){return rt(this)},has:ot,add:it,set:ct,delete:at,clear:ut,forEach:lt(!1,!1)},e={get(t){return st(this,t,!1,!0)},get size(){return rt(this)},has:ot,add(t){return it.call(this,t,!0)},set(t,e){return ct.call(this,t,e,!0)},delete:at,clear:ut,forEach:lt(!1,!0)},n={get(t){return st(this,t,!0)},get size(){return rt(this,!0)},has(t){return ot.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:lt(!0,!1)},s={get(t){return st(this,t,!0,!0)},get size(){return rt(this,!0)},has(t){return ot.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:lt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((o=>{t[o]=ht(o,!1,!1),n[o]=ht(o,!0,!1),e[o]=ht(o,!1,!0),s[o]=ht(o,!0,!0)})),[t,n,e,s]}const[pt,_t,vt,gt]=dt();function yt(t,e){const n=e?t?gt:vt:t?_t:pt;return(e,s,o)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(r(n,s)&&s in e?n:e,s,o)}const wt={get:yt(!1,!1)},St={get:yt(!1,!0)},Rt={get:yt(!0,!1)},bt={get:yt(!0,!0)},mt=new WeakMap,$t=new WeakMap,Ot=new WeakMap,Et=new WeakMap;function kt(t){return It(t)?t:jt(t,!1,Q,wt,mt)}function Lt(t){return jt(t,!1,Z,St,$t)}function Pt(t){return jt(t,!0,X,Rt,Ot)}function jt(t,e,n,s,o){if(!l(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const r=o.get(t);if(r)return r;const i=(c=t).__v_skip||!Object.isExtensible(c)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(d(c));var c;if(0===i)return t;const a=new Proxy(t,2===i?s:n);return o.set(t,a),a}function xt(t){return It(t)?xt(t.__v_raw):!(!t||!t.__v_isReactive)}function It(t){return!(!t||!t.__v_isReadonly)}function Tt(t){return!(!t||!t.__v_isShallow)}function At(t){return!!t&&!!t.__v_raw}function Mt(t){const e=t&&t.__v_raw;return e?Mt(e):t}const Dt=t=>l(t)?kt(t):t,Nt=t=>l(t)?Pt(t):t;class zt{constructor(t,e,n,s){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new b((()=>t(this._value)),(()=>Ct(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const t=Mt(this);return t._cacheable&&!t.effect.dirty||!_(t._value,t._value=t.effect.run())||Ct(t,4),Vt(t),t.effect._dirtyLevel>=2&&Ct(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Vt(t){var e;k&&g&&(t=Mt(t),A(g,null!=(e=t.dep)?e:t.dep=N((()=>t.dep=void 0),t instanceof zt?t:void 0)))}function Ct(t,e=4,n,s){const o=(t=Mt(t)).dep;o&&D(o,e)}function Wt(t){return!(!t||!0!==t.__v_isRef)}function Ut(t){return Bt(t,!1)}function Bt(t,e){return Wt(t)?t:new Ht(t,e)}class Ht{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:Mt(t),this._value=e?t:Dt(t)}get value(){return Vt(this),this._value}set value(t){const e=this.__v_isShallow||Tt(t)||It(t);t=e?t:Mt(t),_(t,this._rawValue)&&(this._rawValue,this._rawValue=t,this._value=e?t:Dt(t),Ct(this,4))}}function Ft(t){return Wt(t)?t.value:t}const Kt={get:(t,e,n)=>Ft(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const o=t[e];return Wt(o)&&!Wt(n)?(o.value=n,!0):Reflect.set(t,e,n,s)}};class qt{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:n}=t((()=>Vt(this)),(()=>Ct(this)));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}class Jt{constructor(t,e,n){this._object=t,this._key=e,this._defaultValue=n,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return function(t,e){const n=z.get(t);return n&&n.get(e)}(Mt(this._object),this._key)}}class Yt{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Gt(t,e,n){const s=t[e];return Wt(s)?s:new Jt(t,e,n)}const Qt={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",IS_SHALLOW:"__v_isShallow",RAW:"__v_raw"},Xt=()=>{},{isArray:Zt}=Array;function te(t){return Object.prototype.toString.call(t).slice(8,-1)}function ee(t){return null!==t&&"object"==typeof t}function ne(t){return"Object"===te(t)}function se(t){return"function"==typeof t}function oe(t,e){return t!==e&&(t==t||e==e)}var re=!1;let ie=!1,ce=!1;const ae=[];let ue=0;const le=[];let he=null,fe=0;const de=Promise.resolve();function pe(t){0!==ae.length&&ae.includes(t,ie&&t.allowRecurse?ue+1:ue)||(ae.push(t),ie||ce||(ce=!0,de.then(ve)))}function _e(){if(le.length>0){for(he=[...new Set(le)],le.length=0,fe=0;fe<he.length;fe++){const t=he[fe];!1!==t.active&&t()}he=null,fe=0}}function ve(t){ce=!1,ie=!0;const e=/* istanbul ignore next -- @preserve  */Xt;try{for(ue=0;ue<ae.length;ue++){const t=ae[ue];!1!==t.active&&(re&&e(t),t())}}finally{ue=0,ae.length=0,ie=!1}}const ge={};function ye(t,e,n){return we(t,e,n)}function we(t,e,{immediate:n,deep:s,flush:o,once:r,onTrack:i,onTrigger:c}={}){if(e&&r){const t=e;e=(...e)=>{t(...e),w()}}const a=t=>!0===s?t:Se(t,!1===s?1:void 0);let u,l,h=!1,f=!1;if(Wt(t)?(u=()=>t.value,h=Tt(t)):xt(t)?(u=()=>a(t),h=!0):Zt(t)?(f=!0,h=t.some((t=>xt(t)||Tt(t))),u=()=>t.map((t=>Wt(t)?t.value:xt(t)?a(t):se(t)?t():void 0))):u=se(t)?e?()=>t():()=>(l&&l(),t(d)):Xt,e&&s){const t=u;u=()=>Se(t())}const d=t=>{l=g.onStop=()=>{t(),l=g.onStop=void 0}};let p=f?Array.from({length:t.length}).fill(ge):ge;const _=()=>{if(g.active&&g.dirty)if(e){const t=g.run();(s||h||(f?t.some(((t,e)=>oe(t,p[e]))):oe(t,p)))&&(l&&l(),e(t,p===ge?void 0:f&&p[0]===ge?[]:p,d),p=t)}else g.run()};let v;_.allowRecurse=Boolean(e),v="sync"===o?_:"post"===o?()=>{!function(t){he&&he.includes(t,t.allowRecurse?fe+1:fe)||le.push(t)}(_)}:()=>{pe(_)};const g=new b(u,Xt,v),y=R(),w=()=>{g.stop(),y&&function(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}(y.effects,g)};return e?n?_():p=g.run():g.run(),w}function Se(t,e=Number.POSITIVE_INFINITY,n){if(e<=0||!ee(t)||t[Qt.SKIP])return t;if((n=n||new Set).has(t))return t;
/* istanbul ignore else -- @preserve  */
if(n.add(t),e--,Wt(t))Se(t.value,e,n);else if(Zt(t))for(let s=0;s<t.length;s++)Se(t[s],e,n);else if("Set"===te(t)||function(t){return"Map"===te(t)}(t))t.forEach((t=>{Se(t,e,n)}));else if(ne(t)){for(const s in t)Se(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&Se(t[s],e,n)}return t}function Re(t){if(function(t){const e=new Set(["undefined","boolean","number","string"]);return null===t||e.has(typeof t)}(t)||se(t))return t;if(Wt(t))return Re(t.value);if(At(t))return Re(Mt(t));if(Zt(t))return t.map((t=>Re(t)));if(ne(t)){const e={};return Object.keys(t).forEach((n=>{e[n]=Re(t[n])})),e}throw new TypeError(`${te(t)} value is not supported`)}function be(t,e,n){ee(n)&&ye(Wt(n)?n:()=>n,(()=>{t.setData({[e]:Re(n)},_e)}),{deep:!0})}let me=null,$e=null;const Oe=(t,e,n,...s)=>{if(e&&e[n]&&e[n](...s),!t[`$${n}`])return;const o={onLoad:"onUnload",onShow:"onHide",attached:"detached"}[n];t[`$${n}`].forEach((e=>{if(o){const n=t[`$${o}`]&&t[`$${o}`].find((t=>t.front===e));n&&n()}const n=e.apply(t,s);if(o&&"function"==typeof n){t[`$${o}`]&&t[`$${o}`].find((t=>t.front===e))||(n.front,t[`$${o}`]||(t[`$${o}`]=[]),t[`$${o}`].push(n))}}))},Ee=(t,e,n,...s)=>{if(e&&e[n])return e[n](...s);if(t[`$${n}`]){if(t[`$${n}`].length)throw new Error(`一个page只能配置一个${n}`);return t[`$${n}`][0].apply(t,s)}},ke=(t,e,n)=>{t&&(t[`$${e}`]||(t[`$${e}`]=[]),t[`$${e}`].push(n))},Le=()=>me,Pe=()=>$e;t.EffectScope=y,t.ReactiveEffect=b,t.attached=t=>ke(Pe(),"attached",t),t.computed=function(t,e,s=!1){let o,r;const i=a(t);return i?(o=t,r=n):(o=t.get,r=t.set),new zt(o,r,i||!r,s)},t.customRef=function(t){return new qt(t)},t.defineComponent=t=>{if(!t)return Component({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s,t=n}if(!t)return Component(e);let n=null;e.properties&&(n=Object.keys(e.properties)),n&&(void 0===e.observers&&(e.observers={}),n.forEach((t=>{const n=e.observers[t];e.observers[t]=function(e){this.$props&&(this.$props[t]=e),void 0!==n&&n.call(this,e)}}))),Component({...e,lifetimes:{attached(){$e=this,this.$scope=w();const s={};n&&n.forEach((t=>{s[t]=this.data[t]})),this.$props=Lt(s),this.$context={emit:(t,e)=>{this.triggerEvent(t,{value:e})}},this.$scope.run((()=>{const n=t.call(this,this.$props,this.$context);void 0!==n&&Object.keys(n).forEach((t=>{const e=n[t];se(e)?this[t]=e:(this.setData({[t]:Re(e)}),be(this,t,e))})),Oe(this,e,"attached")})),$e=null},ready(){Oe(this,e,"ready")},moved(){Oe(this,e,"moved")},detached(){Oe(this,e,"detached"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((t=>{try{delete this[t]}catch(t){console.error("销毁异常",t)}}))},error(t){Oe(this,e,"error",t)}}})},t.definePage=t=>{if(!t)return Page({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s||{},t=n}if(!t)return Page(e);const{queries:n,...s}=e;Page({...s,onLoad(s){me=this,this.$scope=w(),this.$query=((t,e)=>{if(!e)return t;let n={};for(let s in t)if(s in e){const o=t[s],r=e[s];if(!r){n[s]=o;break}const i=r.type||r,c=t=>"formatter"in r&&void 0!==r.formatter?r.formatter(t):i===Boolean?!!t:i===Number?Number(t):i===Object?t?JSON.parse(decodeURIComponent(t)):{}:i===Array?t?JSON.parse(decodeURIComponent(t)):[]:(null===i||i===String||console.error("未知的·type·",i),t);n[s]=c(o)}else n[s]=t[s];return n})(s,n),this.$context={},this.$scope.run((()=>{const n=t.call(this,this.$query,this.$context);void 0!==n&&Object.keys(n).forEach((t=>{const e=n[t];se(e)?this[t]=e:(this.setData({[t]:Re(e)}),be(this,t,e))})),Oe(this,e,"onLoad",s)})),me=null},onShow(){Oe(this,e,"onShow")},onReady(){Oe(this,e,"onReady")},onHide(){Oe(this,e,"onHide")},onUnload(){Oe(this,e,"onUnload"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((t=>{try{delete this[t]}catch(t){console.error("销毁异常",t)}}))},onRouteDone(){Oe(this,e,"onRouteDone")},onPullDownRefresh(){Oe(this,e,"onPullDownRefresh")},onReachBottom(){Oe(this,e,"onReachBottom")},onPageScroll(t){Oe(this,e,"onPageScroll",t)},onAddToFavorites(t){return Ee(this,e,"onAddToFavorites",t)},onShareAppMessage(t){return Ee(this,e,"onShareAppMessage",t)},onShareTimeline(){return Ee(this,e,"onShareTimeline")},onResize(t){Oe(this,e,"onResize",t)},onTabItemTap(t){Oe(this,e,"onTabItemTap",t)},onSaveExitState(){Oe(this,e,"onSaveExitState")}})},t.detached=t=>ke(Pe(),"detached",t),t.effect=function(t,e){t.effect instanceof b&&(t=t.effect.fn);const o=new b(t,n,(()=>{o.dirty&&o.run()}));e&&(s(o,e),e.scope&&S(o,e.scope)),e&&e.lazy||o.run();const r=o.run.bind(o);return r.effect=o,r},t.effectScope=w,t.error=t=>ke(Pe(),"error",t),t.getCurrentScope=R,t.isProxy=At,t.isReactive=xt,t.isReadonly=It,t.isRef=Wt,t.isShallow=Tt,t.markRaw=function(t){return Object.isExtensible(t)&&((t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})})(t,"__v_skip",!0),t},t.moved=t=>ke(Pe(),"moved",t),t.onAddToFavorites=t=>ke(Le(),"onAddToFavorites",t),t.onHide=t=>ke(Le(),"onHide",t),t.onLoad=t=>ke(Le(),"onLoad",t),t.onPageScroll=t=>ke(Le(),"onPageScroll",t),t.onPullDownRefresh=t=>ke(Le(),"onPullDownRefresh",t),t.onReachBottom=t=>ke(Le(),"onReachBottom",t),t.onReady=t=>ke(Le(),"onReady",t),t.onResize=t=>ke(Le(),"onResize",t),t.onRouteDone=t=>ke(Le(),"onRouteDone",t),t.onSaveExitState=t=>ke(Le(),"onSaveExitState",t),t.onScopeDispose=function(t){v&&v.cleanups.push(t)},t.onShareAppMessage=t=>ke(Le(),"onShareAppMessage",t),t.onShareTimeline=t=>ke(Le(),"onShareTimeline",t),t.onShow=t=>ke(Le(),"onShow",t),t.onTabItemTap=t=>ke(Le(),"onTabItemTap",t),t.onUnload=t=>ke(Le(),"onUnload",t),t.proxyRefs=function(t){return xt(t)?t:new Proxy(t,Kt)},t.reactive=kt,t.readonly=Pt,t.ready=t=>ke(Pe(),"ready",t),t.ref=Ut,t.shallowReactive=Lt,t.shallowReadonly=function(t){return jt(t,!0,tt,bt,Et)},t.shallowRef=function(t){return Bt(t,!0)},t.stop=function(t){t.effect.stop()},t.toRaw=Mt,t.toRef=function(t,e,n){return Wt(t)?t:a(t)?new Yt(t):l(t)&&arguments.length>1?Gt(t,e,n):Ut(t)},t.toRefs=function(t){const e=i(t)?new Array(t.length):{};for(const n in t)e[n]=Gt(t,n);return e},t.toValue=function(t){return a(t)?t():Ft(t)},t.triggerRef=function(t){Ct(t,4)},t.unref=Ft,t.useComponent=Pe,t.usePage=Le,t.watch=ye,t.watchEffect=function(t,e){return we(t,null,e)},t.watchPostEffect=function(t,e){return we(t,null,/* istanbul ignore next -- @preserve */{flush:"post"})},t.watchSyncEffect=function(t,e){return we(t,null,/* istanbul ignore next -- @preserve */{flush:"sync"})}}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1724456479280);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map