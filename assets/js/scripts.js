!function(NioApp){"use strict";let nav={classes:{main:"nk-nav",item:"nk-nav-item",link:"nk-nav-link",toggle:"nk-nav-toggle",sub:"nk-nav-sub",subparent:"has-sub",active:"active",current:"current-page"}};NioApp.Dropdown={load:function(e,t){let a=e.parentElement;a.classList.contains(t)||a.classList.add(t)},toggle:function(e,t){let a=e.parentElement,s=e.nextElementSibling,n=s.children.length>5?400+10*s.children.length:400;a.classList.contains(t)?(a.classList.remove(t),NioApp.SlideUp(s,n)):(a.classList.add(t),NioApp.SlideDown(s,n))},closeSiblings:function(e,t,a,s){let n=e.parentElement,o=n.parentElement.children;Array.from(o).forEach(e=>{if(e!==n&&(e.classList.remove(t),e.classList.contains(a))){e.querySelectorAll("."+s).forEach(e=>{e.parentElement.classList.remove(t),NioApp.SlideUp(e,400)})}})}},NioApp.Dropdown.header=function(selector){const elm=document.querySelectorAll(selector);let active=nav.classes.active,subparent=nav.classes.subparent,submenu=nav.classes.sub,navbarCollapse=NioApp.body.dataset.navbarCollapse?NioApp.body.dataset.navbarCollapse:NioApp.Break.lg;elm.forEach(item=>{NioApp.Dropdown.load(item,subparent),item.addEventListener("click",(function(e){e.preventDefault(),NioApp.Win.width<eval("NioApp.Break."+navbarCollapse)&&(NioApp.Dropdown.toggle(item,active),NioApp.Dropdown.closeSiblings(item,active,subparent,submenu))}))})};let navbar={classes:{base:"nk-navbar",toggle:"navbar-toggle",toggleActive:"active",active:"navbar-active",overlay:"navbar-overlay",body:"navbar-shown"},break:{main:NioApp.body.dataset.navbarCollapse?eval("NioApp.Break."+NioApp.body.dataset.navbarCollapse):NioApp.Break.lg}};NioApp.Navbar={show:function(e,t){e.forEach(e=>{e.classList.add(navbar.classes.toggleActive)}),t.classList.add(navbar.classes.active),NioApp.body.classList.add(navbar.classes.body);let a=`<div class='${navbar.classes.overlay}'></div>`;t.insertAdjacentHTML("beforebegin",a)},hide:function(e,t){e.forEach(e=>{e.classList.remove(navbar.classes.toggleActive)}),t.classList.remove(navbar.classes.active),NioApp.body.classList.remove(navbar.classes.body);let a=document.querySelector("."+navbar.classes.overlay);setTimeout(()=>{a&&a.remove()},400)},mobile:function(e){navbar.break.main<NioApp.Win.width?e.classList.remove("navbar-mobile"):setTimeout(()=>{e.classList.add("navbar-mobile")},500)},sticky:function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{let t=e.offsetTop;window.addEventListener("scroll",(function(){window.scrollY>t?e.classList.add("has-fixed"):e.classList.remove("has-fixed")}))})}},NioApp.Navbar.init=function(){let e=document.querySelector("."+navbar.classes.base),t=document.querySelectorAll("."+navbar.classes.toggle);t.forEach(a=>{NioApp.Navbar.mobile(e),a.addEventListener("click",(function(a){a.preventDefault(),navbar.break.main>NioApp.Win.width&&(e.classList.contains(navbar.classes.active)?NioApp.Navbar.hide(t,e):NioApp.Navbar.show(t,e))})),window.addEventListener("resize",(function(a){navbar.break.main<NioApp.Win.width&&NioApp.Navbar.hide(t,e),NioApp.Navbar.mobile(e)})),document.addEventListener("mouseup",(function(a){null===a.target.closest("."+navbar.classes.base)&&NioApp.Navbar.hide(t,e)}))}),NioApp.Navbar.sticky(".nk-header .nk-header-main")},NioApp.CurrentLink=function(e,t,a,s,n,o){let i=document.querySelectorAll(e),r=document.location.href,l=r.substring(0,-1==r.indexOf("#")?r.length:r.indexOf("#")),c=l.substring(0,-1==l.indexOf("?")?l.length:l.indexOf("?"));i.forEach((function(e){var i=e.getAttribute("href");if(c.match(i)){NioApp.getParents(e,"."+s,t).forEach(e=>{e.classList.add(...n);let t=e.querySelector("."+a);null!==t&&(t.style.display="block")}),o&&e.scrollIntoView({block:"end"})}else e.parentElement.classList.remove(...n)}))},NioApp.Addons.swiperCarousel=function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{let t=e,a=t.dataset.breakpoints?JSON.parse(t.dataset.breakpoints):null,s=!!t.dataset.autoplay&&JSON.parse(t.dataset.autoplay),n=!!t.dataset.loop&&JSON.parse(t.dataset.loop),o=!!t.dataset.centeredslides&&JSON.parse(t.dataset.centeredslides),i=t.dataset.slidesperview?t.dataset.slidesperview:"",r=t.dataset.speed?parseInt(t.dataset.speed):900,l=t.dataset.spaceBetween?parseInt(t.dataset.spaceBetween):0,c=t.dataset.effect?t.dataset.effect:"slide";new Swiper(t,{centeredSlides:o,slidesPerView:i,loop:n,speed:r,autoplay:s,spaceBetween:l,effect:c,pagination:{el:t.querySelectorAll(".swiper-pagination")[0],type:"bullets",clickable:!0},navigation:{prevEl:t.querySelectorAll(".swiper-button-prev")[0],nextEl:t.querySelectorAll(".swiper-button-next")[0],clickable:!0},breakpoints:a})})},NioApp.Addons.parallax=function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{let t=!e.dataset.background||!JSON.parse(e.dataset.background),a=e.dataset.delay?parseInt(e.dataset.delay):0,s=e.dataset.scale?parseFloat(e.dataset.scale):1.4,n=e.dataset.orientation?e.dataset.orientation:"down",o=e.dataset.transition?e.dataset.transition:"cubic-bezier(0,0,0,1)";new simpleParallax(e,{delay:a,orientation:n,scale:s,overflow:t,transition:o})})},NioApp.Addons.aos=function(){AOS.init({disable:!1,startEvent:"DOMContentLoaded",initClassName:"aos-init",animatedClassName:"aos-animate",useClassNames:!1,disableMutationObserver:!1,debounceDelay:50,throttleDelay:60,offset:180,delay:0,duration:900,easing:"ease",once:!0,mirror:!1,anchorPlacement:"top-bottom"})},NioApp.Custom.priceToggle=function(e,t){let a=document.querySelectorAll(e),s=document.querySelectorAll(t);a&&a.forEach(e=>{e.addEventListener("click",(function(){s.forEach(e=>{e.classList.toggle("is-active")})}))})},NioApp.Custom.characterCounter=function(e,t,a,s){let n,o=document.getElementById(e),i=document.getElementById(t),r=document.getElementById(a),l=document.getElementById(s);null!==r&&(n=r.dataset.charMax,r.innerHTML=n);const c=()=>{let e=0+o.value.length;i.textContent=e,l.disabled=!1,e>n?(i.style.color="red",l.disabled=!0):i.style.color=e>240?"orange":0==e?"#8094ae":"#2a3962"};null!==o&&o.addEventListener("input",c)},NioApp.Custom.showHidePassword=function(e){let t=document.querySelectorAll(e);t&&t.forEach(e=>{e.addEventListener("click",(function(t){t.preventDefault();let a=document.getElementById(e.getAttribute("href"));"password"==a.type?(a.type="text",e.classList.add("is-shown")):(a.type="password",e.classList.remove("is-shown"))}))})},NioApp.Custom.backToTop=function(e){let t=document.querySelector(e);window.addEventListener("scroll",()=>{window.scrollY>60?t.classList.add("active"):t.classList.remove("active")})},NioApp.Addons.pristine=function(e,t){return new Pristine(e,{classTo:"form-control-wrap",errorClass:"nk-error",successClass:"nk-sucess",errorTextParent:"form-control-wrap",errorTextTag:"span",errorTextClass:"nk-message nk-message-error"},t)},NioApp.Addons.toast=function(e,t){let a=`\n    <div class="nk-toast ${"success"===e?" nk-toast-success":"warning"===e?" nk-toast-warning":"error"===e?" nk-toast-error":""} toast show animate animate-slide-right animate-duration-12 position-fixed m-3 border-0" role="alert" aria-live="assertive" aria-atomic="true" id="toastContainer" >\n      <div>\n        <span class="nk-toast-icon">\n          <em class="icon ni ni-${"success"===e?"check":"error"===e?"alert-circle-fill":"warning"===e?"alert-fill":"info-i"}"></em>\n        </span>\n      </div>\n      <div class="nk-toast-info">\n        <h6 class="m-0">\n          ${"success"===e?"Success":"error"===e?"Error":"warning"===e?"Warning":"info-i"} \n        </h6>\n        <p>${t}\n      </div>\n        <button type="button" class="nk-toast-btn" data-bs-dismiss="toast" aria-label="Close">\n          <em class="icon ni ni-cross"></em>\n        </button>\n      </div>\n    `;NioApp.body.insertAdjacentHTML("beforeend",a),setTimeout(()=>document.getElementById("toastContainer").remove(),6e3)},NioApp.Custom.submitForm=function(e){let t=document.querySelectorAll(e);t&&t.forEach(e=>{const t=e.dataset.action;let a=NioApp.Addons.pristine(e,!1);e.addEventListener("submit",(function(s){if(s.preventDefault(),a.validate()){let a=new FormData(e);const s=new XMLHttpRequest;s.onreadystatechange=function(){if(4==this.readyState&&200==this.status){let e=null;try{e=JSON.parse(s.responseText)}catch(e){}e?NioApp.Addons.toast(e.result,e.message):NioApp.Addons.toast("error","Oops! There was something went wrong.")}},s.open("POST",t,!0),s.send(a),e.reset()}}))})},NioApp.Custom.tooltip=function(e){[...document.querySelectorAll(e)].map(e=>new bootstrap.Tooltip(e))},NioApp.Custom.init=function(){NioApp.Navbar.init(),NioApp.Addons.aos(),NioApp.Addons.swiperCarousel(".swiper-init"),NioApp.Addons.parallax(".parallax-init"),NioApp.Dropdown.header("."+nav.classes.toggle),NioApp.Custom.backToTop(".scroll-top"),NioApp.Custom.priceToggle(".price-toggle-input",".nk-pricing"),NioApp.Custom.characterCounter("textarea-box","char-count","char-max","submit-btn"),NioApp.Custom.showHidePassword(".password-toggle"),NioApp.Custom.submitForm(".form-submit-init")},NioApp.init=function(){NioApp.winLoad(NioApp.Custom.init)},NioApp.init()}(NioApp);