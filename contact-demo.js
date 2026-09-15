/* be.up easy-contact demo actions. Replace the three demo destinations later. */
(function () {
  'use strict';

  var DEMO = {
    email: 'hello@example.com',
    phone: '+910000000000',
    whatsapp: '910000000000'
  };

  function addStyles() {
    if (document.getElementById('beup-contact-demo-style')) return;
    var style = document.createElement('style');
    style.id = 'beup-contact-demo-style';
    style.textContent = `
      .beup-contact-demo{position:fixed;right:20px;bottom:20px;z-index:1200;display:flex;align-items:center;gap:8px;padding:8px;background:rgba(11,31,58,.96);border:1px solid rgba(246,245,241,.14);border-radius:999px;box-shadow:0 14px 35px rgba(11,31,58,.22);backdrop-filter:blur(10px)}
      .beup-contact-demo a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border-radius:999px;font:600 13px/1.2 Inter,sans-serif;text-decoration:none;white-space:nowrap}
      .beup-contact-demo .email{background:#fff;color:#0B1F3A}
      .beup-contact-demo .call{background:#1FA37A;color:#0B1F3A}
      .beup-contact-demo .whatsapp{background:#2E7DA8;color:#fff}
      @media(max-width:767px){
        body{padding-bottom:72px!important}
        .beup-contact-demo{left:0;right:0;bottom:0;border-radius:0;padding:8px 10px;gap:7px;justify-content:stretch}
        .beup-contact-demo a{flex:1;min-width:0;padding:11px 6px;font-size:12px;border-radius:7px}
      }
      @media(prefers-reduced-motion:reduce){.beup-contact-demo{backdrop-filter:none}}
    `;
    document.head.appendChild(style);
  }

  function addContactActions() {
    if (document.querySelector('.beup-contact-demo')) return;
    var wrap = document.createElement('div');
    wrap.className = 'beup-contact-demo';
    wrap.setAttribute('aria-label', 'Easy contact options');
    wrap.innerHTML =
      '<a class="email" href="mailto:' + DEMO.email + '">Email Consultation</a>' +
      '<a class="call" href="tel:' + DEMO.phone + '">Call Consultation</a>' +
      '<a class="whatsapp" href="https://wa.me/' + DEMO.whatsapp + '" target="_blank" rel="noopener">WhatsApp Enquiry</a>';
    document.body.appendChild(wrap);
  }

  function run() {
    try { addStyles(); addContactActions(); } catch (e) { console.warn('be.up contact demo:', e); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
