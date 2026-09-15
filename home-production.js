/* Be^Up Home production hardening layer. Home page only. */
(function(){
'use strict';
if(window.top!==window.self||window.location.pathname!=='/')return;
var doc=document;
var STYLE_ID='beup-home-production';
function addStyle(){
  if(doc.getElementById(STYLE_ID))return;
  var s=doc.createElement('style');
  s.id=STYLE_ID;
  s.textContent=`
html,body{width:100%;max-width:100%;overflow-x:hidden!important}
body{min-width:320px}
.beup-home{width:100%;overflow:hidden}
.beup-wrap{width:min(calc(100% - 48px),1240px);max-width:1240px}
.beup-header{width:100%;}
.beup-header-inner{min-width:0}
.beup-nav{min-width:0}
.beup-nav a{white-space:nowrap}
.beup-btn{min-height:48px}
.beup-hero h1{max-width:760px}
.beup-hero-actions{align-items:center}
.beup-service,.beup-challenge,.beup-value,.beup-step,.beup-industry,.beup-proof-card{min-width:0}
.beup-service p,.beup-challenge p,.beup-value p,.beup-step p,.beup-proof-card span{overflow-wrap:anywhere}
.beup-footer a{overflow-wrap:anywhere}
@media(max-width:1100px){
  .beup-nav{gap:18px}
  .beup-header .beup-book{padding-inline:16px}
  .beup-hero-grid,.beup-challenge-grid,.beup-why-grid,.beup-proof-panel{gap:40px}
}
@media(max-width:900px){
  .beup-nav,.beup-header .beup-book{display:none!important}
  .beup-menu-btn{display:block!important;flex:0 0 44px}
  .beup-mobile-menu{position:fixed!important;inset:72px 16px auto!important;z-index:1001!important;background:#0B1F3A!important;border:1px solid rgba(246,245,241,.14)!important;border-radius:14px!important;padding:10px!important;box-shadow:0 20px 50px rgba(11,31,58,.22)!important}
  .beup-mobile-menu a{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:48px!important;padding:12px 14px!important;border-radius:8px!important;color:#F6F5F1!important;font-weight:600!important}
  .beup-mobile-menu a:hover{background:rgba(246,245,241,.08)!important}
  .beup-hero{padding-top:132px}
  .beup-hero-grid,.beup-challenge-grid,.beup-why-grid,.beup-proof-panel{grid-template-columns:1fr!important}
  .beup-hero-visual{height:300px}
  .beup-services-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .beup-industry-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .beup-process{grid-template-columns:repeat(2,minmax(0,1fr))}
  .beup-process:before{display:none}
  .beup-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:600px){
  .beup-wrap{width:calc(100% - 32px)}
  .beup-header{padding:12px 0}
  .beup-mobile-menu{inset:68px 12px auto!important}
  .beup-hero{min-height:0;padding:118px 0 64px}
  .beup-hero h1{font-size:clamp(40px,12vw,58px)}
  .beup-hero .lead{font-size:16px}
  .beup-hero-actions{display:grid;grid-template-columns:1fr;gap:10px}
  .beup-hero-actions .beup-btn{width:100%;min-width:0}
  .beup-hero-visual{height:235px}
  .beup-orbit.o1{width:220px;height:220px}.beup-orbit.o2{width:158px;height:158px}.beup-core{width:86px;height:86px;font-size:16px}
  .beup-section{padding:68px 0}
  .beup-section-head{margin-bottom:30px}
  .beup-section-head h2,.beup-why h2,.beup-integrated h2{font-size:clamp(30px,9vw,40px)}
  .beup-challenges,.beup-value-grid,.beup-proof-list{grid-template-columns:1fr!important}
  .beup-services-grid,.beup-industry-grid,.beup-process{grid-template-columns:1fr!important}
  .beup-footer-grid{grid-template-columns:1fr!important;gap:28px}
}
@media(max-width:375px){
  .beup-wrap{width:calc(100% - 24px)}
  .beup-hero{padding-top:108px}
  .beup-hero h1{font-size:39px}
  .beup-hero-visual{height:205px}
  .beup-orbit.o1{width:190px;height:190px}.beup-orbit.o2{width:136px;height:136px}
  .beup-orbit-label{font-size:10px}
  .beup-service,.beup-challenge,.beup-value,.beup-step,.beup-industry{padding:22px}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.beup-home *,.beup-home *:before,.beup-home *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;
  doc.head.appendChild(s);
}
function removeHomeOnlyDevText(){
  var re=/Combined site model|one file, all 11 pages|Sample Article|\bSample\b|\bDemo\b|development label|development text/i;
  doc.querySelectorAll('body *').forEach(function(el){
    if(el.matches('script,style,svg,path'))return;
    var text=(el.textContent||'').trim();
    if(!text||text.length>140)return;
    if(re.test(text)&&el.children.length===0)el.remove();
  });
}
function normalizeHeader(){
  var headers=doc.querySelectorAll('.beup-header');
  if(headers.length>1){for(var i=1;i<headers.length;i++)headers[i].remove();}
  var header=doc.querySelector('.beup-header');
  if(!header)return;
  var nav=header.querySelector('.beup-nav');
  var menu=header.querySelector('.beup-mobile-menu');
  var toggle=header.querySelector('.beup-menu-btn');
  if(!toggle)return;
  toggle.setAttribute('aria-label','Open navigation');
  toggle.setAttribute('aria-expanded','false');
  if(!menu&&nav){
    menu=doc.createElement('div');
    menu.className='beup-mobile-menu';
    Array.prototype.forEach.call(nav.querySelectorAll('a'),function(a){
      var clone=a.cloneNode(true);menu.appendChild(clone);
    });
    header.appendChild(menu);
  }
  if(!menu)return;
  menu.hidden=true;
  toggle.addEventListener('click',function(){
    var open=!menu.hidden;
    menu.hidden=open;
    toggle.setAttribute('aria-expanded',String(!open));
    toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');
  });
  menu.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a)return;
    menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');
  });
}
function normalizeHero(){
  var hero=doc.querySelector('.beup-hero');
  if(!hero)return;
  hero.querySelectorAll('a,button').forEach(function(el){
    if(/^(Email|Call|WhatsApp|Instagram)$/i.test((el.textContent||'').trim()))el.remove();
  });
  var actions=hero.querySelector('.beup-hero-actions');
  if(!actions)return;
  var primary=Array.prototype.find.call(actions.querySelectorAll('a,button'),function(el){return /Book a Consultation/i.test(el.textContent||'')});
  var secondary=Array.prototype.find.call(actions.querySelectorAll('a,button'),function(el){return /Explore Our Services/i.test(el.textContent||'')});
  if(primary)primary.setAttribute('href','/book-consultation');
  if(secondary)secondary.setAttribute('href','/services');
}
function normalizeFooter(){
  var footers=doc.querySelectorAll('.beup-footer');
  if(footers.length>1){for(var i=1;i<footers.length;i++)footers[i].remove();}
}
function run(){
  addStyle();
  removeHomeOnlyDevText();
  normalizeHeader();
  normalizeHero();
  normalizeFooter();
  doc.documentElement.classList.add('beup-home-production-ready');
}
if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',run);else run();
})();
