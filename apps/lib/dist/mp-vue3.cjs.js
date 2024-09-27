"use strict";
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */function e(e,t){const s=new Set(e.split(","));return e=>s.has(e)}const t={},s=()=>{},n=Object.assign,r=(e,t)=>{const s=e.indexOf(t);s>-1&&e.splice(s,1)},o=Object.prototype.hasOwnProperty,i=(e,t)=>o.call(e,t),c=Array.isArray,a=e=>"[object Map]"===d(e),u=e=>"[object Set]"===d(e),l=e=>"function"==typeof e,h=e=>"symbol"==typeof e,p=e=>null!==e&&"object"==typeof e,f=Object.prototype.toString,d=e=>f.call(e),v=e=>d(e).slice(8,-1),g=e=>"[object Object]"===d(e),_=e=>"string"==typeof e&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,x=(e,t)=>!Object.is(e,t);
/**
* @vue/reactivity v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let y,w;class b{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=y,!e&&y&&(this.index=(y.scopes||(y.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=y;try{return y=this,e()}finally{y=t}}}on(){y=this}off(){y=this.parent}stop(e){if(this._active){let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.scopes)for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this._active=!1}}}function m(e){return new b(e)}function S(){return y}const R=new WeakSet;class E{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.nextEffect=void 0,this.cleanup=void 0,this.scheduler=void 0,y&&y.active&&y.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,R.has(this)&&(R.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||(this.flags|=8,this.nextEffect=$,$=this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,N(this),k(this);const e=w,t=I;w=this,I=!0;try{return this.fn()}finally{j(this),w=e,I=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)L(e);this.deps=this.depsTail=void 0,N(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?R.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){T(this)&&this.run()}get dirty(){return T(this)}}let $,O=0;function P(){O++}function D(){if(--O>0)return;let e;for(;$;){let t=$;for($=void 0;t;){const s=t.nextEffect;if(t.nextEffect=void 0,t.flags&=-9,1&t.flags)try{t.trigger()}catch(t){e||(e=t)}t=s}}if(e)throw e}function k(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function j(e){let t,s=e.depsTail;for(let e=s;e;e=e.prevDep)-1===e.version?(e===s&&(s=e.prevDep),L(e),A(e)):t=e,e.dep.activeLink=e.prevActiveLink,e.prevActiveLink=void 0;e.deps=t,e.depsTail=s}function T(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&!1===U(t.dep.computed)||t.dep.version!==t.version)return!0;return!!e._dirty}function U(e){if(2&e.flags)return!1;if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===W)return;e.globalVersion=W;const t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&!T(e))return void(e.flags&=-3);const s=w,n=I;w=e,I=!0;try{k(e);const s=e.fn();(0===t.version||x(s,e._value))&&(e._value=s,t.version++)}catch(e){throw t.version++,e}finally{w=s,I=n,j(e),e.flags&=-3}}function L(e){const{dep:t,prevSub:s,nextSub:n}=e;if(s&&(s.nextSub=n,e.prevSub=void 0),n&&(n.prevSub=s,e.nextSub=void 0),t.subs===e&&(t.subs=s),!t.subs&&t.computed){t.computed.flags&=-5;for(let e=t.computed.deps;e;e=e.nextDep)L(e)}}function A(e){const{prevDep:t,nextDep:s}=e;t&&(t.nextDep=s,e.prevDep=void 0),s&&(s.prevDep=t,e.nextDep=void 0)}let I=!0;const q=[];function C(){q.push(I),I=!1}function z(){const e=q.pop();I=void 0===e||e}function N(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=w;w=void 0;try{t()}finally{w=e}}}let W=0;class M{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0}track(e){if(!w||!I)return;let t=this.activeLink;if(void 0===t||t.sub!==w)t=this.activeLink={dep:this,sub:w,version:this.version,nextDep:void 0,prevDep:void 0,nextSub:void 0,prevSub:void 0,prevActiveLink:void 0},w.deps?(t.prevDep=w.depsTail,w.depsTail.nextDep=t,w.depsTail=t):w.deps=w.depsTail=t,4&w.flags&&Q(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=w.depsTail,t.nextDep=void 0,w.depsTail.nextDep=t,w.depsTail=t,w.deps===t&&(w.deps=e)}return t}trigger(e){this.version++,W++,this.notify(e)}notify(e){P();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()}finally{D()}}}function Q(e){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Q(e)}const s=e.dep.subs;s!==e&&(e.prevSub=s,s&&(s.nextSub=e)),e.dep.subs=e}const V=new WeakMap,B=Symbol(""),F=Symbol(""),H=Symbol("");function J(e,t,s){if(I&&w){let t=V.get(e);t||V.set(e,t=new Map);let n=t.get(s);n||t.set(s,n=new M),n.track()}}function K(e,t,s,n,r,o){const i=V.get(e);if(!i)return void W++;let u=[];if("clear"===t)u=[...i.values()];else{const r=c(e),o=r&&_(s);if(r&&"length"===s){const e=Number(n);i.forEach(((t,s)=>{("length"===s||s===H||!h(s)&&s>=e)&&u.push(t)}))}else{const n=e=>e&&u.push(e);switch(void 0!==s&&n(i.get(s)),o&&n(i.get(H)),t){case"add":r?o&&n(i.get("length")):(n(i.get(B)),a(e)&&n(i.get(F)));break;case"delete":r||(n(i.get(B)),a(e)&&n(i.get(F)));break;case"set":a(e)&&n(i.get(B))}}}P();for(const e of u)e.trigger();D()}function G(e){const t=Ke(e);return t===e?t:(J(t,0,H),He(e)?t:t.map(Ge))}function X(e){return J(e=Ke(e),0,H),e}const Y={__proto__:null,[Symbol.iterator](){return Z(this,Symbol.iterator,Ge)},concat(...e){return G(this).concat(...e.map((e=>c(e)?G(e):e)))},entries(){return Z(this,"entries",(e=>(e[1]=Ge(e[1]),e)))},every(e,t){return te(this,"every",e,t,void 0,arguments)},filter(e,t){return te(this,"filter",e,t,(e=>e.map(Ge)),arguments)},find(e,t){return te(this,"find",e,t,Ge,arguments)},findIndex(e,t){return te(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return te(this,"findLast",e,t,Ge,arguments)},findLastIndex(e,t){return te(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return te(this,"forEach",e,t,void 0,arguments)},includes(...e){return ne(this,"includes",e)},indexOf(...e){return ne(this,"indexOf",e)},join(e){return G(this).join(e)},lastIndexOf(...e){return ne(this,"lastIndexOf",e)},map(e,t){return te(this,"map",e,t,void 0,arguments)},pop(){return re(this,"pop")},push(...e){return re(this,"push",e)},reduce(e,...t){return se(this,"reduce",e,t)},reduceRight(e,...t){return se(this,"reduceRight",e,t)},shift(){return re(this,"shift")},some(e,t){return te(this,"some",e,t,void 0,arguments)},splice(...e){return re(this,"splice",e)},toReversed(){return G(this).toReversed()},toSorted(e){return G(this).toSorted(e)},toSpliced(...e){return G(this).toSpliced(...e)},unshift(...e){return re(this,"unshift",e)},values(){return Z(this,"values",Ge)}};function Z(e,t,s){const n=X(e),r=n[t]();return n===e||He(e)||(r._next=r.next,r.next=()=>{const e=r._next();return e.value&&(e.value=s(e.value)),e}),r}const ee=Array.prototype;function te(e,t,s,n,r,o){const i=X(e),c=i!==e&&!He(e),a=i[t];if(a!==ee[t]){const t=a.apply(e,o);return c?Ge(t):t}let u=s;i!==e&&(c?u=function(t,n){return s.call(this,Ge(t),n,e)}:s.length>2&&(u=function(t,n){return s.call(this,t,n,e)}));const l=a.call(i,u,n);return c&&r?r(l):l}function se(e,t,s,n){const r=X(e);let o=s;return r!==e&&(He(e)?s.length>3&&(o=function(t,n,r){return s.call(this,t,n,r,e)}):o=function(t,n,r){return s.call(this,t,Ge(n),r,e)}),r[t](o,...n)}function ne(e,t,s){const n=Ke(e);J(n,0,H);const r=n[t](...s);return-1!==r&&!1!==r||!Je(s[0])?r:(s[0]=Ke(s[0]),n[t](...s))}function re(e,t,s=[]){C(),P();const n=Ke(e)[t].apply(e,s);return D(),z(),n}const oe=e("__proto__,__v_isRef,__isVue"),ie=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(h));function ce(e){h(e)||(e=String(e));const t=Ke(this);return J(t,0,e),t.hasOwnProperty(e)}class ae{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){const n=this._isReadonly,r=this._isShallow;if("__v_isReactive"===t)return!n;if("__v_isReadonly"===t)return n;if("__v_isShallow"===t)return r;if("__v_raw"===t)return s===(n?r?Ne:ze:r?Ce:qe).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=c(e);if(!n){let e;if(o&&(e=Y[t]))return e;if("hasOwnProperty"===t)return ce}const i=Reflect.get(e,t,Ye(e)?e:s);return(h(t)?ie.has(t):oe(t))?i:(n||J(e,0,t),r?i:Ye(i)?o&&_(t)?i:i.value:p(i)?n?Qe(i):We(i):i)}}class ue extends ae{constructor(e=!1){super(!1,e)}set(e,t,s,n){let r=e[t];if(!this._isShallow){const t=Fe(r);if(He(s)||Fe(s)||(r=Ke(r),s=Ke(s)),!c(e)&&Ye(r)&&!Ye(s))return!t&&(r.value=s,!0)}const o=c(e)&&_(t)?Number(t)<e.length:i(e,t),a=Reflect.set(e,t,s,Ye(e)?e:n);return e===Ke(n)&&(o?x(s,r)&&K(e,"set",t,s):K(e,"add",t,s)),a}deleteProperty(e,t){const s=i(e,t);e[t];const n=Reflect.deleteProperty(e,t);return n&&s&&K(e,"delete",t,void 0),n}has(e,t){const s=Reflect.has(e,t);return h(t)&&ie.has(t)||J(e,0,t),s}ownKeys(e){return J(e,0,c(e)?"length":B),Reflect.ownKeys(e)}}class le extends ae{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const he=new ue,pe=new le,fe=new ue(!0),de=new le(!0),ve=e=>e,ge=e=>Reflect.getPrototypeOf(e);function _e(e,t,s=!1,n=!1){const r=Ke(e=e.__v_raw),o=Ke(t);s||(x(t,o)&&J(r,0,t),J(r,0,o));const{has:i}=ge(r),c=n?ve:s?Xe:Ge;return i.call(r,t)?c(e.get(t)):i.call(r,o)?c(e.get(o)):void(e!==r&&e.get(t))}function xe(e,t=!1){const s=this.__v_raw,n=Ke(s),r=Ke(e);return t||(x(e,r)&&J(n,0,e),J(n,0,r)),e===r?s.has(e):s.has(e)||s.has(r)}function ye(e,t=!1){return e=e.__v_raw,!t&&J(Ke(e),0,B),Reflect.get(e,"size",e)}function we(e,t=!1){t||He(e)||Fe(e)||(e=Ke(e));const s=Ke(this);return ge(s).has.call(s,e)||(s.add(e),K(s,"add",e,e)),this}function be(e,t,s=!1){s||He(t)||Fe(t)||(t=Ke(t));const n=Ke(this),{has:r,get:o}=ge(n);let i=r.call(n,e);i||(e=Ke(e),i=r.call(n,e));const c=o.call(n,e);return n.set(e,t),i?x(t,c)&&K(n,"set",e,t):K(n,"add",e,t),this}function me(e){const t=Ke(this),{has:s,get:n}=ge(t);let r=s.call(t,e);r||(e=Ke(e),r=s.call(t,e)),n&&n.call(t,e);const o=t.delete(e);return r&&K(t,"delete",e,void 0),o}function Se(){const e=Ke(this),t=0!==e.size,s=e.clear();return t&&K(e,"clear",void 0,void 0),s}function Re(e,t){return function(s,n){const r=this,o=r.__v_raw,i=Ke(o),c=t?ve:e?Xe:Ge;return!e&&J(i,0,B),o.forEach(((e,t)=>s.call(n,c(e),c(t),r)))}}function Ee(e,t,s){return function(...n){const r=this.__v_raw,o=Ke(r),i=a(o),c="entries"===e||e===Symbol.iterator&&i,u="keys"===e&&i,l=r[e](...n),h=s?ve:t?Xe:Ge;return!t&&J(o,0,u?F:B),{next(){const{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function $e(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function Oe(){const e={get(e){return _e(this,e)},get size(){return ye(this)},has:xe,add:we,set:be,delete:me,clear:Se,forEach:Re(!1,!1)},t={get(e){return _e(this,e,!1,!0)},get size(){return ye(this)},has:xe,add(e){return we.call(this,e,!0)},set(e,t){return be.call(this,e,t,!0)},delete:me,clear:Se,forEach:Re(!1,!0)},s={get(e){return _e(this,e,!0)},get size(){return ye(this,!0)},has(e){return xe.call(this,e,!0)},add:$e("add"),set:$e("set"),delete:$e("delete"),clear:$e("clear"),forEach:Re(!0,!1)},n={get(e){return _e(this,e,!0,!0)},get size(){return ye(this,!0)},has(e){return xe.call(this,e,!0)},add:$e("add"),set:$e("set"),delete:$e("delete"),clear:$e("clear"),forEach:Re(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=Ee(r,!1,!1),s[r]=Ee(r,!0,!1),t[r]=Ee(r,!1,!0),n[r]=Ee(r,!0,!0)})),[e,s,t,n]}const[Pe,De,ke,je]=Oe();function Te(e,t){const s=t?e?je:ke:e?De:Pe;return(t,n,r)=>"__v_isReactive"===n?!e:"__v_isReadonly"===n?e:"__v_raw"===n?t:Reflect.get(i(s,n)&&n in t?s:t,n,r)}const Ue={get:Te(!1,!1)},Le={get:Te(!1,!0)},Ae={get:Te(!0,!1)},Ie={get:Te(!0,!0)},qe=new WeakMap,Ce=new WeakMap,ze=new WeakMap,Ne=new WeakMap;function We(e){return Fe(e)?e:Ve(e,!1,he,Ue,qe)}function Me(e){return Ve(e,!1,fe,Le,Ce)}function Qe(e){return Ve(e,!0,pe,Ae,ze)}function Ve(e,t,s,n,r){if(!p(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const o=r.get(e);if(o)return o;const i=(c=e).__v_skip||!Object.isExtensible(c)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(v(c));var c;if(0===i)return e;const a=new Proxy(e,2===i?n:s);return r.set(e,a),a}function Be(e){return Fe(e)?Be(e.__v_raw):!(!e||!e.__v_isReactive)}function Fe(e){return!(!e||!e.__v_isReadonly)}function He(e){return!(!e||!e.__v_isShallow)}function Je(e){return!!e&&!!e.__v_raw}function Ke(e){const t=e&&e.__v_raw;return t?Ke(t):e}const Ge=e=>p(e)?We(e):e,Xe=e=>p(e)?Qe(e):e;function Ye(e){return!!e&&!0===e.__v_isRef}function Ze(e){return et(e,!1)}function et(e,t){return Ye(e)?e:new tt(e,t)}class tt{constructor(e,t){this.dep=new M,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Ke(e),this._value=t?e:Ge(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||He(e)||Fe(e);e=s?e:Ke(e),x(e,t)&&(this._rawValue=e,this._value=s?e:Ge(e),this.dep.trigger())}}function st(e){return Ye(e)?e.value:e}const nt={get:(e,t,s)=>st(Reflect.get(e,t,s)),set:(e,t,s,n)=>{const r=e[t];return Ye(r)&&!Ye(s)?(r.value=s,!0):Reflect.set(e,t,s,n)}};class rt{constructor(e){this.__v_isRef=!0,this._value=void 0;const t=this.dep=new M,{get:s,set:n}=e(t.track.bind(t),t.trigger.bind(t));this._get=s,this._set=n}get value(){return this._value=this._get()}set value(e){this._set(e)}}class ot{constructor(e,t,s){this._object=e,this._key=t,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return e=Ke(this._object),t=this._key,null==(s=V.get(e))?void 0:s.get(t);var e,t,s}}class it{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function ct(e,t,s){return Ye(e)?e:l(e)?new it(e):p(e)&&arguments.length>1?at(e,t,s):Ze(e)}function at(e,t,s){const n=e[t];return Ye(n)?n:new ot(e,t,s)}class ut{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new M(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=W-1,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){w!==this&&(this.flags|=16,this.dep.notify())}get value(){const e=this.dep.track();return U(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}const lt={},ht=new WeakMap;let pt;function ft(e,n,o=t){const{immediate:i,deep:a,once:u,scheduler:h,augmentJob:p,call:f}=o,d=e=>a?e:He(e)||!1===a||0===a?dt(e,1):dt(e);let v,g,_,y,w=!1,b=!1;if(Ye(e)?(g=()=>e.value,w=He(e)):Be(e)?(g=()=>d(e),w=!0):c(e)?(b=!0,w=e.some((e=>Be(e)||He(e))),g=()=>e.map((e=>Ye(e)?e.value:Be(e)?d(e):l(e)?f?f(e,2):e():void 0))):g=l(e)?n?f?()=>f(e,2):e:()=>{if(_){C();try{_()}finally{z()}}const t=pt;pt=v;try{return f?f(e,3,[y]):e(y)}finally{pt=t}}:s,n&&a){const e=g,t=!0===a?1/0:a;g=()=>dt(e(),t)}const m=S(),R=()=>{v.stop(),m&&r(m.effects,v)};if(u)if(n){const e=n;n=(...t)=>{e(...t),R()}}else{const e=g;g=()=>{e(),R()}}let $=b?new Array(e.length).fill(lt):lt;const O=e=>{if(1&v.flags&&(v.dirty||e))if(n){const e=v.run();if(a||w||(b?e.some(((e,t)=>x(e,$[t]))):x(e,$))){_&&_();const t=pt;pt=v;try{const t=[e,$===lt?void 0:b&&$[0]===lt?[]:$,y];f?f(n,3,t):n(...t),$=e}finally{pt=t}}}else v.run()};return p&&p(O),v=new E(g),v.scheduler=h?()=>h(O,!1):O,y=e=>function(e,t=!1,s=pt){if(s){let t=ht.get(s);t||ht.set(s,t=[]),t.push(e)}}(e,!1,v),_=v.onStop=()=>{const e=ht.get(v);if(e){if(f)f(e,4);else for(const t of e)t();ht.delete(v)}},n?i?O(!0):$=v.run():h?h(O.bind(null,!0),!0):v.run(),R.pause=v.pause.bind(v),R.resume=v.resume.bind(v),R.stop=R,R}function dt(e,t=1/0,s){if(t<=0||!p(e)||e.__v_skip)return e;if((s=s||new Set).has(e))return e;if(s.add(e),t--,Ye(e))dt(e.value,t,s);else if(c(e))for(let n=0;n<e.length;n++)dt(e[n],t,s);else if(u(e)||a(e))e.forEach((e=>{dt(e,t,s)}));else if(g(e)){for(const n in e)dt(e[n],t,s);for(const n of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,n)&&dt(e[n],t,s)}return e}const vt=/* istanbul ignore next -- @preserve */{},gt=()=>{},{isArray:_t}=Array,xt=Object.assign;
/* istanbul ignore next -- @preserve */function yt(e){return Object.prototype.toString.call(e).slice(8,-1)}function wt(e){return"function"==typeof e}var bt,mt=!1;!function(e){e[e.QUEUED=1]="QUEUED",e[e.ALLOW_RECURSE=4]="ALLOW_RECURSE"}(bt||(bt={}));let St=!1,Rt=!1;const Et=[];let $t=0;const Ot=[];let Pt=null,Dt=0;const kt=Promise.resolve();function jt(e){e.flags&bt.QUEUED||(Et.push(e),e.flags|=bt.QUEUED,St||Rt||(Rt=!0,kt.then(Ut)))}function Tt(){if(Ot.length>0){for(Pt=[...new Set(Ot)],Ot.length=0,Dt=0;Dt<Pt.length;Dt++){const e=Pt[Dt];e.flags&bt.ALLOW_RECURSE&&(e.flags&=~bt.QUEUED),e(),e.flags&=~bt.QUEUED}Pt=null,Dt=0}}function Ut(e){Rt=!1,St=!0;const t=/* istanbul ignore next -- @preserve  */gt;try{for($t=0;$t<Et.length;$t++){const e=Et[$t];
/* istanbul ignore if -- @preserve  */mt&&t(e),e.flags&bt.ALLOW_RECURSE&&(e.flags&=~bt.QUEUED),e(),e.flags&bt.ALLOW_RECURSE||(e.flags&=~bt.QUEUED)}}finally{for(;$t<Et.length;$t++){Et[$t].flags&=~bt.QUEUED}$t=0,Et.length=0,St=!1}}function Lt(e,t,s=vt){const{immediate:n,deep:r,flush:o,once:i}=s,c=xt({},s);"post"===o?c.scheduler=e=>{!function(e){e.flags&bt.QUEUED||(Ot.push(e),e.flags|=bt.QUEUED)}(e)}:"sync"!==o&&(c.scheduler=(e,t)=>{t?e():jt(e)}),c.augmentJob=e=>{t&&(e.flags|=bt.ALLOW_RECURSE)};return ft(e,t,c)}function At(e){if(function(e){const t=new Set(["undefined","boolean","number","string"]);return null===e||t.has(typeof e)}(e)||wt(e))return e;if(Ye(e))return At(e.value);if(Je(e))return At(Ke(e));if(_t(e))return e.map((e=>At(e)));if(function(e){return"Object"===yt(e)}(e)){const t={};return Object.keys(e).forEach((s=>{t[s]=At(e[s])})),t}throw new TypeError(`${yt(e)} value is not supported`)}function It(e,t){var s;null!==(s=t)&&"object"==typeof s&&ft(Ye(t)?t:()=>t,(()=>{this.setData({[e]:At(t)},Tt)}),{deep:!0})}exports._instance=null;const qt=e=>{exports._instance=e},Ct=(e,t,s,...n)=>{if(t&&t[s]&&t[s].apply(e,n),!e[`$${s}`])return;const r={onLoad:"onUnload",onShow:"onHide",attached:"detached",show:"hide"}[s];e[`$${s}`].forEach((t=>{if(r){const s=e[`$${r}`]&&e[`$${r}`].find((e=>e.front===t));s&&s()}const s=t.apply(e,n);if(r&&"function"==typeof s){e[`$${r}`]&&e[`$${r}`].find((e=>e.front===t))||(s.front,e[`$${r}`]||(e[`$${r}`]=[]),e[`$${r}`].push(s))}}))},zt=(e,t,s,...n)=>{if(t&&t[s])return t[s].apply(e,n);if(e[`$${s}`]){if(e[`$${s}`].length)throw new Error(`一个page只能配置一个${s}`);return e[`$${s}`][0].apply(e,n)}},Nt=(e,t,s)=>{e&&(e[`$${t}`]||(e[`$${t}`]=[]),e[`$${t}`].push(s.bind(e)))};exports.launchPromise=Promise.resolve(!0);const Wt=e=>e?Object.keys(e).map((t=>{let s=e[t];return"object"==typeof e[t]&&(s=encodeURIComponent(JSON.stringify(e[t]))),`${t}=${s}`})).join("&"):"";exports._queries={};const Mt=e=>{exports._queries=e},Qt=(e,t)=>{if(!t)return e;let s={};for(let n in e)if(n in t){const r=e[n],o=t[n];if(!o){s[n]=r;break}const i=o.type||o,c=e=>"formatter"in o&&void 0!==o.formatter?o.formatter(e):i===Boolean?!!e:i===Number?Number(e):i===Object?e?JSON.parse(decodeURIComponent(e)):{}:i===Array?e?JSON.parse(decodeURIComponent(e)):[]:(null===i||i===String||console.error("未知的·type·",i),e);s[n]=c(r)}else s[n]=e[n];return s};function Vt(e){exports.activePinia=e}exports.activePinia=void 0;const Bt=new class{constructor(){this.defaultOptions={header:{"Content-Type":"application/json"}},this.baseUrl="/api"}setBaseUrl(e){this.baseUrl=e}setRequestInterceptor(e){this.requestInterceptor=e}setResponseInterceptor(e){this.responseInterceptor=e}async request(e){const t=/^http/.test(e.url)?e.url:this.baseUrl.endsWith("/")||e.url.startsWith("/")?`${this.baseUrl}${e.url}`:`${this.baseUrl}/${e.url}`;let s={...this.defaultOptions,...e,url:t};return this.requestInterceptor&&(s=await this.requestInterceptor(s)),new Promise(((e,t)=>{const{success:n,fail:r,complete:o,...i}=s;wx.request({...i,success:async s=>{try{if(this.responseInterceptor&&(s=await this.responseInterceptor(s)),s.statusCode>=200&&s.statusCode<300)"function"==typeof n&&n(s),e(s);else{const e=new Error(`请求失败，状态码：${s.statusCode}`);"function"==typeof r&&r(e),t(e)}}catch(e){"function"==typeof r&&r(e),t(e)}},fail:e=>{"function"==typeof r&&r(e),t(e)},complete:e=>{"function"==typeof o&&o(e)}})}))}serializeParams(e){return Object.keys(e).map((t=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`)).join("&")}get(e,t,s){let n=e;if(t&&Object.keys(t).length>0){const s=this.serializeParams(t);n+=e.includes("?")?`&${s}`:`?${s}`}return this.request({...s,method:"GET",url:n})}post(e,t,s){return this.request({...s,method:"POST",url:e,data:t})}options(e,t,s){let n=e;if(t&&Object.keys(t).length>0){const s=this.serializeParams(t);n+=e.includes("?")?`&${s}`:`?${s}`}return this.request({...s,method:"OPTIONS",url:n})}head(e,t,s){let n=e;if(t&&Object.keys(t).length>0){const s=this.serializeParams(t);n+=e.includes("?")?`&${s}`:`?${s}`}return this.request({...s,method:"HEAD",url:n})}put(e,t,s){return this.request({...s,method:"PUT",url:e,data:t})}delete(e,t,s){return this.request({...s,method:"DELETE",url:e,data:t})}trace(e,t,s){let n=e;if(t&&Object.keys(t).length>0){const s=this.serializeParams(t);n+=e.includes("?")?`&${s}`:`?${s}`}return this.request({...s,method:"TRACE",url:n})}connect(e,t,s){return this.request({...s,method:"CONNECT",url:e,data:t})}};exports.ReactiveEffect=E,exports.attached=e=>Nt(exports._instance,"attached",e),exports.computed=function(e,t,s=!1){let n,r;return l(e)?n=e:(n=e.get,r=e.set),new ut(n,r,s)},exports.createApp=e=>{if(!e)return App({});let t={};if("function"!=typeof e){const{setup:s,...n}=e;t=n,e=s}return e?App({...t,onLaunch(s){exports.launchPromise=new Promise((async n=>{qt(this);const r=await e.call(this,s);void 0!==r&&Object.keys(r).forEach((e=>{this[e]=r[e]})),Ct(this,t,"onLaunch",s),qt(null),n(!0)}))},onShow(e){Ct(this,t,"onShow",e)},onHide(){Ct(this,t,"onHide")},onError(e){Ct(this,t,"onError",e)},onPageNotFound(e){Ct(this,t,"onPageNotFound",e)},onUnhandledRejection(e){Ct(this,t,"onUnhandledRejection",e)},onThemeChange(e){Ct(this,t,"onThemeChange",e)}}):App(t)},exports.createPinia=function(){const e=m(!0),t=e.run((()=>Ze({}))),s={install(){Vt(s)},scope:e,state:t,stores:{}};return s},exports.createQuery=Qt,exports.customRef=function(e){return new rt(e)},exports.deepToRaw=At,exports.deepWatch=It,exports.defineComponent=e=>{if(!e)return Component({});let t={};if("function"!=typeof e){const{setup:s,...n}=e;t=n,e=s}if(!e)return Component(t);let s=null;return t.properties&&(s=Object.keys(t.properties)),s&&s.forEach((e=>{void 0===t.observers&&(t.observers={});const s=t.observers[e];t.observers[e]=function(t){this.$props&&(this.$props[e]=t),void 0!==s&&s.call(this,t)}})),Component({...t,lifetimes:{attached(){exports.launchPromise.then((()=>{qt(this),this.$scope=m();const n={};s&&s.forEach((e=>{n[e]=this.data[e]})),this.$props=Me(n),this.$context={emit:(e,...t)=>{this.triggerEvent(e,{value:t[0]})}},this.$scope.run((()=>{const s=e.call(this,this.$props,this.$context);if(void 0!==s){let e;Object.keys(s).forEach((t=>{const n=s[t];wt(n)?this[t]=n:(e=e||{},e[t]=At(n),It.call(this,t,n))})),void 0!==e&&this.setData(e,Tt)}Ct(this,t,"attached")})),qt(null)}))},ready(){Ct(this,t,"ready")},moved(){Ct(this,t,"moved")},detached(){Ct(this,t,"detached"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((e=>{try{/^$/.test(e)&&delete this[e]}catch(e){console.error("销毁异常",e)}}))},error(e){Ct(this,t,"error",e)}},pageLifetimes:{show(){Ct(this,t,"show")},hide(){Ct(this,t,"hide")},resize(e){Ct(this,t,"resize",e)},routeDone(){Ct(this,t,"routeDone")}}})},exports.definePage=e=>{if(!e)return Page({});let t={};if("function"!=typeof e){const{setup:s,...n}=e;t=n||{},e=s}if(!e)return Page(t);const{queries:s,...n}=t;return Page({...n,onLoad(n){exports.launchPromise.then((()=>{qt(this),Mt(s),this.$scope=m(),this.$query=Qt(n,s),this.$context={},this.$scope.run((()=>{const s=e.call(this,this.$query,this.$context);if(void 0!==s){let e;Object.keys(s).forEach((t=>{const n=s[t];wt(n)?this[t]=n:(e=e||{},e[t]=At(n),It.call(this,t,n))})),void 0!==e&&this.setData(e,Tt)}Ct(this,t,"onLoad",n)})),Mt({}),qt(null)}))},onShow(){Ct(this,t,"onShow")},onReady(){Ct(this,t,"onReady")},onHide(){Ct(this,t,"onHide")},onUnload(){Ct(this,t,"onUnload"),this.$scope&&this.$scope.stop(),Object.keys(this).forEach((e=>{try{/^$/.test(e)&&delete this[e]}catch(e){console.error("销毁异常",e)}}))},onRouteDone(){Ct(this,t,"onRouteDone")},onPullDownRefresh(){Ct(this,t,"onPullDownRefresh")},onReachBottom(){Ct(this,t,"onReachBottom")},onPageScroll(e){Ct(this,t,"onPageScroll",e)},onAddToFavorites(e){return zt(this,t,"onAddToFavorites",e)},onShareAppMessage(e){return zt(this,t,"onShareAppMessage",e)},onShareTimeline(){return zt(this,t,"onShareTimeline")},onResize(e){Ct(this,t,"onResize",e)},onTabItemTap(e){Ct(this,t,"onTabItemTap",e)},onSaveExitState(){Ct(this,t,"onSaveExitState")}})},exports.defineStore=function(e,t,s){return function(n){if(n&&Vt(n),!(n=exports.activePinia))throw new Error("no active pinia");return n.stores[e]||function(e,t,s,n){const r={},o=e.scope.run(s);Object.assign(r,o),e.stores[t]=r;const i="PINIA_"+t;n&&n.persist&&n.persist.forEach((s=>{const n=`${i}_${s}`,r=wx.getStorageSync(n),o=wx.getStorageInfoSync().keys.includes(n);e.stores[t][s]&&o&&(Ye(e.stores[t][s])?e.stores[t][s].value=r:Object.keys(r).forEach((n=>{e.stores[t][s][n]=r[n]}))),ft(Ye(e.stores[t][s])?e.stores[t][s]:()=>e.stores[t][s],(e=>{wx.setStorageSync(n,e)}),{deep:!0})}))}(n,e,t,s),n.stores[e]}},exports.detached=e=>Nt(exports._instance,"detached",e),exports.effect=function(e,t){e.effect instanceof E&&(e=e.effect.fn);const s=new E(e);t&&n(s,t);try{s.run()}catch(e){throw s.stop(),e}const r=s.run.bind(s);return r.effect=s,r},exports.effectScope=m,exports.error=e=>Nt(exports._instance,"error",e),exports.getCurrentPage=()=>{const e=getCurrentPages();return e&&e[e.length-1]},exports.getCurrentScope=S,exports.hide=e=>Nt(exports._instance,"hide",e),exports.isProxy=Je,exports.isReactive=Be,exports.isReadonly=Fe,exports.isRef=Ye,exports.isShallow=He,exports.lifetimeEmit=Ct,exports.lifetimeEmitOnce=zt,exports.lifetimeOn=Nt,exports.markRaw=function(e){return Object.isExtensible(e)&&((e,t,s,n=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:n,value:s})})(e,"__v_skip",!0),e},exports.moved=e=>Nt(exports._instance,"moved",e),exports.onAddToFavorites=e=>Nt(exports._instance,"onAddToFavorites",e),exports.onError=e=>Nt(exports._instance,"onError",e),exports.onHide=e=>Nt(exports._instance,"onHide",e),exports.onLaunch=e=>Nt(exports._instance,"onLaunch",e),exports.onLoad=e=>Nt(exports._instance,"onLoad",e),exports.onPageNotFound=e=>Nt(exports._instance,"onPageNotFound",e),exports.onPageScroll=e=>Nt(exports._instance,"onPageScroll",e),exports.onPullDownRefresh=e=>Nt(exports._instance,"onPullDownRefresh",e),exports.onReachBottom=e=>Nt(exports._instance,"onReachBottom",e),exports.onReady=e=>Nt(exports._instance,"onReady",e),exports.onResize=e=>Nt(exports._instance,"onResize",e),exports.onRouteDone=e=>Nt(exports._instance,"onRouteDone",e),exports.onSaveExitState=e=>Nt(exports._instance,"onSaveExitState",e),exports.onScopeDispose=function(e,t=!1){y&&y.cleanups.push(e)},exports.onShareAppMessage=e=>Nt(exports._instance,"onShareAppMessage",e),exports.onShareTimeline=e=>Nt(exports._instance,"onShareTimeline",e),exports.onShow=e=>Nt(exports._instance,"onShow",e),exports.onTabItemTap=e=>Nt(exports._instance,"onTabItemTap",e),exports.onThemeChange=e=>Nt(exports._instance,"onThemeChange",e),exports.onUnhandledRejection=e=>Nt(exports._instance,"onUnhandledRejection",e),exports.onUnload=e=>Nt(exports._instance,"onUnload",e),exports.proxyRefs=function(e){return Be(e)?e:new Proxy(e,nt)},exports.reactive=We,exports.readonly=Qe,exports.ready=e=>Nt(exports._instance,"ready",e),exports.ref=Ze,exports.request=Bt,exports.resize=e=>Nt(exports._instance,"resize",e),exports.routeDone=e=>Nt(exports._instance,"routeDone",e),exports.setActivatePinia=Vt,exports.setInstance=qt,exports.setQueries=Mt,exports.shallowReactive=Me,exports.shallowReadonly=function(e){return Ve(e,!0,de,Ie,Ne)},exports.shallowRef=function(e){return et(e,!0)},exports.show=e=>Nt(exports._instance,"show",e),exports.stop=function(e){e.effect.stop()},exports.storeToRefs=function(e){e=Ke(e);const t={};for(const s in e){const n=e[s];(Ye(n)||Be(n))&&(t[s]=ct(e,s))}return t},exports.toRaw=Ke,exports.toRef=ct,exports.toRefs=function(e){const t=c(e)?new Array(e.length):{};for(const s in e)t[s]=at(e,s);return t},exports.toValue=function(e){return l(e)?e():st(e)},exports.triggerRef=function(e){e.dep.trigger()},exports.unref=st,exports.useInstance=()=>exports._instance,exports.useRoute=()=>{const e=getCurrentPages(),t=e[e.length-1];return{path:t.route,query:Qt(t.options,exports._queries)}},exports.useRouter=()=>({push:e=>{if("string"==typeof e)return wx.navigateTo({url:e});let t;return t="path"in e?e.query?`${e.path}?${Wt(e.query)}`:e.path:e.url,wx.navigateTo({url:t,...e})},replace:e=>{if("string"==typeof e)return wx.redirectTo({url:e});let t;return t="path"in e?e.query?`${e.path}?${Wt(e.query)}`:e.path:e.url,wx.redirectTo({url:t,...e})},go:e=>{if(!(e>0))return wx.navigateBack({delta:Math.abs(e)});console.warn("微信小程序不支持前进历史记录")},back:e=>wx.navigateBack(e),switchTab:e=>{if("string"==typeof e)return wx.switchTab({url:e});let t;return t="path"in e?e.query?`${e.path}?${Wt(e.query)}`:e.path:e.url,wx.switchTab({url:t,...e})},reLaunch:e=>{if("string"==typeof e)return wx.reLaunch({url:e});let t;return t="path"in e?e.query?`${e.path}?${Wt(e.query)}`:e.path:e.url,wx.reLaunch({url:t,...e})}}),exports.watch=function(e,t,s){return Lt(e,t,s)},exports.watchEffect=function(e,t){return Lt(e,null,t)},exports.watchPostEffect=function(e,t){return Lt(e,null,/* istanbul ignore next -- @preserve */{flush:"post"})},exports.watchSyncEffect=function(e,t){return Lt(e,null,/* istanbul ignore next -- @preserve */{flush:"sync"})};
