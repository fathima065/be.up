/* be.up responsive UI/UX system — injected into every bundled page. */
(function () {
  'use strict';

  var CSS = `
    :root{
      --container-width:1280px;
      --page-gutter:clamp(16px,4vw,40px);
      --section-space:clamp(48px,8vw,120px);
      --radius:8px;
    }
    html,body{max-width:100%;overflow-x:hidden;}
    *,*::before,*::after{box-sizing:border-box;}
    img,svg,video,canvas,iframe{max-width:100%;}
    button,input,select,textarea{max-width:100%;font:inherit;}
    .maxw{width:min(100% - 2 * var(--page-gutter),var(--container-width));max-width:var(--container-width);padding-inline:var(--page-gutter);margin-inline:auto;}
    section{padding-block:var(--section-space);}
    h1{font-size:clamp(2rem,5vw,3.5rem);line-height:1.1;overflow-wrap:anywhere;}
    h2{font-size:clamp(1.6rem,3.2vw,2.25rem);line-height:1.18;overflow-wrap:anywhere;}
    h3,h4{overflow-wrap:anywhere;}
    p,li{overflow-wrap:anywhere;}
    .btn{min-height:44px;max-width:100%;justify-content:center;}
    :focus-visible{outline:2px solid var(--blue,#2E7DA8);outline-offset:3px;}

    /* One intentional mobile header. */
    .beup-mobile-toggle{display:none;appearance:none;border:0;background:transparent;color:inherit;width:44px;height:44px;padding:9px;cursor:pointer;align-items:center;justify-content:center;flex-direction:column;gap:5px;}
    .beup-mobile-toggle span{display:block;width:24px;height:2px;background:currentColor;border-radius:2px;transition:transform .25s ease,opacity .2s ease;}
    .beup-mobile-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .beup-mobile-toggle[aria-expanded="true"] span:nth-child(2){opacity:0;}
    .beup-mobile-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
    .beup-mobile-menu{position:fixed;inset:64px 0 auto 0;z-index:1000;background:var(--white,#fff);border-top:1px solid var(--line,rgba(11,31,58,.12));box-shadow:0 18px 40px rgba(11,31,58,.12);padding:12px var(--page-gutter) 24px;display:grid;gap:4px;opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .25s ease,transform .25s ease,visibility .25s ease;max-height:calc(100vh - 64px);overflow:auto;}
    .beup-mobile-menu.is-open{opacity:1;visibility:visible;transform:translateY(0);}
    .beup-mobile-menu a{display:flex;align-items:center;min-height:48px;padding:10px 4px;font-size:15px;font-weight:600;border-bottom:1px solid var(--line,rgba(11,31,58,.12));color:var(--navy,#0B1F3A);}
    .beup-mobile-menu a:last-child{border-bottom:0;}
    body.beup-menu-open{overflow:hidden;}

    /* Editorial cleanup for Insights. */
    .featured-visual{min-height:0;height:auto;padding:32px;}
    .featured-visual svg{width:min(100%,220px);height:auto;}
    .hero-visual{max-width:100%;}

    /* Business-stage cards: intentional, balanced layout rather than accidental empty cells. */
    .aud-grid{grid-template-columns:repeat(5,minmax(0,1fr));}
    .aud-card{min-width:0;}

    /* Flexible grids. */
    .cap-grid,.article-grid,.industries-grid,.principle-grid,.outcome-grid,.related-grid,.team-grid,.value-grid{min-width:0;}
    .cap-card,.article-card,.ind-card,.principle-card,.outcome-card,.related-card,.team-card,.value-card{min-width:0;}

    @media (max-width:1279px){
      .aud-grid{grid-template-columns:repeat(3,minmax(0,1fr));}
      .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
      .svc-row{grid-template-columns:64px minmax(0,1fr) minmax(0,1.25fr);gap:24px;}
    }
    @media (max-width:1023px){
      :root{--page-gutter:24px;}
      section{padding-block:clamp(56px,8vw,88px);}
      .beup-mobile-toggle{display:flex;}
      header{position:sticky!important;top:0;z-index:900;padding:10px 0!important;background:var(--white,#fff)!important;box-shadow:0 1px 0 var(--line,rgba(11,31,58,.12));}
      header .maxw{min-height:64px;}
      header nav,header>.maxw>nav{display:none!important;}
      header .btn{display:none!important;}
      header .logo svg{height:26px;width:auto;}
      .hero{padding-block:clamp(112px,16vw,160px) 72px;}
      .hero .maxw,.challenge .maxw,.integrated .maxw,.why .maxw,.why-exist .maxw,.challenges .maxw,.solutions .maxw,.contact-grid{grid-template-columns:1fr;}
      .hero-visual{height:260px;margin-top:28px;}
      .svc-row{grid-template-columns:64px minmax(0,1fr);}
      .svc-row .rcopy{grid-column:2;}
      .aud-grid,.article-grid,.industries-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
      .principle-grid,.outcome-grid,.related-grid,.team-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
      .featured-card{grid-template-columns:1fr;}
      .featured-body{padding:28px;}
      .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
      .two-col{grid-template-columns:1fr;}
    }
    @media (max-width:767px){
      :root{--page-gutter:16px;}
      section{padding-block:48px 64px;}
      .maxw{width:calc(100% - 32px);padding-inline:0;}
      header .maxw{width:calc(100% - 32px);}
      .hero{padding-top:104px;padding-bottom:56px;}
      .hero h1{font-size:clamp(2rem,10vw,3rem);}
      .hero-ctas,.final-cta .ctas,.ind-hero .ctas,.article-cta .ctas,.confirm-card .ctas{display:grid;grid-template-columns:1fr;gap:10px;}
      .hero-ctas .btn,.final-cta .btn,.ind-hero .btn,.article-cta .btn,.confirm-card .btn{width:100%;}
      .hero-visual{height:220px;margin-top:20px;}
      .node .label{font-size:10px;}
      .aud-grid,.article-grid,.industries-grid,.principle-grid,.outcome-grid,.related-grid,.team-grid,.value-grid{grid-template-columns:1fr;}
      .svc-row{grid-template-columns:1fr;gap:12px;padding-block:32px;}
      .svc-row .rcopy{grid-column:auto;}
      .featured-body{padding:24px;}
      .featured-body h2{font-size:clamp(1.4rem,7vw,1.8rem);}
      .featured-visual{padding:24px;min-height:0;}
      .cat-row,.stage-strip{gap:8px;}
      .cat-pill,.stage-pill{max-width:100%;}
      .footer-grid{grid-template-columns:1fr;gap:28px;}
      footer{padding-block:48px 28px;}
      .footer-bottom{display:grid;gap:10px;}
      .app-hero,.about-hero,.svc-hero,.ind-hero,.ins-hero,.contact-hero{padding-top:36px;padding-bottom:52px;}
      .article-head{padding-top:28px;}
      .narrow{width:calc(100% - 32px);padding-inline:0;}
      .article-body{font-size:16px;line-height:1.75;}
      .hero-visual svg{max-width:100%;}
      .fw-step{width:100%!important;}
      .fw-track{gap:10px;}
      .fw-arrow{display:none;}
      .engage-track{grid-template-columns:1fr!important;}
      .date-row{max-width:100%;}
      .time-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
      .chip-grid{display:grid;grid-template-columns:1fr;}
      .summary-row{display:grid;grid-template-columns:1fr;gap:4px;}
      .summary-row .sval{text-align:left;}
    }
    @media (max-width:374px){
      :root{--page-gutter:16px;}
      .btn{padding-inline:16px;}
      .time-grid{grid-template-columns:1fr;}
      .answer-btn{padding:14px;gap:12px;}
      .answer-btn .alabel{font-size:15px;}
    }
    @media (prefers-reduced-motion:reduce){
      *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
      .beup-mobile-menu{transition:none;}
    }
  `;

  function addStyle() {
    if (document.getElementById('beup-responsive-fixes')) return;
    var style = document.createElement('style');
    style.id = 'beup-responsive-fixes';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function makeLogo() {
    return '<svg viewBox="0 0 220 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<text x="0" y="32" font-family="Manrope" font-weight="800" font-size="34" fill="currentColor">be</text>' +
      '<g transform="translate(50,10)"><path d="M0 20 L9 6 L18 20" fill="none" stroke="#1FA37A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>' +
      '<text x="72" y="32" font-family="Manrope" font-weight="800" font-size="34" fill="currentColor">up</text></svg>';
  }

  function setupHeader() {
    var header = document.querySelector('header');
    if (!header) return;
    var maxw = header.querySelector('.maxw') || header;
    var nav = header.querySelector('nav');
    if (!nav) return;

    var existing = header.querySelector('.beup-mobile-toggle');
    if (!existing) {
      existing = document.createElement('button');
      existing.className = 'beup-mobile-toggle';
      existing.type = 'button';
      existing.setAttribute('aria-label', 'Open menu');
      existing.setAttribute('aria-expanded', 'false');
      existing.setAttribute('aria-controls', 'beup-mobile-menu');
      existing.innerHTML = '<span></span><span></span><span></span>';
      maxw.appendChild(existing);
    }

    var menu = document.getElementById('beup-mobile-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'beup-mobile-menu';
      menu.className = 'beup-mobile-menu';
      menu.setAttribute('aria-hidden', 'true');
      document.body.appendChild(menu);
    }

    var links = [];
    nav.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      var text = (a.textContent || '').trim();
      if (href && text && !links.some(function (x) { return x.href === href; })) links.push({href: href, text: text});
    });
    var essentials = [
      {href:'/about',text:'About'},
      {href:'/approach',text:'Our Approach'},
      {href:'/services',text:'Services'},
      {href:'/industries',text:'Industries'},
      {href:'/insights',text:'Insights'},
      {href:'/contact',text:'Contact'},
      {href:'/business-growth-checkup',text:'Business Growth Checkup'},
      {href:'/book-consultation',text:'Book a Consultation'}
    ];
    essentials.forEach(function (item) {
      if (!links.some(function (x) { return x.href === item.href; })) links.push(item);
    });

    menu.innerHTML = links.map(function (item) {
      return '<a href="' + item.href.replace(/"/g,'&quot;') + '">' + item.text.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}) + '</a>';
    }).join('');

    function closeMenu() {
      existing.setAttribute('aria-expanded', 'false');
      existing.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('beup-menu-open');
    }
    function openMenu() {
      existing.setAttribute('aria-expanded', 'true');
      existing.setAttribute('aria-label', 'Close menu');
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('beup-menu-open');
    }

    existing.addEventListener('click', function () {
      existing.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1023) closeMenu(); });
  }

  function cleanupInsights() {
    if (!/\/insights(?:\/|$)/.test(window.location.pathname) && !document.querySelector('.featured')) return;
    var visual = document.querySelector('.featured .featured-visual');
    if (visual && visual.querySelector('svg')) {
      visual.style.minHeight = '0';
      visual.style.padding = '28px';
    }
  }

  function run() {
    try {
      addStyle();
      setupHeader();
      cleanupInsights();
    } catch (e) {
      console.warn('be.up responsive fixes:', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
