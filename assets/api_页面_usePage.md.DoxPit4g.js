import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.DsvKXnjw.js";const E=JSON.parse('{"title":"usePage","description":"","frontmatter":{},"headers":[],"relativePath":"api/页面/usePage.md","filePath":"api/页面/usePage.md"}'),n={name:"api/页面/usePage.md"},t=e(`<h1 id="usepage" tabindex="-1">usePage <a class="header-anchor" href="#usepage" aria-label="Permalink to &quot;usePage&quot;">​</a></h1><ul><li>获取当前页, 相当于 <code>getCurrentPages().at(-1)</code></li></ul><h2 id="获取当前页" tabindex="-1">获取当前页 <a class="header-anchor" href="#获取当前页" aria-label="Permalink to &quot;获取当前页&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { definePage, usePage } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">definePage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> instance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> usePage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;🚀 ~ definePage ~ instance:&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, instance)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>`,4),l=[t];function h(p,k,r,d,c,o){return i(),a("div",null,l)}const u=s(n,[["render",h]]);export{E as __pageData,u as default};
