import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.DsvKXnjw.js";const h=JSON.parse('{"title":"onShareAppMessage","description":"","frontmatter":{},"headers":[],"relativePath":"框架接口/页面 Page/onShareAppMessage.md","filePath":"框架接口/页面 Page/onShareAppMessage.md"}'),p={name:"框架接口/页面 Page/onShareAppMessage.md"},l=e(`<h1 id="onshareappmessage" tabindex="-1">onShareAppMessage <a class="header-anchor" href="#onshareappmessage" aria-label="Permalink to &quot;onShareAppMessage&quot;">​</a></h1><ul><li>继承<a href="https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object" target="_blank" rel="noreferrer">微信小程序 Page.onShareAppMessage</a></li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { definePage, onShareAppMessage } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> &#39;@52css/mp-vue3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">definePage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  queries: {},</span></span>
<span class="line"><span style="color:#B392F0;">  setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#B392F0;">    onShareAppMessage</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">object</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> WechatMiniprogram</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">IShareAppMessageOption</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ onShareAppMessage ~ object:&quot;</span><span style="color:#E1E4E8;">, object)</span></span>
<span class="line"><span style="color:#F97583;">      const</span><span style="color:#79B8FF;"> promise</span><span style="color:#F97583;"> =</span><span style="color:#F97583;"> new</span><span style="color:#79B8FF;"> Promise</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">resolve</span><span style="color:#F97583;"> =&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#B392F0;">        setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#B392F0;">          resolve</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            title: </span><span style="color:#9ECBFF;">&#39;自定义转发标题&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          })</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#F97583;">      return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        title: </span><span style="color:#9ECBFF;">&#39;自定义转发标题&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&#39;/page/user?id=123&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        promise</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre></div>`,3),o=[l];function t(r,c,E,i,y,F){return n(),a("div",null,o)}const d=s(p,[["render",t]]);export{h as __pageData,d as default};
