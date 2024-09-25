import{_ as s,c as n,o as a,a4 as e}from"./chunks/framework.DsvKXnjw.js";const y=JSON.parse('{"title":"useRoute","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/路由 Router/useRoute.md","filePath":"框架接口/路由 Router/useRoute.md"}'),l={name:"框架接口/路由 Router/useRoute.md"},p=e(`<h1 id="useroute" tabindex="-1">useRoute <a class="header-anchor" href="#useroute" aria-label="Permalink to &quot;useRoute&quot;">​</a></h1><ul><li><code>route.query.xx</code> 不是响应式，如果有需要再添加</li></ul><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, ref, useRoute } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div>`,3),o=[p];function r(c,t,i,u,b,E){return a(),n("div",null,o)}const d=s(l,[["render",r]]);export{y as __pageData,d as default};
