import{_ as s,c as a,o as i,ab as n}from"./chunks/framework.BrdkG7x0.js";const g=JSON.parse('{"title":"사이트맵 생성","description":"","frontmatter":{},"headers":[],"relativePath":"ko/guide/sitemap-generation.md","filePath":"ko/guide/sitemap-generation.md","lastUpdated":1723882596000}'),e={name:"ko/guide/sitemap-generation.md"},t=n(`<h1 id="sitemap-generation" tabindex="-1">사이트맵 생성 <a class="header-anchor" href="#sitemap-generation" aria-label="Permalink to &quot;사이트맵 생성 {#sitemap-generation}&quot;">​</a></h1><p>VitePress는 사이트를 위한 <code>sitemap.xml</code> 파일 생성을 기본적으로 지원합니다. 이를 활성화하려면 다음을 <code>.vitepress/config.js</code>에 추가하세요:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  sitemap: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hostname: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://example.com&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>&lt;lastmod&gt;</code> 태그를 <code>sitemap.xml</code>에 포함하려면 <a href="./../reference/default-theme-last-updated"><code>lastUpdated</code></a> 옵션을 활성화할 수 있습니다.</p><h2 id="options" tabindex="-1">옵션 <a class="header-anchor" href="#options" aria-label="Permalink to &quot;옵션 {#options}&quot;">​</a></h2><p>사이트맵 지원은 <a href="https://www.npmjs.com/package/sitemap" target="_blank" rel="noreferrer"><code>sitemap</code></a> 모듈에 의해 제공됩니다. 설정 파일의 <code>sitemap</code> 옵션에 이 모듈이 지원하는 모든 옵션을 전달할 수 있습니다. 이 옵션들은 <code>SitemapStream</code> 생성자에 직접 전달됩니다. 자세한 내용은 <a href="https://www.npmjs.com/package/sitemap#options-you-can-pass" target="_blank" rel="noreferrer"><code>sitemap</code> 문서</a>를 참조하세요. 예제:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  sitemap: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hostname: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://example.com&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    lastmodDateOnly: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>설정 파일에서 <code>base</code>를 사용하는 경우, <code>hostname</code> 옵션에 이를 추가해야 합니다:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  base: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/my-site/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  sitemap: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hostname: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://example.com/my-site/&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="transformitems-hook" tabindex="-1"><code>transformItems</code> Hook <a class="header-anchor" href="#transformitems-hook" aria-label="Permalink to &quot;\`transformItems\` Hook&quot;">​</a></h2><p><code>sitemap.transformItems</code> 훅을 사용하여 <code>sitemap.xml</code> 파일에 작성되기 전에 사이트맵 항목을 수정할 수 있습니다. 이 훅은 사이트맵 항목 배열을 인자로 받아 배열을 반환해야 합니다. 예제:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  sitemap: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hostname: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://example.com&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    transformItems</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 새로운 항목 추가 또는 기존 항목 수정/필터링</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      items.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/extra-page&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        changefreq: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;monthly&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        priority: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.8</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> items</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,12),p=[t];function l(h,k,d,E,r,o){return i(),a("div",null,p)}const m=s(e,[["render",l]]);export{g as __pageData,m as default};
