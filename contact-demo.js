/* be.up easy-contact demo: renders inside the bundled page iframe on Home + Contact only. */
(function () {
  'use strict';

  var DEMO = {
    email: 'hello@example.com',
    phone: '+910000000000',
    whatsapp: '910000000000',
    instagram: 'https://instagram.com/'
  };

  function allowed(path) {
    path = (path || '/').replace(/\/+$/, '') || '/';
    return path === '/' || path === '/contact';
  }

  function addStyles(doc) {
    if (doc.getElementById('beup-contact-demo-style')) return;
    var style = doc.createElement('style');
    style.id = 'beup-contact-demo-style';
    style.textContent = `
      .beup-contact-demo{position:fixed;right:20px;bottom:20px;z-index:12000;display:flex;align-items:center;gap:8px;padding:8px;background:rgba(11,31,58,.97);border:1px solid rgba(246,245,241,.18);border-radius:999px;box-shadow:0 14px 35px rgba(11,31,58,.25);backdrop-filter:blur(10px)}
      .beup-contact-demo a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border-radius:999px;font:600 13px/1.2 Inter,sans-serif;text-decoration:none;white-space:nowrap}
      .beup-contact-demo .email{background:#fff;color:#0B1F3A}.beup-contact-demo .call{background:#1FA37A;color:#0B1F3A}.beup-contact-demo .whatsapp{background:#2E7DA8;color:#fff}.beup-contact-demo .instagram{background:#E8D7C8;color:#0B1F3A}
      @media(max-width:767px){.beup-contact-demo{left:10px;right:10px;bottom:10px;border-radius:12px;padding:7px;gap:5px}.beup-contact-demo a{flex:1;min-width:0;padding:11px 4px;font-size:11px;border-radius:7px}}
      @media(prefers-reduced-motion:reduce){.beup-contact-demo{backdrop-filter:none}}
    `;
    doc.head.appendChild(style);
  }

  function addBar(doc) {
    if (!doc || !doc.body || doc.querySelector('.beup-contact-demo')) return;
    addStyles(doc);
    var wrap = doc.createElement('div');
    wrap.className = 'beup-contact-demo';
    wrap.setAttribute('aria-label', 'Easy contact options');
    wrap.innerHTML = '<a class="email" href="mailto:' + DEMO.email + '">Email Consultation</a>' +
      '<a class="call" href="tel:' + DEMO.phone + '">Call Consultation</a>' +
      '<a class="whatsapp" href="https://wa.me/' + DEMO.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>' +
      '<a class="instagram" href="' + DEMO.instagram + '" target="_blank" rel="noopener">Instagram</a>';
    doc.body.appendChild(wrap);
  }

  function run() {
    try {
      var path = window.location.pathname || '/';
      if (!allowed(path)) return;
      var frame = document.getElementById('page-frame');
      if (!frame) return;
      function inject() { try { if (allowed(window.location.pathname)) addBar(frame.contentDocument); } catch (e) {} }
      frame.addEventListener('load', inject);
      inject();
    } catch (e) { console.warn('be.up contact demo:', e); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
