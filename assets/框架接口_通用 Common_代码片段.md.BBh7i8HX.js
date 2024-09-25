import{_ as s,c as n,o as a,a4 as o}from"./chunks/framework.DsvKXnjw.js";const i=JSON.parse('{"title":"代码片段","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/通用 Common/代码片段.md","filePath":"框架接口/通用 Common/代码片段.md"}'),p={name:"框架接口/通用 Common/代码片段.md"},l=o(`<h1 id="代码片段" tabindex="-1">代码片段 <a class="header-anchor" href="#代码片段" aria-label="Permalink to &quot;代码片段&quot;">​</a></h1><ul><li>写小程序习惯使用<code>vscode</code>来写，<code>微信开发者工具</code>只是预览，提供几个片段，方便快速开发</li><li><code>sfa</code> 快速创建 <code>createApp</code></li><li><code>sfp</code> 快速创建 <code>definePage</code></li><li><code>sfc</code> 快速创建 <code>defineComponent</code></li><li><code>sfs</code> 快速创建 <code>defineStore</code></li></ul><p>以下可以保存<code>mp.code-snippets</code></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#6A737D;">  // 用户代码片段生成网址</span></span>
<span class="line"><span style="color:#6A737D;">  // https://snippet-generator.app/</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;MP SFA Template&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;sfa&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;import { createApp } from </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">@52css/mp-vue3</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;createApp({&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  setup(option: WechatMiniprogram.App.LaunchShowOption) {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    return {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    };&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  },&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;});&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MP SFA Template&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;MP SFP Template&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;sfp&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;import { ref, computed, watch, definePage, onLoad } from </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">@52css/mp-vue3</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;definePage({&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  queries: {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    query1: String&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  },&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  setup() {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    return {}&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  }&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;});&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MP SFP Template&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;MP SFC Template&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;sfc&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;import { ref, computed, watch, defineComponent } from </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">@52css/mp-vue3</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;defineComponent({&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  properties: {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    prop1: String&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  },&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  emits: {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    event1: (_name: string) =&gt; true,&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  },&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  setup() {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    return {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    };&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  },&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;});&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MP SFC Template&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;MP SFS Template&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;sfs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;import { ref, defineStore } from </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">@52css/mp-vue3</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;export const useCounterStore = defineStore(</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">counter</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">, () =&gt; {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  const count = ref(0);&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  return {&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;    count,&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;  };&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;});&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;MP SFS Template&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;Picsum Template&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;picsum&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;https://picsum.photos/200/300?random=1&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;生成随机图片&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    // 文字使用</span></span>
<span class="line"><span style="color:#6A737D;">    // lorem 生成文字</span></span>
<span class="line"><span style="color:#6A737D;">    // lorem100 生成100个文字</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;Region Templat&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;prefix&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;region&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;body&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;//#region $0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;//#endregion&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#79B8FF;">    &quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Region Templat&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div>`,4),t=[l];function e(c,E,r,u,F,y){return a(),n("div",null,t)}const B=s(p,[["render",e]]);export{i as __pageData,B as default};
