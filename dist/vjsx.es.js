var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,o=Object.prototype.propertyIsEnumerable,r=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,a=(e,a)=>{for(var i in a||(a={}))t.call(a,i)&&r(e,i,a[i]);if(n)for(var i of n(a))o.call(a,i)&&r(e,i,a[i]);return e};const i=["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","animation","audio","canvas","circle","clipPath","color-profile","cursor","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","handler","hkern","image","line","linearGradient","listener","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","prefetch","radialGradient","rect","script","set","solidColor","stop","svg","switch","symbol","tbreak","text","textArea","textPath","title","tref","tspan","unknown","use","view","vkern"];EventTarget.prototype.on=EventTarget.prototype.addEventListener,Element.prototype.ready=function(e){e(this)},Element.prototype.useAttr=function(e){Object.defineProperties(this,e)};const l=(e,t)=>{if(t instanceof Function){e.append("");const o=e.childNodes[e.childNodes.length-1];n=e,Object.defineProperties(n,{innerHTML:{set(){}},innerText:{set(){}}});const r=e=>{o.data=e.toString()},a=t(r,e);a&&r(a)}else if(t instanceof Array)for(const o of t)l(e,o);else e.append(t);var n};const f={r:function(e,t,...n){let o;if(null!=t||(t={}),console.log("aaaa"),"string"==typeof e)o=i.includes(e)?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);else{if("function"!=typeof e)throw new Error("using invalid thing used as element tag.");if((null==e?void 0:e.prototype)instanceof Element)try{o=new e}catch(r){customElements.define(e.name.replace(/[A-Z]/g,"-$&").substring(1).toLowerCase(),e),o=new e}else o=e(a(a({},t),{children:[...n]})),n.length=0}if(t)for(const a in t){const e=t[a];if("class"===a)o.classList.value=e;else if(o instanceof SVGElement)o.setAttribute(a,e);else try{o[a]=e}catch(r){o.setAttribute(a,e)}}return l(o,n),o},Fragment:({children:e})=>e};export default f;
