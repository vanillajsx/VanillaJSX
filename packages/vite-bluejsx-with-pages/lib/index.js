import h from"directory-tree";import{resolve as s,relative as u,dirname as y}from"path";import{createServer as S}from"vite";import w from"vite-with-bluejsx";import a,{constants as v,accessSync as P,statSync as D}from"fs";import _ from"deepmerge";function $(e){var d;w(e);let i={},r=b(),t=s(r,"./pages"),o=s(r,"./.bluepages");try{D(o),a.rmSync(o,{recursive:!0})}catch{a.mkdirSync(o,{recursive:!0})}let j=h(t,{extensions:/\.(md|mdx|js|jsx|ts|tsx)$/,normalizePath:!0},({name:c},p)=>{let n=c.replace(/.[\w]+$/,"");if(n.indexOf("_")===0)return null;let m=u(r+"/pages",p),l=s(o+"/"+m,"../");a.mkdirSync(l,{recursive:!0});let f=s(l,`./${n}.html`);a.writeFileSync(s(l,`./${n}.js`),`import Component from '${u(l,p)}';import('${u(l,t)}/_app').then(({default: Page})=>document.querySelector('#app').appendChild(Page({Component,pageProps:{}})))`);let g=a.readFileSync(`${t}/_template.html`,"utf-8").replace("</body",`<script type="module" src="./${n}.js"><\/script></body`);a.writeFileSync(f,g),i[m.replace(/\//,"_").replace(/.[\w]+$/,"")]=f});return(d=e.plugins)!=null||(e.plugins=[]),e.plugins.push({name:"with-pages-listen-dir",async configureServer(c){let{watcher:p}=c;p.add(t),p.on("add",(n,m)=>{n.includes(t)&&x(c)})}}),_(e,{build:{rollupOptions:{input:i},emptyOutDir:!0,outDir:u(o,s(r,"./dist"))},root:o,publicDir:r+"/public"})}function b(){for(let e of module.paths)try{let i=y(e);return P(e,v.F_OK),i}catch{}}async function x(e){global.__vite_start_time=Date.now();let{port:i}=e.config.server;await e.close();let r=null;try{r=await S(e.config.inlineConfig)}catch(t){e.config.logger.error(t.message,{timestamp:!0});return}for(let t in r)t!=="app"&&(e[t]=r[t]);e.config.server.middlewareMode?e.config.logger.info("server restarted.",{timestamp:!0}):await e.listen(i,!0)}export{$ as default};
