/* be.up premium UX layer: keeps all existing content while removing the outer preview shell and polishing the real page UI. */
(function(){
  'use strict';
  var CSS = `
    :root{--beup-gutter:clamp(16px,4vw,40px);--beup-max:1280px;--beup-radius:10px}
    html,body{max-width:100%;overflow-x:hidden!important}body{background:#fff}*,*:before,*:after{box-sizing:border-box}
    .maxw{width:min(calc(100% - 2 * var(--beup-gutter)),var(--beup-max));max-width:var(--beup-max);padding-inline:0;margin-inline:auto}
    section{padding-block:clamp(64px,8vw,112px)}
    header{position:sticky!important;top:0!important;padding:14px 0!important;background:rgba(255,255,255,.96)!important;box-shadow:0 1px 0 rgba(11,31,58,.10)!important;backdrop-filter:blur(14px);z-index:900}
    header nav a{color:#0B1F3A!important}header .logo svg{height:28px;width:auto}
    .hero{padding-block:clamp(96px,10vw,136px) clamp(64px,8vw,96px)!important}.hero .maxw{min-height:0!important}.hero h1{font-size:clamp(2.4rem,5.2vw,4.25rem);letter-spacing:-.035em}.hero p.sub{max-width:560px;font-size:clamp(16px,1.4vw,18px)}.hero-ctas{margin-top:30px!important}
    .btn{border-radius:7px!important;transition:transform .2s ease,box-shadow .2s ease,background .2s ease,border-color .2s ease!important}.btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(11,31,58,.10)}.btn-primary{background:#1FA37A!important;color:#0B1F3A!important}.btn-ghost{border-color:rgba(11,31,58,.18)!important}.on-dark.btn-ghost{border-color:rgba(246,245,241,.25)!important;color:#fff!important}
    .cap-grid,.industries-grid,.aud-grid{gap:20px!important}.cap-card,.ind-card,.aud-card,.article-card,.principle-card,.outcome-card,.value-card,.team-card,.related-card{border-radius:var(--beup-radius)!important;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease!important}.cap-card:hover,.ind-card:hover,.aud-card:hover,.article-card:hover,.principle-card:hover,.outcome-card:hover,.value-card:hover,.team-card:hover,.related-card:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(11,31,58,.08);border-color:rgba(31,163,122,.55)!important}.featured-visual{min-height:0!important;height:auto!important}
    @media(max-width:1023px){.maxw{width:calc(100% - 48px)}.hero{padding-top:72px!important}.hero-visual{height:250px!important;margin-top:12px}.cap-grid,.industries-grid,.aud-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:767px){.maxw{width:calc(100% - 32px)}header{padding:9px 0!important}header .maxw{width:calc(100% - 32px)}.hero{padding-top:56px!important;padding-bottom:56px!important}.hero .maxw{gap:20px}.hero h1{font-size:clamp(2.35rem,11vw,3.25rem)}.hero-ctas{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}.hero-ctas .btn{width:100%}.hero-visual{height:210px!important}.cap-grid,.industries-grid,.aud-grid{grid-template-columns:1fr!important}.cap-card,.ind-card,.aud-card{padding:24px!important}.node .label{font-size:10px!important}}
    @media(prefers-reduced-motion:reduce){.btn,.cap-card,.ind-card,.aud-card,.article-card,.principle-card,.outcome-card,.value-card,.team-card,.related-card{transition:none!important}}
  `;
  function addStyle(doc){if(doc.getElementById('beup-premium-redesign'))return;var s=doc.createElement('style');s.id='beup-premium-redesign';s.textContent=CSS;doc.head.appendChild(s)}
  function polish(doc){
    if(!doc||!doc.body)return;addStyle(doc);
    parent.document.querySelectorAll('.shell-header,.shell-nav,.note').forEach(function(el){el.style.display='none'});
    var wrap=parent.document.querySelector('.frame-wrap');if(wrap){wrap.style.height='100vh';wrap.style.minHeight='100vh';wrap.style.flex='none'}
    var frame=parent.document.getElementById('page-frame');if(frame){frame.style.height='100vh';frame.style.minHeight='100vh'}
    doc.querySelectorAll('a.btn-primary').forEach(function(a){if(/Talk to a Consultant/i.test((a.textContent||'').trim())){a.setAttribute('href','/book-consultation');a.innerHTML='Book a Consultation <span class="arrow">→</span>'}});
    doc.querySelectorAll('.beup-contact-demo').forEach(function(el){el.remove()});
  }
  function run(){try{var frame=document.getElementById('page-frame');if(!frame)return;function apply(){try{polish(frame.contentDocument)}catch(e){}}frame.addEventListener('load',apply);apply()}catch(e){}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
