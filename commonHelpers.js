import{S as p,i as n}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function g(s){const o=`https://pixabay.com/api/?key=44778240-802eb20b46cf6f3dc26aab8d1&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}function d(s){return s.map(({webformatURL:o,largeImageURL:r,tags:l,likes:e,views:t,comments:i,downloads:m})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${r}">
      <img class="gallery-img" src="${o}" alt="${l}" />
      <ul class="card-info">
        <li class="card-info-item">
          Likes<span class="accent">${e}</span>
        </li>
        <li class="card-info-item">
          Views<span class="accent">${t}</span>
        </li>
        <li class="card-info-item">
          Comments<span class="accent">${i}</span>
        </li>
        <li class="card-info-item">
          Downloads<span class="accent">${m}</span>
        </li>
      </ul>
      </a>
    </li>`).join("")}const c="/goit-js-hw-12/assets/error-9bc150ed.svg",h="/goit-js-hw-12/assets/caution-4e670f25.svg",a=document.querySelector(".form"),u=document.querySelector(".gallery"),f=document.querySelector(".loader-wrap"),y=new p(".gallery a",{captionsData:"alt",captionDelay:250});a.addEventListener("submit",w);function w(s){s.preventDefault(),u.innerHTML="";const o=a.elements.input.value.toLowerCase().trim();if(o===""){n.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"Please, fill out the field!",messageColor:"white",messageSize:"16px",position:"topRight",backgroundColor:"#ffa000",iconUrl:h,close:!1,closeOnClick:!0});return}f.style.display="flex",g(o).then(r=>{r.hits.length===0?n.error({title:"Error",titleColor:"white",titleSize:"16px",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"#ef4040",iconUrl:c,close:!1,closeOnClick:!0}):(u.innerHTML=d(r.hits),y.refresh())}).catch(r=>{n.error({title:"Error",titleColor:"white",titleSize:"16px",message:`Ups... Someting went wrong. Error: ${r}`,messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"#ef4040",iconUrl:c,close:!1,closeOnClick:!0})}).finally(()=>{a.reset(),f.style.display="none"})}
//# sourceMappingURL=commonHelpers.js.map
