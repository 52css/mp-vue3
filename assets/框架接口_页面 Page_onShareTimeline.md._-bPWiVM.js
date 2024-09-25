import{_ as s,c as n,o as a,a4 as e}from"./chunks/framework.DsvKXnjw.js";const d=JSON.parse('{"title":"onShareTimeline","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/页面 Page/onShareTimeline.md","filePath":"框架接口/页面 Page/onShareTimeline.md"}'),l={name:"框架接口/页面 Page/onShareTimeline.md"},o=e(`<h1 id="onsharetimeline" tabindex="-1">onShareTimeline <a class="header-anchor" href="#onsharetimeline" aria-label="Permalink to &quot;onShareTimeline&quot;">​</a></h1><ul><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareTimeline" target="_blank" rel="noreferrer">微信小程序 Page.onShareTimeline</a></li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, onShareTimeline } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {},</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#B392F0;">    onShareTimeline</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ onShareTimeline ~ onShareTimeline:&quot;</span><span style="color:#E1E4E8;">, onShareTimeline)</span></span>
<span class="line"><span style="color:#F97583;">      return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        title: </span><span style="color:#9ECBFF;">&#39;转发标题&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        imageUrl: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 图片 URL</span></span>
<span class="line"><span style="color:#E1E4E8;">        query: </span><span style="color:#9ECBFF;">&#39;a=1&amp;b=2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div>`,3),p=[o];function r(t,i,c,E,y,m){return a(),n("div",null,p)}const _=s(l,[["render",r]]);export{d as __pageData,_ as default};
