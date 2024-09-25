import{_ as s,c as n,o as a,a4 as e}from"./chunks/framework.DsvKXnjw.js";const _=JSON.parse('{"title":"useRoute","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/路由 Router/useRoute.md","filePath":"框架接口/路由 Router/useRoute.md"}'),l={name:"框架接口/路由 Router/useRoute.md"},p=e(`<h1 id="useroute" tabindex="-1">useRoute <a class="header-anchor" href="#useroute" aria-label="Permalink to &quot;useRoute&quot;">​</a></h1><ul><li><code>route.query.xx</code> 不是响应式，如果有需要再添加</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, ref, useRoute } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a: Number,</span></span>
<span class="line"><span style="color:#E1E4E8;">    b: Number,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">    const</span><span style="color:#79B8FF;"> route</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useRoute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回</span></span>
<span class="line"><span style="color:#6A737D;">     * {</span></span>
<span class="line"><span style="color:#6A737D;">     *   path: &quot;pages/pinia/pinia&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">     *   query: {a: 1, b: 2}, // ** 这个必须定义了queries才能正确转换格式 **</span></span>
<span class="line"><span style="color:#6A737D;">     * }</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ setup ~ route:&quot;</span><span style="color:#E1E4E8;">, route)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre></div>`,3),o=[p];function t(c,r,i,u,E,y){return a(),n("div",null,o)}const F=s(l,[["render",t]]);export{_ as __pageData,F as default};
