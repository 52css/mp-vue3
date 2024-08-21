module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1724231829847, function(require, module, exports) {
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MpVue3={})}(this,(function(t){
/**
  * @vue/shared v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
/*! #__NO_SIDE_EFFECTS__ */function e(t,e){const n=new Set(t.split(","));return t=>n.has(t)}const n=()=>{},s=Object.assign,i=Object.prototype.hasOwnProperty,r=(t,e)=>i.call(t,e),o=Array.isArray,c=t=>"[object Map]"===f(t),a=t=>"function"==typeof t,h=t=>"symbol"==typeof t,l=t=>null!==t&&"object"==typeof t,u=Object.prototype.toString,f=t=>u.call(t),d=t=>f(t).slice(8,-1),p=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,_=(t,e)=>!Object.is(t,e);
/**
  * @vue/reactivity v3.4.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
let v,g;class y{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=v,!t&&v&&(this.index=(v.scopes||(v.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=v;try{return v=this,t()}finally{v=e}}}on(){v=this}off(){v=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function b(t){return new y(t)}function m(t,e=v){e&&e.active&&e.effects.push(t)}function S(){return v}class w{constructor(t,e,n,s){this.fn=t,this.trigger=e,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,m(this,s)}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,k();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(R(e.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),A()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=$,e=g;try{return $=!0,g=this,this._runnings++,E(this),this.fn()}finally{O(this),this._runnings--,g=e,$=t}}stop(){this.active&&(E(this),O(this),this.onStop&&this.onStop(),this.active=!1)}}function R(t){return t.value}function E(t){t._trackId++,t._depsLength=0}function O(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)P(t.deps[e],t);t.deps.length=t._depsLength}}function P(t,e){const n=t.get(e);void 0!==n&&e._trackId!==n&&(t.delete(e),0===t.size&&t.cleanup())}let $=!0,I=0;const L=[];function k(){L.push($),$=!1}function A(){const t=L.pop();$=void 0===t||t}function x(){I++}function j(){for(I--;!I&&C.length;)C.shift()()}function T(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const n=t.deps[t._depsLength];n!==e?(n&&P(n,t),t.deps[t._depsLength++]=e):t._depsLength++}}const C=[];function M(t,e,n){x();for(const n of t.keys()){let s;n._dirtyLevel<e&&(null!=s?s:s=t.get(n)===n._trackId)&&(n._shouldSchedule||(n._shouldSchedule=0===n._dirtyLevel),n._dirtyLevel=e),n._shouldSchedule&&(null!=s?s:s=t.get(n)===n._trackId)&&(n.trigger(),n._runnings&&!n.allowRecurse||2===n._dirtyLevel||(n._shouldSchedule=!1,n.scheduler&&C.push(n.scheduler)))}j()}const D=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},N=new WeakMap,z=Symbol(""),H=Symbol("");function V(t,e,n){if($&&g){let e=N.get(t);e||N.set(t,e=new Map);let s=e.get(n);s||e.set(n,s=D((()=>e.delete(n)))),T(g,s)}}function B(t,e,n,s,i,r){const a=N.get(t);if(!a)return;let l=[];if("clear"===e)l=[...a.values()];else if("length"===n&&o(t)){const t=Number(s);a.forEach(((e,n)=>{("length"===n||!h(n)&&n>=t)&&l.push(e)}))}else switch(void 0!==n&&l.push(a.get(n)),e){case"add":o(t)?p(n)&&l.push(a.get("length")):(l.push(a.get(z)),c(t)&&l.push(a.get(H)));break;case"delete":o(t)||(l.push(a.get(z)),c(t)&&l.push(a.get(H)));break;case"set":c(t)&&l.push(a.get(z))}x();for(const t of l)t&&M(t,4);j()}const U=e("__proto__,__v_isRef,__isVue"),W=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(h)),Q=F();function F(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const n=Tt(this);for(let t=0,e=this.length;t<e;t++)V(n,0,t+"");const s=n[e](...t);return-1===s||!1===s?n[e](...t.map(Tt)):s}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){k(),x();const n=Tt(this)[e].apply(this,t);return j(),A(),n}})),t}function K(t){h(t)||(t=String(t));const e=Tt(this);return V(e,0,t),e.hasOwnProperty(t)}class q{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){const s=this._isReadonly,i=this._isShallow;if("__v_isReactive"===e)return!s;if("__v_isReadonly"===e)return s;if("__v_isShallow"===e)return i;if("__v_raw"===e)return n===(s?i?Pt:Ot:i?Et:Rt).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const c=o(t);if(!s){if(c&&r(Q,e))return Reflect.get(Q,e,n);if("hasOwnProperty"===e)return K}const a=Reflect.get(t,e,n);return(h(e)?W.has(e):U(e))?a:(s||V(t,0,e),i?a:Ht(a)?c&&p(e)?a:a.value:l(a)?s?It(a):$t(a):a)}}class Y extends q{constructor(t=!1){super(!1,t)}set(t,e,n,s){let i=t[e];if(!this._isShallow){const e=At(i);if(xt(n)||At(n)||(i=Tt(i),n=Tt(n)),!o(t)&&Ht(i)&&!Ht(n))return!e&&(i.value=n,!0)}const c=o(t)&&p(e)?Number(e)<t.length:r(t,e),a=Reflect.set(t,e,n,s);return t===Tt(s)&&(c?_(n,i)&&B(t,"set",e,n):B(t,"add",e,n)),a}deleteProperty(t,e){const n=r(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&B(t,"delete",e,void 0),s}has(t,e){const n=Reflect.has(t,e);return h(e)&&W.has(e)||V(t,0,e),n}ownKeys(t){return V(t,0,o(t)?"length":z),Reflect.ownKeys(t)}}class G extends q{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const J=new Y,X=new G,Z=new Y(!0),tt=new G(!0),et=t=>t,nt=t=>Reflect.getPrototypeOf(t);function st(t,e,n=!1,s=!1){const i=Tt(t=t.__v_raw),r=Tt(e);n||(_(e,r)&&V(i,0,e),V(i,0,r));const{has:o}=nt(i),c=s?et:n?Mt:Ct;return o.call(i,e)?c(t.get(e)):o.call(i,r)?c(t.get(r)):void(t!==i&&t.get(e))}function it(t,e=!1){const n=this.__v_raw,s=Tt(n),i=Tt(t);return e||(_(t,i)&&V(s,0,t),V(s,0,i)),t===i?n.has(t):n.has(t)||n.has(i)}function rt(t,e=!1){return t=t.__v_raw,!e&&V(Tt(t),0,z),Reflect.get(t,"size",t)}function ot(t,e=!1){e||xt(t)||At(t)||(t=Tt(t));const n=Tt(this);return nt(n).has.call(n,t)||(n.add(t),B(n,"add",t,t)),this}function ct(t,e,n=!1){n||xt(e)||At(e)||(e=Tt(e));const s=Tt(this),{has:i,get:r}=nt(s);let o=i.call(s,t);o||(t=Tt(t),o=i.call(s,t));const c=r.call(s,t);return s.set(t,e),o?_(e,c)&&B(s,"set",t,e):B(s,"add",t,e),this}function at(t){const e=Tt(this),{has:n,get:s}=nt(e);let i=n.call(e,t);i||(t=Tt(t),i=n.call(e,t)),s&&s.call(e,t);const r=e.delete(t);return i&&B(e,"delete",t,void 0),r}function ht(){const t=Tt(this),e=0!==t.size,n=t.clear();return e&&B(t,"clear",void 0,void 0),n}function lt(t,e){return function(n,s){const i=this,r=i.__v_raw,o=Tt(r),c=e?et:t?Mt:Ct;return!t&&V(o,0,z),r.forEach(((t,e)=>n.call(s,c(t),c(e),i)))}}function ut(t,e,n){return function(...s){const i=this.__v_raw,r=Tt(i),o=c(r),a="entries"===t||t===Symbol.iterator&&o,h="keys"===t&&o,l=i[t](...s),u=n?et:e?Mt:Ct;return!e&&V(r,0,h?H:z),{next(){const{value:t,done:e}=l.next();return e?{value:t,done:e}:{value:a?[u(t[0]),u(t[1])]:u(t),done:e}},[Symbol.iterator](){return this}}}}function ft(t){return function(...e){return"delete"!==t&&("clear"===t?void 0:this)}}function dt(){const t={get(t){return st(this,t)},get size(){return rt(this)},has:it,add:ot,set:ct,delete:at,clear:ht,forEach:lt(!1,!1)},e={get(t){return st(this,t,!1,!0)},get size(){return rt(this)},has:it,add(t){return ot.call(this,t,!0)},set(t,e){return ct.call(this,t,e,!0)},delete:at,clear:ht,forEach:lt(!1,!0)},n={get(t){return st(this,t,!0)},get size(){return rt(this,!0)},has(t){return it.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:lt(!0,!1)},s={get(t){return st(this,t,!0,!0)},get size(){return rt(this,!0)},has(t){return it.call(this,t,!0)},add:ft("add"),set:ft("set"),delete:ft("delete"),clear:ft("clear"),forEach:lt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((i=>{t[i]=ut(i,!1,!1),n[i]=ut(i,!0,!1),e[i]=ut(i,!1,!0),s[i]=ut(i,!0,!0)})),[t,n,e,s]}const[pt,_t,vt,gt]=dt();function yt(t,e){const n=e?t?gt:vt:t?_t:pt;return(e,s,i)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(r(n,s)&&s in e?n:e,s,i)}const bt={get:yt(!1,!1)},mt={get:yt(!1,!0)},St={get:yt(!0,!1)},wt={get:yt(!0,!0)},Rt=new WeakMap,Et=new WeakMap,Ot=new WeakMap,Pt=new WeakMap;function $t(t){return At(t)?t:Lt(t,!1,J,bt,Rt)}function It(t){return Lt(t,!0,X,St,Ot)}function Lt(t,e,n,s,i){if(!l(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const o=(c=t).__v_skip||!Object.isExtensible(c)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(d(c));var c;if(0===o)return t;const a=new Proxy(t,2===o?s:n);return i.set(t,a),a}function kt(t){return At(t)?kt(t.__v_raw):!(!t||!t.__v_isReactive)}function At(t){return!(!t||!t.__v_isReadonly)}function xt(t){return!(!t||!t.__v_isShallow)}function jt(t){return!!t&&!!t.__v_raw}function Tt(t){const e=t&&t.__v_raw;return e?Tt(e):t}const Ct=t=>l(t)?$t(t):t,Mt=t=>l(t)?It(t):t;class Dt{constructor(t,e,n,s){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new w((()=>t(this._value)),(()=>zt(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const t=Tt(this);return t._cacheable&&!t.effect.dirty||!_(t._value,t._value=t.effect.run())||zt(t,4),Nt(t),t.effect._dirtyLevel>=2&&zt(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Nt(t){var e;$&&g&&(t=Tt(t),T(g,null!=(e=t.dep)?e:t.dep=D((()=>t.dep=void 0),t instanceof Dt?t:void 0)))}function zt(t,e=4,n,s){const i=(t=Tt(t)).dep;i&&M(i,e)}function Ht(t){return!(!t||!0!==t.__v_isRef)}function Vt(t){return Bt(t,!1)}function Bt(t,e){return Ht(t)?t:new Ut(t,e)}class Ut{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:Tt(t),this._value=e?t:Ct(t)}get value(){return Nt(this),this._value}set value(t){const e=this.__v_isShallow||xt(t)||At(t);t=e?t:Tt(t),_(t,this._rawValue)&&(this._rawValue,this._rawValue=t,this._value=e?t:Ct(t),zt(this,4))}}function Wt(t){return Ht(t)?t.value:t}const Qt={get:(t,e,n)=>Wt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Ht(i)&&!Ht(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};class Ft{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:n}=t((()=>Nt(this)),(()=>zt(this)));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}class Kt{constructor(t,e,n){this._object=t,this._key=e,this._defaultValue=n,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return function(t,e){const n=N.get(t);return n&&n.get(e)}(Tt(this._object),this._key)}}class qt{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Yt(t,e,n){const s=t[e];return Ht(s)?s:new Kt(t,e,n)}const Gt={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",IS_SHALLOW:"__v_isShallow",RAW:"__v_raw"},Jt=()=>{},{isArray:Xt}=Array;function Zt(t){return Object.prototype.toString.call(t).slice(8,-1)}function te(t){return null!==t&&"object"==typeof t}function ee(t){return"Object"===Zt(t)}function ne(t){return"function"==typeof t}function se(t,e){return t!==e&&(t==t||e==e)}var ie=!1;let re=!1,oe=!1;const ce=[];let ae=0;const he=[];let le=null,ue=0;const fe=Promise.resolve();function de(t){0!==ce.length&&ce.includes(t,re&&t.allowRecurse?ae+1:ae)||(ce.push(t),re||oe||(oe=!0,fe.then(_e)))}function pe(){if(he.length>0){for(le=[...new Set(he)],he.length=0,ue=0;ue<le.length;ue++){const t=le[ue];!1!==t.active&&t()}le=null,ue=0}}function _e(t){oe=!1,re=!0;const e=/* istanbul ignore next -- @preserve  */Jt;try{for(ae=0;ae<ce.length;ae++){const t=ce[ae];!1!==t.active&&(ie&&e(t),t())}}finally{ae=0,ce.length=0,re=!1}}const ve={};function ge(t,e,n){return ye(t,e,n)}function ye(t,e,{immediate:n,deep:s,flush:i,once:r,onTrack:o,onTrigger:c}={}){if(e&&r){const t=e;e=(...e)=>{t(...e),b()}}const a=t=>!0===s?t:be(t,!1===s?1:void 0);let h,l,u=!1,f=!1;if(Ht(t)?(h=()=>t.value,u=xt(t)):kt(t)?(h=()=>a(t),u=!0):Xt(t)?(f=!0,u=t.some((t=>kt(t)||xt(t))),h=()=>t.map((t=>Ht(t)?t.value:kt(t)?a(t):ne(t)?t():void 0))):h=ne(t)?e?()=>t():()=>(l&&l(),t(d)):Jt,e&&s){const t=h;h=()=>be(t())}const d=t=>{l=g.onStop=()=>{t(),l=g.onStop=void 0}};let p=f?Array.from({length:t.length}).fill(ve):ve;const _=()=>{if(g.active&&g.dirty)if(e){const t=g.run();(s||u||(f?t.some(((t,e)=>se(t,p[e]))):se(t,p)))&&(l&&l(),e(t,p===ve?void 0:f&&p[0]===ve?[]:p,d),p=t)}else g.run()};let v;_.allowRecurse=Boolean(e),v="sync"===i?_:"post"===i?()=>{!function(t){le&&le.includes(t,t.allowRecurse?ue+1:ue)||he.push(t)}(_)}:()=>{de(_)};const g=new w(h,Jt,v),y=S(),b=()=>{g.stop(),y&&function(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}(y.effects,g)};return e?n?_():p=g.run():g.run(),b}function be(t,e=Number.POSITIVE_INFINITY,n){if(e<=0||!te(t)||t[Gt.SKIP])return t;if((n=n||new Set).has(t))return t;
/* istanbul ignore else -- @preserve  */
if(n.add(t),e--,Ht(t))be(t.value,e,n);else if(Xt(t))for(let s=0;s<t.length;s++)be(t[s],e,n);else if("Set"===Zt(t)||function(t){return"Map"===Zt(t)}(t))t.forEach((t=>{be(t,e,n)}));else if(ee(t)){for(const s in t)be(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&be(t[s],e,n)}return t}function me(t){if(function(t){const e=new Set(["undefined","boolean","number","string"]);return null===t||e.has(typeof t)}(t)||ne(t))return t;if(Ht(t))return me(t.value);if(jt(t))return me(Tt(t));if(Xt(t))return t.map((t=>me(t)));if(ee(t)){const e={};return Object.keys(t).forEach((n=>{e[n]=me(t[n])})),e}throw new TypeError(`${Zt(t)} value is not supported`)}function Se(t,e,n){te(n)&&ge(Ht(n)?n:()=>n,(()=>{t.setData({[e]:me(n)},pe)}),{deep:!0})}let we=null,Re=null;const Ee=(t,e,n,...s)=>{if(e&&e[n]&&e[n](...s),!t[`$${n}`])return;const i={onLoad:"onUnload",onShow:"onHide",attached:"detached"}[n];t[`$${n}`].forEach((e=>{if(i){const n=t[`$${i}`]&&t[`$${i}`].find((t=>t.front===e));n&&n()}const n=e.apply(t,s);if(i&&"function"==typeof n){t[`$${i}`]&&t[`$${i}`].find((t=>t.front===e))||(n.front,t[`$${i}`]||(t[`$${i}`]=[]),t[`$${i}`].push(n))}}))},Oe=(t,e,n,...s)=>{if(e&&e[n])return e[n](...s);if(t[`$${n}`]){if(t[`$${n}`].length)throw new Error(`一个page只能配置一个${n}`);return t[`$${n}`][0].apply(t,s)}},Pe=(t,e,n)=>{t&&(t[`$${e}`]||(t[`$${e}`]=[]),t[`$${e}`].push(n))},$e=()=>we,Ie=()=>Re;t.EffectScope=y,t.ReactiveEffect=w,t.attached=t=>Pe(Ie(),"attached",t),t.computed=function(t,e,s=!1){let i,r;const o=a(t);return o?(i=t,r=n):(i=t.get,r=t.set),new Dt(i,r,o||!r,s)},t.customRef=function(t){return new Ft(t)},t.defineComponent=t=>{if(!t)return Component({options:{virtualHost:!0,styleIsolation:"apply-shared",multipleSlots:!0}});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s,t=n}const n=e.options,s=(t,e)=>n&&void 0!==n[t]?n[t]:e;if(!t)return Component({...e,options:{...n,virtualHost:s("virtualHost",!0),styleIsolation:s("styleIsolation","apply-shared"),multipleSlots:s("multipleSlots",!0)}});let i=null;e.properties&&(i=Object.keys(e.properties)),i&&(void 0===e.observers&&(e.observers={}),i.forEach((t=>{const n=e.observers[t];e.observers[t]=function(e){this.$props&&(this.$props[t]=e),void 0!==n&&n.call(this,e)}}))),Component({...e,options:{...n,virtualHost:s("virtualHost",!0),styleIsolation:s("styleIsolation","apply-shared"),multipleSlots:s("multipleSlots",!0)},lifetimes:{attached(){Re=this,this.$scope=b(),this.$prop=new Proxy(this.properties,{set:(t,e,n,s)=>(this.setData({[e]:n}),this.triggerEvent(e,{value:n}),Reflect.set(t,e,n,s))}),this.$context={is:this.is,id:this.id,dataset:this.dataset,exitState:this.exitState,router:this.router,pageRouter:this.pageRouter,renderer:this.renderer,triggerEvent:this.triggerEvent.bind(this),createSelectorQuery:this.createSelectorQuery.bind(this),createIntersectionObserver:this.createIntersectionObserver.bind(this),createMediaQueryObserver:this.createMediaQueryObserver.bind(this),selectComponent:this.selectComponent.bind(this),selectAllComponents:this.selectAllComponents.bind(this),selectOwnerComponent:this.selectOwnerComponent.bind(this),getRelationNodes:this.getRelationNodes.bind(this),getTabBar:this.getTabBar.bind(this),getPageId:this.getPageId.bind(this),animate:this.animate.bind(this),clearAnimation:this.clearAnimation.bind(this),getOpenerEventChannel:this.getOpenerEventChannel.bind(this),applyAnimatedStyle:this.applyAnimatedStyle.bind(this),clearAnimatedStyle:this.clearAnimatedStyle.bind(this),setUpdatePerformanceListener:this.setUpdatePerformanceListener.bind(this),getPassiveEvent:this.getPassiveEvent.bind(this),setPassiveEvent:this.setPassiveEvent.bind(this),emit:(t,e)=>{this.triggerEvent(t,{value:e})}},this.$scope.run((()=>{const n=t.call(this,this.$prop,this.$context);void 0!==n&&Object.keys(n).forEach((t=>{const e=n[t];ne(e)?this[t]=e:(this.setData({[t]:me(e)}),Se(this,t,e))})),Ee(this,e,"attached")})),Re=null},ready(){Ee(this,e,"ready")},moved(){Ee(this,e,"moved")},detached(){Ee(this,e,"detached"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((t=>{try{delete this[t]}catch(t){console.error("销毁异常",t)}}))},error(t){Ee(this,e,"error",t)}}})},t.definePage=t=>{if(!t)return Page({});let e={};if("function"!=typeof t){const{setup:n,...s}=t;e=s||{},t=n}if(!t)return Page(e);Page({...e,onLoad(n){we=this,this.$scope=b(),this.$query=n,this.$context={is:this.is,id:this.id,dataset:this.dataset,exitState:this.exitState,router:this.router,pageRouter:this.pageRouter,renderer:this.renderer,triggerEvent:this.triggerEvent.bind(this),createSelectorQuery:this.createSelectorQuery.bind(this),createIntersectionObserver:this.createIntersectionObserver.bind(this),createMediaQueryObserver:this.createMediaQueryObserver.bind(this),selectComponent:this.selectComponent.bind(this),selectAllComponents:this.selectAllComponents.bind(this),selectOwnerComponent:this.selectOwnerComponent.bind(this),getRelationNodes:this.getRelationNodes.bind(this),getTabBar:this.getTabBar.bind(this),getPageId:this.getPageId.bind(this),animate:this.animate.bind(this),clearAnimation:this.clearAnimation.bind(this),getOpenerEventChannel:this.getOpenerEventChannel.bind(this),applyAnimatedStyle:this.applyAnimatedStyle.bind(this),clearAnimatedStyle:this.clearAnimatedStyle.bind(this),setUpdatePerformanceListener:this.setUpdatePerformanceListener.bind(this),getPassiveEvent:this.getPassiveEvent.bind(this),setPassiveEvent:this.setPassiveEvent.bind(this)},this.$scope.run((()=>{const s=t.call(this,this.$query,this.$context);void 0!==s&&Object.keys(s).forEach((t=>{const e=s[t];ne(e)?this[t]=e:(this.setData({[t]:me(e)}),Se(this,t,e))})),Ee(this,e,"onLoad",n)})),we=null},onShow(){Ee(this,e,"onShow")},onReady(){Ee(this,e,"onReady")},onHide(){Ee(this,e,"onHide")},onUnload(){Ee(this,e,"onUnload"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((t=>{try{delete this[t]}catch(t){console.error("销毁异常",t)}}))},onRouteDone(){Ee(this,e,"onRouteDone")},onPullDownRefresh(){Ee(this,e,"onPullDownRefresh")},onReachBottom(){Ee(this,e,"onReachBottom")},onPageScroll(t){Ee(this,e,"onPageScroll",t)},onAddToFavorites(t){return Oe(this,e,"onAddToFavorites",t)},onShareAppMessage(t){return Oe(this,e,"onShareAppMessage",t)},onShareTimeline(){return Oe(this,e,"onShareTimeline")},onResize(t){Ee(this,e,"onResize",t)},onTabItemTap(t){Ee(this,e,"onTabItemTap",t)},onSaveExitState(){Ee(this,e,"onSaveExitState")}})},t.detached=t=>Pe(Ie(),"detached",t),t.effect=function(t,e){t.effect instanceof w&&(t=t.effect.fn);const i=new w(t,n,(()=>{i.dirty&&i.run()}));e&&(s(i,e),e.scope&&m(i,e.scope)),e&&e.lazy||i.run();const r=i.run.bind(i);return r.effect=i,r},t.effectScope=b,t.error=t=>Pe(Ie(),"error",t),t.getCurrentScope=S,t.isProxy=jt,t.isReactive=kt,t.isReadonly=At,t.isRef=Ht,t.isShallow=xt,t.markRaw=function(t){return Object.isExtensible(t)&&((t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})})(t,"__v_skip",!0),t},t.moved=t=>Pe(Ie(),"moved",t),t.onAddToFavorites=t=>Pe($e(),"onAddToFavorites",t),t.onHide=t=>Pe($e(),"onHide",t),t.onLoad=t=>Pe($e(),"onLoad",t),t.onPageScroll=t=>Pe($e(),"onPageScroll",t),t.onPullDownRefresh=t=>Pe($e(),"onPullDownRefresh",t),t.onReachBottom=t=>Pe($e(),"onReachBottom",t),t.onReady=t=>Pe($e(),"onReady",t),t.onResize=t=>Pe($e(),"onResize",t),t.onRouteDone=t=>Pe($e(),"onRouteDone",t),t.onSaveExitState=t=>Pe($e(),"onSaveExitState",t),t.onScopeDispose=function(t){v&&v.cleanups.push(t)},t.onShareAppMessage=t=>Pe($e(),"onShareAppMessage",t),t.onShareTimeline=t=>Pe($e(),"onShareTimeline",t),t.onShow=t=>Pe($e(),"onShow",t),t.onTabItemTap=t=>Pe($e(),"onTabItemTap",t),t.onUnload=t=>Pe($e(),"onUnload",t),t.proxyRefs=function(t){return kt(t)?t:new Proxy(t,Qt)},t.reactive=$t,t.readonly=It,t.ready=t=>Pe(Ie(),"ready",t),t.ref=Vt,t.shallowReactive=function(t){return Lt(t,!1,Z,mt,Et)},t.shallowReadonly=function(t){return Lt(t,!0,tt,wt,Pt)},t.shallowRef=function(t){return Bt(t,!0)},t.stop=function(t){t.effect.stop()},t.toRaw=Tt,t.toRef=function(t,e,n){return Ht(t)?t:a(t)?new qt(t):l(t)&&arguments.length>1?Yt(t,e,n):Vt(t)},t.toRefs=function(t){const e=o(t)?new Array(t.length):{};for(const n in t)e[n]=Yt(t,n);return e},t.toValue=function(t){return a(t)?t():Wt(t)},t.triggerRef=function(t){zt(t,4)},t.unref=Wt,t.useComponent=Ie,t.usePage=$e,t.watch=ge,t.watchEffect=function(t,e){return ye(t,null,e)},t.watchPostEffect=function(t,e){return ye(t,null,/* istanbul ignore next -- @preserve */{flush:"post"})},t.watchSyncEffect=function(t,e){return ye(t,null,/* istanbul ignore next -- @preserve */{flush:"sync"})}}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1724231829847);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map