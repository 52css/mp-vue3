import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.DsvKXnjw.js";const h=JSON.parse('{"title":"userRouter","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/路由 Router/useRouter.md","filePath":"框架接口/路由 Router/useRouter.md"}'),p={name:"框架接口/路由 Router/useRouter.md"},l=e(`<h1 id="userrouter" tabindex="-1">userRouter <a class="header-anchor" href="#userrouter" aria-label="Permalink to &quot;userRouter&quot;">​</a></h1><ul><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html" target="_blank" rel="noreferrer">微信小程序 wx.switchTab</a> =&gt; <code>router.switchTab</code></li><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html" target="_blank" rel="noreferrer">微信小程序 wx.reLaunch</a> =&gt; <code>router.reLaunch</code></li><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html" target="_blank" rel="noreferrer">微信小程序 wx.redirectTo</a> =&gt; <code>router.replace</code></li><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html" target="_blank" rel="noreferrer">微信小程序 wx.navigateTo</a> =&gt; <code>router.push</code></li><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html" target="_blank" rel="noreferrer">微信小程序 wx.navigateBack</a> =&gt; <code>router.back</code></li><li>扩充 <code>router.go(-1)</code>, 只支持往后返回</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, ref, useRouter } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">    const</span><span style="color:#79B8FF;"> router</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useRouter</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">    // 跳转方式1，支持path和query</span></span>
<span class="line"><span style="color:#F97583;">    const</span><span style="color:#B392F0;"> goPiniaTap</span><span style="color:#F97583;"> =</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      router.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&#39;/pages/pinia/pinia&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        query: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          a: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          b: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#6A737D;">    // 跳转方式2，原生url</span></span>
<span class="line"><span style="color:#F97583;">    const</span><span style="color:#B392F0;"> goPiniaTap2</span><span style="color:#F97583;"> =</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      router.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        url: </span><span style="color:#9ECBFF;">&#39;/pages/pinia/pinia?a=1&amp;b=2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 跳转方式3，支持string</span></span>
<span class="line"><span style="color:#F97583;">    const</span><span style="color:#B392F0;"> goPiniaTap3</span><span style="color:#F97583;"> =</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      router.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/pages/pinia/pinia?a=1&amp;b=2&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      goPiniaTap,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre></div>`,3),o=[l];function r(t,c,i,E,y,u){return n(),a("div",null,o)}const F=s(p,[["render",r]]);export{h as __pageData,F as default};
