import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as c}from"./assets/vendor-77e16229.js";const a=document.querySelector(".form");function l(t,e,s){return{delay:t,value:e,shouldResolve:s}}const i=({delay:t,value:e,shouldResolve:s})=>new Promise((n,o)=>{setTimeout(()=>{s.toLowerCase()==="fulfilled"?n(e):o(e)},t)});a.addEventListener("submit",t=>{t.preventDefault();const e=document.querySelector('[name="delay"]'),s=document.querySelector('input[name="state"]:checked'),n=l(parseInt(e.value),parseInt(e.value),String(s.value));i(n).then(o=>{const r=`✅ Fulfilled promise in ${o} ms`;console.log(r),c.success({title:"Success",message:r})}).catch(o=>{const r=`❌ Rejected promise in ${o}ms`;console.error(r),c.error({title:"Помилка",message:r})}),a.reset()});
//# sourceMappingURL=commonHelpers2.js.map