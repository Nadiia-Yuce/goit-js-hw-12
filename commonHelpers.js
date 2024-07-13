import{a as C,S,i as c}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();function d({query:o="",page:t=1,per_page:a=15}={}){const l=`https://pixabay.com/api/?key=44778240-802eb20b46cf6f3dc26aab8d1&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`;return C.get(l,{params:{query:o,page:t,per_page:a}}).then(({data:e})=>e)}function m(o){return o.map(({webformatURL:t,largeImageURL:a,tags:l,likes:e,views:r,comments:n,downloads:w})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${a}">
      <img class="gallery-img" src="${t}" alt="${l}" />
      <ul class="card-info">
        <li class="card-info-item">
          Likes<span class="accent">${e}</span>
        </li>
        <li class="card-info-item">
          Views<span class="accent">${r}</span>
        </li>
        <li class="card-info-item">
          Comments<span class="accent">${n}</span>
        </li>
        <li class="card-info-item">
          Downloads<span class="accent">${w}</span>
        </li>
      </ul>
      </a>
    </li>`).join("")}const g="/goit-js-hw-12/assets/error-9bc150ed.svg",y="/goit-js-hw-12/assets/caution-4e670f25.svg",p=document.querySelector(".form"),f=document.querySelector(".gallery"),u=document.querySelector(".loader-wrap"),i=document.querySelector(".load-more-btn"),h=new S(".gallery a",{captionsData:"alt",captionDelay:250}),s={query:"",page:1,per_page:15,max_page:0};p.addEventListener("submit",x);async function x(o){if(o.preventDefault(),f.innerHTML="",s.page=1,s.query=p.elements.input.value.trim(),!s.query){c.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"Please, fill out the field!",messageColor:"white",messageSize:"16px",position:"topRight",backgroundColor:"#ffa000",iconUrl:y,close:!1,closeOnClick:!0}),p.reset();return}u.style.display="flex";try{const t=await d(s);t.hits.length===0?c.error({title:"Error",titleColor:"white",titleSize:"16px",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"#ef4040",iconUrl:g,close:!1,closeOnClick:!0}):(s.max_page=Math.ceil(t.totalHits/s.per_page),s.max_page>1?(i.style.display="block",i.addEventListener("click",b)):i.style.display="none",f.innerHTML=m(t.hits),h.refresh())}catch(t){c.error({title:"Error",titleColor:"white",titleSize:"16px",message:`Ups... Someting went wrong. Error: ${t}`,messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"#ef4040",iconUrl:g,close:!1,closeOnClick:!0})}finally{p.reset(),u.style.display="none"}}async function b(){s.page+=1,u.style.display="flex",i.style.display="none";try{const o=await d(s);f.insertAdjacentHTML("beforeend",m(o.hits)),h.refresh();//!тут буде плавний скролл
}catch(o){c.error({title:"Error",titleColor:"white",titleSize:"16px",message:`Ups... Someting went wrong. Error: ${o}`,messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"#ef4040",iconUrl:g,close:!1,closeOnClick:!0})}finally{u.style.display="none",s.page===s.max_page?(i.style.display="none",i.removeEventListener("click",b),c.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"We are sorry, but you have reached the end of search results.",messageColor:"white",messageSize:"16px",position:"topRight",backgroundColor:"#ffa000",iconUrl:y,close:!1,closeOnClick:!0})):i.style.display="block"}}
//# sourceMappingURL=commonHelpers.js.map
