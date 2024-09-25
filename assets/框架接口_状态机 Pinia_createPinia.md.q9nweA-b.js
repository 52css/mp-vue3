import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.DsvKXnjw.js";const u=JSON.parse('{"title":"createPinia","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/状态机 Pinia/createPinia.md","filePath":"框架接口/状态机 Pinia/createPinia.md"}'),p={name:"框架接口/状态机 Pinia/createPinia.md"},l=e(`<h1 id="createpinia" tabindex="-1">createPinia <a class="header-anchor" href="#createpinia" aria-label="Permalink to &quot;createPinia&quot;">​</a></h1><p>支持<code>app.ts</code></p><ul><li>只是实现<code>最简版</code>状态机，只支持<code>setup</code>, 不支持<code>options</code>、<code>插件</code>、<code>$patch</code>、<code>$subscribe</code>、<code>$patch</code></li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp, createPinia } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &quot;@52css/mp-vue3&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> pinia</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> createPinia</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// app.ts</span></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  globalData: {},</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">    // 由于这里没有自动install环境，需要onLaunch手动install</span></span>
<span class="line"><span style="color:#E1E4E8;">    pinia.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div>`,4),o=[l];function c(t,i,r,d,E,_){return n(),a("div",null,o)}const P=s(p,[["render",c]]);export{u as __pageData,P as default};
