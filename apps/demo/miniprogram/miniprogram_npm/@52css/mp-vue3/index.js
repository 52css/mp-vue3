module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1725540257926, function(require, module, exports) {
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MpVue3={})}(this,(function(e){
/**
  * @vue/shared v3.5.1
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
/*! #__NO_SIDE_EFFECTS__ */function t(e,t){const n=new Set(e.split(","));return e=>n.has(e)}const n={},s=()=>{},i=Object.assign,o=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},r=Object.prototype.hasOwnProperty,c=(e,t)=>r.call(e,t),a=Array.isArray,u=e=>"[object Map]"===v(e),h=e=>"[object Set]"===v(e),l=e=>"function"==typeof e,f=e=>"symbol"==typeof e,d=e=>null!==e&&"object"==typeof e,p=Object.prototype.toString,v=e=>p.call(e),g=e=>v(e).slice(8,-1),_=e=>"[object Object]"===v(e),y=e=>"string"==typeof e&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,b=(e,t)=>!Object.is(e,t);
/**
  * @vue/reactivity v3.5.1
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
let w,m;class S{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=w,!e&&w&&(this.index=(w.scopes||(w.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=w;try{return w=this,e()}finally{w=t}}}on(){w=this}off(){w=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this._active=!1}}}function R(e){return new S(e)}function x(){return w}const $=new WeakSet;class P{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.nextEffect=void 0,this.cleanup=void 0,this.scheduler=void 0,w&&w.active&&w.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,$.has(this)&&($.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||(this.flags|=8,this.nextEffect=k,k=this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,V(this),j(this);const e=m,t=z;m=this,z=!0;try{return this.fn()}finally{T(this),m=e,z=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)I(e);this.deps=this.depsTail=void 0,V(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?$.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){A(this)&&this.run()}get dirty(){return A(this)}}let k,D=0;function E(){D++}function O(){if(--D>0)return;let e;for(;k;){let t=k;for(k=void 0;t;){const n=t.nextEffect;if(t.nextEffect=void 0,t.flags&=-9,1&t.flags)try{t.trigger()}catch(t){e||(e=t)}t=n}}if(e)throw e}function j(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function T(e){let t,n=e.depsTail;for(let e=n;e;e=e.prevDep)-1===e.version?(e===n&&(n=e.prevDep),I(e),M(e)):t=e,e.dep.activeLink=e.prevActiveLink,e.prevActiveLink=void 0;e.deps=t,e.depsTail=n}function A(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&!1===L(t.dep.computed)||t.dep.version!==t.version)return!0;return!!e._dirty}function L(e){if(2&e.flags)return!1;if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===W)return;e.globalVersion=W;const t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&!A(e))return void(e.flags&=-3);const n=m,s=z;m=e,z=!0;try{j(e);const n=e.fn();(0===t.version||b(n,e._value))&&(e._value=n,t.version++)}catch(e){throw t.version++,e}finally{m=n,z=s,T(e),e.flags&=-3}}function I(e){const{dep:t,prevSub:n,nextSub:s}=e;if(n&&(n.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=n,e.nextSub=void 0),t.subs===e&&(t.subs=n),!t.subs&&t.computed){t.computed.flags&=-5;for(let e=t.computed.deps;e;e=e.nextDep)I(e)}}function M(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let z=!0;const N=[];function C(){N.push(z),z=!1}function U(){const e=N.pop();z=void 0===e||e}function V(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=m;m=void 0;try{t()}finally{m=e}}}let W=0;class F{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0}track(e){if(!m||!z)return;let t=this.activeLink;if(void 0===t||t.sub!==m)t=this.activeLink={dep:this,sub:m,version:this.version,nextDep:void 0,prevDep:void 0,nextSub:void 0,prevSub:void 0,prevActiveLink:void 0},m.deps?(t.prevDep=m.depsTail,m.depsTail.nextDep=t,m.depsTail=t):m.deps=m.depsTail=t,4&m.flags&&H(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=m.depsTail,t.nextDep=void 0,m.depsTail.nextDep=t,m.depsTail=t,m.deps===t&&(m.deps=e)}return t}trigger(e){this.version++,W++,this.notify(e)}notify(e){E();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()}finally{O()}}}function H(e){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)H(e)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}const B=new WeakMap,q=Symbol(""),J=Symbol(""),K=Symbol("");function G(e,t,n){if(z&&m){let t=B.get(e);t||B.set(e,t=new Map);let s=t.get(n);s||t.set(n,s=new F),s.track()}}function Q(e,t,n,s,i,o){const r=B.get(e);if(!r)return void W++;let c=[];if("clear"===t)c=[...r.values()];else{const i=a(e),o=i&&y(n);if(i&&"length"===n){const e=Number(s);r.forEach(((t,n)=>{("length"===n||n===K||!f(n)&&n>=e)&&c.push(t)}))}else{const s=e=>e&&c.push(e);switch(void 0!==n&&s(r.get(n)),o&&s(r.get(K)),t){case"add":i?o&&s(r.get("length")):(s(r.get(q)),u(e)&&s(r.get(J)));break;case"delete":i||(s(r.get(q)),u(e)&&s(r.get(J)));break;case"set":u(e)&&s(r.get(q))}}}E();for(const e of c)e.trigger();O()}function X(e){const t=Qe(e);return t===e?t:(G(t,0,K),Ke(e)?t:t.map(Xe))}function Y(e){return G(e=Qe(e),0,K),e}const Z={__proto__:null,[Symbol.iterator](){return ee(this,Symbol.iterator,Xe)},concat(...e){return X(this).concat(...e.map((e=>a(e)?X(e):e)))},entries(){return ee(this,"entries",(e=>(e[1]=Xe(e[1]),e)))},every(e,t){return ne(this,"every",e,t,void 0,arguments)},filter(e,t){return ne(this,"filter",e,t,(e=>e.map(Xe)),arguments)},find(e,t){return ne(this,"find",e,t,Xe,arguments)},findIndex(e,t){return ne(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ne(this,"findLast",e,t,Xe,arguments)},findLastIndex(e,t){return ne(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ne(this,"forEach",e,t,void 0,arguments)},includes(...e){return ie(this,"includes",e)},indexOf(...e){return ie(this,"indexOf",e)},join(e){return X(this).join(e)},lastIndexOf(...e){return ie(this,"lastIndexOf",e)},map(e,t){return ne(this,"map",e,t,void 0,arguments)},pop(){return oe(this,"pop")},push(...e){return oe(this,"push",e)},reduce(e,...t){return se(this,"reduce",e,t)},reduceRight(e,...t){return se(this,"reduceRight",e,t)},shift(){return oe(this,"shift")},some(e,t){return ne(this,"some",e,t,void 0,arguments)},splice(...e){return oe(this,"splice",e)},toReversed(){return X(this).toReversed()},toSorted(e){return X(this).toSorted(e)},toSpliced(...e){return X(this).toSpliced(...e)},unshift(...e){return oe(this,"unshift",e)},values(){return ee(this,"values",Xe)}};function ee(e,t,n){const s=Y(e),i=s[t]();return s===e||Ke(e)||(i._next=i.next,i.next=()=>{const e=i._next();return e.value&&(e.value=n(e.value)),e}),i}const te=Array.prototype;function ne(e,t,n,s,i,o){const r=Y(e),c=r!==e&&!Ke(e),a=r[t];if(a!==te[t]){const t=a.apply(e,o);return c?Xe(t):t}let u=n;r!==e&&(c?u=function(t,s){return n.call(this,Xe(t),s,e)}:n.length>2&&(u=function(t,s){return n.call(this,t,s,e)}));const h=a.call(r,u,s);return c&&i?i(h):h}function se(e,t,n,s){const i=Y(e);let o=n;return i!==e&&(Ke(e)?n.length>3&&(o=function(t,s,i){return n.call(this,t,s,i,e)}):o=function(t,s,i){return n.call(this,t,Xe(s),i,e)}),i[t](o,...s)}function ie(e,t,n){const s=Qe(e);G(s,0,K);const i=s[t](...n);return-1!==i&&!1!==i||!Ge(n[0])?i:(n[0]=Qe(n[0]),s[t](...n))}function oe(e,t,n=[]){C(),E();const s=Qe(e)[t].apply(e,n);return O(),U(),s}const re=t("__proto__,__v_isRef,__isVue"),ce=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(f));function ae(e){f(e)||(e=String(e));const t=Qe(this);return G(t,0,e),t.hasOwnProperty(e)}class ue{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){const s=this._isReadonly,i=this._isShallow;if("__v_isReactive"===t)return!s;if("__v_isReadonly"===t)return s;if("__v_isShallow"===t)return i;if("__v_raw"===t)return n===(s?i?Ve:Ue:i?Ce:Ne).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=a(e);if(!s){let e;if(o&&(e=Z[t]))return e;if("hasOwnProperty"===t)return ae}const r=Reflect.get(e,t,Ze(e)?e:n);return(f(t)?ce.has(t):re(t))?r:(s||G(e,0,t),i?r:Ze(r)?o&&y(t)?r:r.value:d(r)?s?He(r):We(r):r)}}class he extends ue{constructor(e=!1){super(!1,e)}set(e,t,n,s){let i=e[t];if(!this._isShallow){const t=Je(i);if(Ke(n)||Je(n)||(i=Qe(i),n=Qe(n)),!a(e)&&Ze(i)&&!Ze(n))return!t&&(i.value=n,!0)}const o=a(e)&&y(t)?Number(t)<e.length:c(e,t),r=Reflect.set(e,t,n,Ze(e)?e:s);return e===Qe(s)&&(o?b(n,i)&&Q(e,"set",t,n):Q(e,"add",t,n)),r}deleteProperty(e,t){const n=c(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&n&&Q(e,"delete",t,void 0),s}has(e,t){const n=Reflect.has(e,t);return f(t)&&ce.has(t)||G(e,0,t),n}ownKeys(e){return G(e,0,a(e)?"length":q),Reflect.ownKeys(e)}}class le extends ue{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const fe=new he,de=new le,pe=new he(!0),ve=new le(!0),ge=e=>e,_e=e=>Reflect.getPrototypeOf(e);function ye(e,t,n=!1,s=!1){const i=Qe(e=e.__v_raw),o=Qe(t);n||(b(t,o)&&G(i,0,t),G(i,0,o));const{has:r}=_e(i),c=s?ge:n?Ye:Xe;return r.call(i,t)?c(e.get(t)):r.call(i,o)?c(e.get(o)):void(e!==i&&e.get(t))}function be(e,t=!1){const n=this.__v_raw,s=Qe(n),i=Qe(e);return t||(b(e,i)&&G(s,0,e),G(s,0,i)),e===i?n.has(e):n.has(e)||n.has(i)}function we(e,t=!1){return e=e.__v_raw,!t&&G(Qe(e),0,q),Reflect.get(e,"size",e)}function me(e,t=!1){t||Ke(e)||Je(e)||(e=Qe(e));const n=Qe(this);return _e(n).has.call(n,e)||(n.add(e),Q(n,"add",e,e)),this}function Se(e,t,n=!1){n||Ke(t)||Je(t)||(t=Qe(t));const s=Qe(this),{has:i,get:o}=_e(s);let r=i.call(s,e);r||(e=Qe(e),r=i.call(s,e));const c=o.call(s,e);return s.set(e,t),r?b(t,c)&&Q(s,"set",e,t):Q(s,"add",e,t),this}function Re(e){const t=Qe(this),{has:n,get:s}=_e(t);let i=n.call(t,e);i||(e=Qe(e),i=n.call(t,e)),s&&s.call(t,e);const o=t.delete(e);return i&&Q(t,"delete",e,void 0),o}function xe(){const e=Qe(this),t=0!==e.size,n=e.clear();return t&&Q(e,"clear",void 0,void 0),n}function $e(e,t){return function(n,s){const i=this,o=i.__v_raw,r=Qe(o),c=t?ge:e?Ye:Xe;return!e&&G(r,0,q),o.forEach(((e,t)=>n.call(s,c(e),c(t),i)))}}function Pe(e,t,n){return function(...s){const i=this.__v_raw,o=Qe(i),r=u(o),c="entries"===e||e===Symbol.iterator&&r,a="keys"===e&&r,h=i[e](...s),l=n?ge:t?Ye:Xe;return!t&&G(o,0,a?J:q),{next(){const{value:e,done:t}=h.next();return t?{value:e,done:t}:{value:c?[l(e[0]),l(e[1])]:l(e),done:t}},[Symbol.iterator](){return this}}}}function ke(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function De(){const e={get(e){return ye(this,e)},get size(){return we(this)},has:be,add:me,set:Se,delete:Re,clear:xe,forEach:$e(!1,!1)},t={get(e){return ye(this,e,!1,!0)},get size(){return we(this)},has:be,add(e){return me.call(this,e,!0)},set(e,t){return Se.call(this,e,t,!0)},delete:Re,clear:xe,forEach:$e(!1,!0)},n={get(e){return ye(this,e,!0)},get size(){return we(this,!0)},has(e){return be.call(this,e,!0)},add:ke("add"),set:ke("set"),delete:ke("delete"),clear:ke("clear"),forEach:$e(!0,!1)},s={get(e){return ye(this,e,!0,!0)},get size(){return we(this,!0)},has(e){return be.call(this,e,!0)},add:ke("add"),set:ke("set"),delete:ke("delete"),clear:ke("clear"),forEach:$e(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((i=>{e[i]=Pe(i,!1,!1),n[i]=Pe(i,!0,!1),t[i]=Pe(i,!1,!0),s[i]=Pe(i,!0,!0)})),[e,n,t,s]}const[Ee,Oe,je,Te]=De();function Ae(e,t){const n=t?e?Te:je:e?Oe:Ee;return(t,s,i)=>"__v_isReactive"===s?!e:"__v_isReadonly"===s?e:"__v_raw"===s?t:Reflect.get(c(n,s)&&s in t?n:t,s,i)}const Le={get:Ae(!1,!1)},Ie={get:Ae(!1,!0)},Me={get:Ae(!0,!1)},ze={get:Ae(!0,!0)},Ne=new WeakMap,Ce=new WeakMap,Ue=new WeakMap,Ve=new WeakMap;function We(e){return Je(e)?e:Be(e,!1,fe,Le,Ne)}function Fe(e){return Be(e,!1,pe,Ie,Ce)}function He(e){return Be(e,!0,de,Me,Ue)}function Be(e,t,n,s,i){if(!d(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const o=i.get(e);if(o)return o;const r=(c=e).__v_skip||!Object.isExtensible(c)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(g(c));var c;if(0===r)return e;const a=new Proxy(e,2===r?s:n);return i.set(e,a),a}function qe(e){return Je(e)?qe(e.__v_raw):!(!e||!e.__v_isReactive)}function Je(e){return!(!e||!e.__v_isReadonly)}function Ke(e){return!(!e||!e.__v_isShallow)}function Ge(e){return!!e&&!!e.__v_raw}function Qe(e){const t=e&&e.__v_raw;return t?Qe(t):e}const Xe=e=>d(e)?We(e):e,Ye=e=>d(e)?He(e):e;function Ze(e){return!!e&&!0===e.__v_isRef}function et(e){return tt(e,!1)}function tt(e,t){return Ze(e)?e:new nt(e,t)}class nt{constructor(e,t){this.dep=new F,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Qe(e),this._value=t?e:Xe(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,n=this.__v_isShallow||Ke(e)||Je(e);e=n?e:Qe(e),b(e,t)&&(this._rawValue=e,this._value=n?e:Xe(e),this.dep.trigger())}}function st(e){return Ze(e)?e.value:e}const it={get:(e,t,n)=>st(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const i=e[t];return Ze(i)&&!Ze(n)?(i.value=n,!0):Reflect.set(e,t,n,s)}};class ot{constructor(e){this.__v_isRef=!0,this._value=void 0;const t=this.dep=new F,{get:n,set:s}=e(t.track.bind(t),t.trigger.bind(t));this._get=n,this._set=s}get value(){return this._value=this._get()}set value(e){this._set(e)}}class rt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return e=Qe(this._object),t=this._key,null==(n=B.get(e))?void 0:n.get(t);var e,t,n}}class ct{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function at(e,t,n){return Ze(e)?e:l(e)?new ct(e):d(e)&&arguments.length>1?ut(e,t,n):et(e)}function ut(e,t,n){const s=e[t];return Ze(s)?s:new rt(e,t,n)}class ht{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new F(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=W-1,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){m!==this&&(this.flags|=16,this.dep.notify())}get value(){const e=this.dep.track();return L(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}const lt={},ft=new WeakMap;let dt;function pt(e,t,i=n){const{immediate:r,deep:c,once:u,scheduler:h,augmentJob:f,call:d}=i,p=e=>c?e:Ke(e)||!1===c||0===c?vt(e,1):vt(e);let v,g,_,y,w=!1,m=!1;if(Ze(e)?(g=()=>e.value,w=Ke(e)):qe(e)?(g=()=>p(e),w=!0):a(e)?(m=!0,w=e.some((e=>qe(e)||Ke(e))),g=()=>e.map((e=>Ze(e)?e.value:qe(e)?p(e):l(e)?d?d(e,2):e():void 0))):g=l(e)?t?d?()=>d(e,2):e:()=>{if(_){C();try{_()}finally{U()}}const t=dt;dt=v;try{return d?d(e,3,[y]):e(y)}finally{dt=t}}:s,t&&c){const e=g,t=!0===c?1/0:c;g=()=>vt(e(),t)}const S=x(),R=()=>{v.stop(),S&&o(S.effects,v)};if(u)if(t){const e=t;t=(...t)=>{e(...t),R()}}else{const e=g;g=()=>{e(),R()}}let $=m?new Array(e.length).fill(lt):lt;const k=e=>{if(1&v.flags&&(v.dirty||e))if(t){const e=v.run();if(c||w||(m?e.some(((e,t)=>b(e,$[t]))):b(e,$))){_&&_();const n=dt;dt=v;try{const n=[e,$===lt?void 0:m&&$[0]===lt?[]:$,y];d?d(t,3,n):t(...n),$=e}finally{dt=n}}}else v.run()};return f&&f(k),v=new P(g),v.scheduler=h?()=>h(k,!1):k,y=e=>function(e,t=!1,n=dt){if(n){let t=ft.get(n);t||ft.set(n,t=[]),t.push(e)}}(e,!1,v),_=v.onStop=()=>{const e=ft.get(v);if(e){if(d)d(e,4);else for(const t of e)t();ft.delete(v)}},t?r?k(!0):$=v.run():h?h(k.bind(null,!0),!0):v.run(),R.pause=v.pause.bind(v),R.resume=v.resume.bind(v),R.stop=R,R}function vt(e,t=1/0,n){if(t<=0||!d(e)||e.__v_skip)return e;if((n=n||new Set).has(e))return e;if(n.add(e),t--,Ze(e))vt(e.value,t,n);else if(a(e))for(let s=0;s<e.length;s++)vt(e[s],t,n);else if(h(e)||u(e))e.forEach((e=>{vt(e,t,n)}));else if(_(e)){for(const s in e)vt(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&vt(e[s],t,n)}return e}const{isArray:gt}=Array;function _t(e){return Object.prototype.toString.call(e).slice(8,-1)}function yt(e){return"function"==typeof e}function bt(e){if(function(e){const t=new Set(["undefined","boolean","number","string"]);return null===e||t.has(typeof e)}(e)||yt(e))return e;if(Ze(e))return bt(e.value);if(Ge(e))return bt(Qe(e));if(gt(e))return e.map((e=>bt(e)));if(function(e){return"Object"===_t(e)}(e)){const t={};return Object.keys(e).forEach((n=>{t[n]=bt(e[n])})),t}throw new TypeError(`${_t(e)} value is not supported`)}function wt(e,t,n){var s;null!==(s=n)&&"object"==typeof s&&pt(Ze(n)?n:()=>n,(()=>{e.setData({[t]:bt(n)})}),{deep:!0})}e.instance=null;const mt=t=>{e.instance=t},St=(e,t,n,...s)=>{if(t&&t[n]&&t[n].apply(e,s),!e[`$${n}`])return;const i={onLoad:"onUnload",onShow:"onHide",attached:"detached",show:"hide"}[n];e[`$${n}`].forEach((t=>{if(i){const n=e[`$${i}`]&&e[`$${i}`].find((e=>e.front===t));n&&n()}const n=t.apply(e,s);if(i&&"function"==typeof n){e[`$${i}`]&&e[`$${i}`].find((e=>e.front===t))||(n.front,e[`$${i}`]||(e[`$${i}`]=[]),e[`$${i}`].push(n))}}))},Rt=(e,t,n,...s)=>{if(t&&t[n])return t[n].apply(e,s);if(e[`$${n}`]){if(e[`$${n}`].length)throw new Error(`一个page只能配置一个${n}`);return e[`$${n}`][0].apply(e,s)}},xt=(e,t,n)=>{e&&(e[`$${t}`]||(e[`$${t}`]=[]),e[`$${t}`].push(n.bind(e)))};e.launchPromise=Promise.resolve(!0);function $t(t){e.activePinia=t}e.activePinia=void 0,e.ReactiveEffect=P,e.attached=t=>xt(e.instance,"attached",t),e.computed=function(e,t,n=!1){let s,i;return l(e)?s=e:(s=e.get,i=e.set),new ht(s,i,n)},e.createApp=t=>{if(!t)return App({});let n={};if("function"!=typeof t){const{setup:e,...s}=t;n=s,t=e}return t?App({...n,onLaunch(s){e.launchPromise=new Promise((async e=>{mt(this);const i=await t.call(this,s);void 0!==i&&Object.keys(i).forEach((e=>{this[e]=i[e]})),St(this,n,"onLaunch",s),mt(null),e(!0)}))},onShow(e){St(this,n,"onShow",e)},onHide(){St(this,n,"onHide")},onError(e){St(this,n,"onError",e)},onPageNotFound(e){St(this,n,"onPageNotFound",e)},onUnhandledRejection(e){St(this,n,"onUnhandledRejection",e)},onThemeChange(e){St(this,n,"onThemeChange",e)}}):App(n)},e.createPinia=function(){const e=R(!0),t=e.run((()=>et({}))),n={install(){$t(n)},scope:e,state:t,stores:{}};return n},e.customRef=function(e){return new ot(e)},e.deepToRaw=bt,e.deepWatch=wt,e.defineComponent=t=>{if(!t)return Component({});let n={};if("function"!=typeof t){const{setup:e,...s}=t;n=s,t=e}if(!t)return Component(n);let s=null;return n.properties&&(s=Object.keys(n.properties)),s&&s.forEach((e=>{void 0===n.observers&&(n.observers={});const t=n.observers[e];n.observers[e]=function(n){this.$props&&(this.$props[e]=n),void 0!==t&&t.call(this,n)}})),Component({...n,lifetimes:{attached(){e.launchPromise.then((()=>{mt(this),this.$scope=R();const e={};s&&s.forEach((t=>{e[t]=this.data[t]})),this.$props=Fe(e),this.$context={emit:(e,...t)=>{this.triggerEvent(e,{value:t[0]})}},this.$scope.run((()=>{const e=t.call(this,this.$props,this.$context);void 0!==e&&Object.keys(e).forEach((t=>{const n=e[t];yt(n)?this[t]=n:(this.setData({[t]:bt(n)}),wt(this,t,n))})),St(this,n,"attached")})),mt(null)}))},ready(){St(this,n,"ready")},moved(){St(this,n,"moved")},detached(){St(this,n,"detached"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((e=>{try{/^$/.test(e)&&delete this[e]}catch(e){console.error("销毁异常",e)}}))},error(e){St(this,n,"error",e)}},pageLifetimes:{show(){St(this,n,"show")},hide(){St(this,n,"hide")},resize(e){St(this,n,"resize",e)},routeDone(){St(this,n,"routeDone")}}})},e.definePage=t=>{if(!t)return Page({});let n={};if("function"!=typeof t){const{setup:e,...s}=t;n=s||{},t=e}if(!t)return Page(n);const{queries:s,...i}=n;return Page({...i,onLoad(i){e.launchPromise.then((()=>{mt(this),this.$scope=R(),this.$query=((e,t)=>{if(!t)return e;let n={};for(let s in e)if(s in t){const i=e[s],o=t[s];if(!o){n[s]=i;break}const r=o.type||o,c=e=>"formatter"in o&&void 0!==o.formatter?o.formatter(e):r===Boolean?!!e:r===Number?Number(e):r===Object?e?JSON.parse(decodeURIComponent(e)):{}:r===Array?e?JSON.parse(decodeURIComponent(e)):[]:(null===r||r===String||console.error("未知的·type·",r),e);n[s]=c(i)}else n[s]=e[s];return n})(i,s),this.$context={},this.$scope.run((()=>{const e=t.call(this,this.$query,this.$context);void 0!==e&&Object.keys(e).forEach((t=>{const n=e[t];yt(n)?this[t]=n:(this.setData({[t]:bt(n)}),wt(this,t,n))})),St(this,n,"onLoad",i)})),mt(null)}))},onShow(){St(this,n,"onShow")},onReady(){St(this,n,"onReady")},onHide(){St(this,n,"onHide")},onUnload(){St(this,n,"onUnload"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((e=>{try{/^$/.test(e)&&delete this[e]}catch(e){console.error("销毁异常",e)}}))},onRouteDone(){St(this,n,"onRouteDone")},onPullDownRefresh(){St(this,n,"onPullDownRefresh")},onReachBottom(){St(this,n,"onReachBottom")},onPageScroll(e){St(this,n,"onPageScroll",e)},onAddToFavorites(e){return Rt(this,n,"onAddToFavorites",e)},onShareAppMessage(e){return Rt(this,n,"onShareAppMessage",e)},onShareTimeline(){return Rt(this,n,"onShareTimeline")},onResize(e){St(this,n,"onResize",e)},onTabItemTap(e){St(this,n,"onTabItemTap",e)},onSaveExitState(){St(this,n,"onSaveExitState")}})},e.defineStore=function(t,n,s){return function(i){if(i&&$t(i),!(i=e.activePinia))throw new Error("no active pinia");return i.stores[t]||function(e,t,n,s){const i={},o=e.scope.run(n);Object.assign(i,o),e.stores[t]=i;const r="PINIA_"+t;s&&s.persist&&s.persist.forEach((n=>{const s=`${r}_${n}`,i=wx.getStorageSync(s),o=wx.getStorageInfoSync().keys.includes(s);e.stores[t][n]&&o&&(Ze(e.stores[t][n])?e.stores[t][n].value=i:Object.keys(i).forEach((s=>{e.stores[t][n][s]=i[s]}))),pt(Ze(e.stores[t][n])?e.stores[t][n]:()=>e.stores[t][n],(e=>{wx.setStorageSync(s,e)}),{deep:!0})}))}(i,t,n,s),i.stores[t]}},e.detached=t=>xt(e.instance,"detached",t),e.effect=function(e,t){e.effect instanceof P&&(e=e.effect.fn);const n=new P(e);t&&i(n,t);try{n.run()}catch(e){throw n.stop(),e}const s=n.run.bind(n);return s.effect=n,s},e.effectScope=R,e.error=t=>xt(e.instance,"error",t),e.getCurrentPage=()=>{const e=getCurrentPages();return e&&e[e.length-1]},e.getCurrentScope=x,e.hide=t=>xt(e.instance,"hide",t),e.isProxy=Ge,e.isReactive=qe,e.isReadonly=Je,e.isRef=Ze,e.isShallow=Ke,e.lifetimeEmit=St,e.lifetimeEmitOnce=Rt,e.lifetimeOn=xt,e.markRaw=function(e){return Object.isExtensible(e)&&((e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})})(e,"__v_skip",!0),e},e.moved=t=>xt(e.instance,"moved",t),e.onAddToFavorites=t=>xt(e.instance,"onAddToFavorites",t),e.onError=t=>xt(e.instance,"onError",t),e.onHide=t=>xt(e.instance,"onHide",t),e.onLaunch=t=>xt(e.instance,"onLaunch",t),e.onLoad=t=>xt(e.instance,"onLoad",t),e.onPageNotFound=t=>xt(e.instance,"onPageNotFound",t),e.onPageScroll=t=>xt(e.instance,"onPageScroll",t),e.onPullDownRefresh=t=>xt(e.instance,"onPullDownRefresh",t),e.onReachBottom=t=>xt(e.instance,"onReachBottom",t),e.onReady=t=>xt(e.instance,"onReady",t),e.onResize=t=>xt(e.instance,"onResize",t),e.onRouteDone=t=>xt(e.instance,"onRouteDone",t),e.onSaveExitState=t=>xt(e.instance,"onSaveExitState",t),e.onScopeDispose=function(e,t=!1){w&&w.cleanups.push(e)},e.onShareAppMessage=t=>xt(e.instance,"onShareAppMessage",t),e.onShareTimeline=t=>xt(e.instance,"onShareTimeline",t),e.onShow=t=>xt(e.instance,"onShow",t),e.onTabItemTap=t=>xt(e.instance,"onTabItemTap",t),e.onThemeChange=t=>xt(e.instance,"onThemeChange",t),e.onUnhandledRejection=t=>xt(e.instance,"onUnhandledRejection",t),e.onUnload=t=>xt(e.instance,"onUnload",t),e.proxyRefs=function(e){return qe(e)?e:new Proxy(e,it)},e.reactive=We,e.readonly=He,e.ready=t=>xt(e.instance,"ready",t),e.ref=et,e.resize=t=>xt(e.instance,"resize",t),e.routeDone=t=>xt(e.instance,"routeDone",t),e.setActivatePinia=$t,e.setInstance=mt,e.shallowReactive=Fe,e.shallowReadonly=function(e){return Be(e,!0,ve,ze,Ve)},e.shallowRef=function(e){return tt(e,!0)},e.show=t=>xt(e.instance,"show",t),e.stop=function(e){e.effect.stop()},e.storeToRefs=function(e){e=Qe(e);const t={};for(const n in e){const s=e[n];(Ze(s)||qe(s))&&(t[n]=at(e,n))}return t},e.toRaw=Qe,e.toRef=at,e.toRefs=function(e){const t=a(e)?new Array(e.length):{};for(const n in e)t[n]=ut(e,n);return t},e.toValue=function(e){return l(e)?e():st(e)},e.triggerRef=function(e){e.dep.trigger()},e.unref=st,e.useInstance=()=>e.instance,e.watch=pt}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1725540257926);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map