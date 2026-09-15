/* Be^Up production shell: turns the legacy bundled preview into a single real navigation experience. */
(function(){
'use strict';
var doc=document, frame, P=window.PAGES;
function pathKey(path){
 path=(path||'/').split('?')[0].replace(/\/+$/,'')||'/';
 var exact={'/':'home','/about':'about','/approach':'approach','/services':'services','/industries':'industries','/insights':'insights','/contact':'contact','/business-growth-checkup':'checkup','/book-consultation':'book','/industries/professional-services':'industry-detail','/insights/sample-article':'insights-article'};
 if(exact[path])return exact[path];
 if(/^\/services\//.test(path))return findKey(path.slice(10))||'services';
 if(/^\/industries\//.test(path))return findKey(path.slice(11))||'industries';
 if(/^\/insights\//.test(path))return findKey(path.slice(9))||'insights';
 return 'home';
}
function findKey(slug){if(!P)return null;slug=slug.toLowerCase().replace(/[^a-z0-9]+/g,' ');var keys=Object.keys(P);for(var i=0;i<keys.length;i++){var k=keys[i].toLowerCase().replace(/[^a-z0-9]+/g,' ');if(slug.split(' ').filter(Boolean).every(function(w){return k.indexOf(w)>=0}))return keys[i]}return null}
function hideLegacy(){['.shell-header','.shell-nav','.note','.err-banner'].forEach(function(s){doc.querySelectorAll(s).forEach(function(e){e.style.display='none'})});doc.body.style.display='block';doc.body.style.background='#fff';var wrap=doc.querySelector('.frame-wrap');if(wrap){wrap.style.position='relative';wrap.style.width='100%';wrap.style.height='100vh';wrap.style.minHeight='100vh'}frame=doc.getElementById('page-frame');if(frame){frame.style.width='100%';frame.style.height='100vh';frame.style.minHeight='100vh';frame.setAttribute('title','Be^Up website')}}
function injectInner(){if(!frame)return;try{var d=frame.contentDocument;if(!d||!d.head||!d.body)return;['/responsive-frame.js','/site-production.js','/home-meta.js'].forEach(function(src){if(d.querySelector('script[data-beup-src="'+src+'"]'))return;var s=d.createElement('script');s.src=src;s.setAttribute('data-beup-src',src);d.body.appendChild(s)});setTimeout(function(){try{var d2=frame.contentDocument;if(d2&&location.pathname==='/'){var hs=d2.querySelector('.beup-home');if(hs)hs.setAttribute('data-production-home','true')}}catch(e){}},300)}catch(e){}}
function go(key,replace){var b=doc.querySelector('.navbtn[data-key="'+key+'"]');if(b){b.click();var p=({'home':'/','about':'/about','approach':'/approach','services':'/services','industries':'/industries','industry-detail':'/industries/professional-services','insights':'/insights','insights-article':'/insights/sample-article','contact':'/contact','checkup':'/business-growth-checkup','book':'/book-consultation'})[key]||'/';(replace?history.replaceState:history.pushState).call(history,{},'',p);return true}return false}
function wire(){if(!frame)return;frame.addEventListener('load',function(){injectInner()});document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||!frame||a.closest('.shell-nav'))return;var u;try{u=new URL(a.href,location.href)}catch(x){return}if(u.origin!==location.origin)return;var key=pathKey(u.pathname);if(!P||!P[key])return;if(a.target==='_blank')return;e.preventDefault();go(key,false);window.scrollTo(0,0)});window.addEventListener('popstate',function(){go(pathKey(location.pathname),true);window.scrollTo(0,0)});hideLegacy();go(pathKey(location.pathname),true);injectInner()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
})();
