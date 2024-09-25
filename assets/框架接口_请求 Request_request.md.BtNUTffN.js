import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.DsvKXnjw.js";const F=JSON.parse('{"title":"request","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/请求 Request/request.md","filePath":"框架接口/请求 Request/request.md"}'),l={name:"框架接口/请求 Request/request.md"},e=p(`<h1 id="request" tabindex="-1">request <a class="header-anchor" href="#request" aria-label="Permalink to &quot;request&quot;">​</a></h1><ul><li>支持<code>request(options)</code> 原生兼容，支持 <code>request(options)</code> 返回<code>promise</code></li><li>支持<code>request.get(url, params, options)</code></li><li>支持<code>request.post(url, data, options)</code></li><li>支持<code>request.options(url, params, options)</code></li><li>支持<code>request.head(url, params, options)</code></li><li>支持<code>request.put(url, data, options)</code></li><li>支持<code>request.delete(url, data, options)</code></li><li>支持<code>request.trace(url, params, options)</code></li><li>支持<code>request.connect(url, data, options)</code></li></ul><h2 id="app-全局配置" tabindex="-1">App 全局配置 <a class="header-anchor" href="#app-全局配置" aria-label="Permalink to &quot;App 全局配置&quot;">​</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp, request } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">option</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> WechatMiniprogram</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">LaunchShowOption</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">    // 设置基础 URL</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">setBaseUrl</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://api.example.com&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 设置请求拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">setRequestInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">      // 例如，添加认证 token</span></span>
<span class="line"><span style="color:#F97583;">      const</span><span style="color:#79B8FF;"> token</span><span style="color:#F97583;"> =</span><span style="color:#E1E4E8;"> wx.</span><span style="color:#B392F0;">getStorageSync</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;token&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      options.header </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">        ...</span><span style="color:#E1E4E8;">options.header,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Authorization: </span><span style="color:#9ECBFF;">\`Bearer \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#F97583;">      return</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 设置响应拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">setResponseInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">response</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">      // 例如，处理特定的状态码</span></span>
<span class="line"><span style="color:#F97583;">      if</span><span style="color:#E1E4E8;"> (response.statusCode </span><span style="color:#F97583;">===</span><span style="color:#79B8FF;"> 401</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">        // 处理未授权，如跳转登录页面</span></span>
<span class="line"><span style="color:#E1E4E8;">        wx.</span><span style="color:#B392F0;">navigateTo</span><span style="color:#E1E4E8;">({ url: </span><span style="color:#9ECBFF;">&quot;/pages/login/login&quot;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#F97583;">      return</span><span style="color:#E1E4E8;"> response;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    // 返回给 this[key] = value 绑定</span></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre></div><h2 id="page-使用" tabindex="-1">Page 使用 <a class="header-anchor" href="#page-使用" aria-label="Permalink to &quot;Page 使用&quot;">​</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, request } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;user/info&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#F97583;"> =&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ request.get ~ res:&quot;</span><span style="color:#E1E4E8;">, res)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre></div>`,6),o=[e];function t(c,r,E,i,y,u){return a(),n("div",null,o)}const q=s(l,[["render",t]]);export{F as __pageData,q as default};
