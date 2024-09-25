import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.DsvKXnjw.js";const h=JSON.parse('{"title":"onLaunch支持异步","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/通用 Common/onLaunch支持异步.md","filePath":"框架接口/通用 Common/onLaunch支持异步.md"}'),l={name:"框架接口/通用 Common/onLaunch支持异步.md"},e=p(`<h1 id="onlaunch支持异步" tabindex="-1">onLaunch支持异步 <a class="header-anchor" href="#onlaunch支持异步" aria-label="Permalink to &quot;onLaunch支持异步&quot;">​</a></h1><ul><li>原生支持有点麻烦，写<code>callback</code>回调函数、写<code>event</code>触发、写<code>promise</code>等</li><li>在框架层面支持直接异步执行，Page的<code>setup</code> 和 组件的<code>setup</code> 等待 App的 <code>setup</code>执行完毕再执行</li></ul><h2 id="app" tabindex="-1">App <a class="header-anchor" href="#app" aria-label="Permalink to &quot;App&quot;">​</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> sleep</span><span style="color:#F97583;"> =</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  return</span><span style="color:#F97583;"> new</span><span style="color:#79B8FF;"> Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    setTimeout</span><span style="color:#E1E4E8;">(resolve, </span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 5秒后resolve</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#F97583;">  async</span><span style="color:#B392F0;"> setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#F97583;">    await</span><span style="color:#B392F0;"> sleep</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ createApp ~ instance:&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div><h2 id="页面" tabindex="-1">页面 <a class="header-anchor" href="#页面" aria-label="Permalink to &quot;页面&quot;">​</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {},</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ definePage ~ instance:&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div><h2 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  properties: {},</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ defineComponent ~ instance:&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div><h2 id="整体打印结果" tabindex="-1">整体打印结果 <a class="header-anchor" href="#整体打印结果" aria-label="Permalink to &quot;整体打印结果&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span>// 等待5s</span></span>
<span class="line"><span>// 打印 🚀 ~ createApp ~ instance:</span></span>
<span class="line"><span>// 打印 🚀 ~ definePage ~ instance:</span></span>
<span class="line"><span>// 🚀 ~ defineComponent ~ instance:</span></span></code></pre></div>`,10),o=[e];function c(t,r,E,i,y,d){return a(),n("div",null,o)}const F=s(l,[["render",c]]);export{h as __pageData,F as default};
