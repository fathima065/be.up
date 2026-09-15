/* be.up easy-contact: contact options live on the Contact page/footer only. */
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
    return path === '/contact';
  }

  function addStyles(doc) {
    if (doc.getElementById('beup-contact-demo-style')) return;
    var style = doc.createElement('style');
    style.id = 'beup-contact-demo-style';
    style.textContent = '.beup-contact-demo{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0}.beup-contact-demo a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border:1px solid rgba(11,31,58,.16);border-radius:7px;font:600 13px/1.2 Inter,sans-serif;text-decoration:none;transition:.2s}.beup-contact-demo a:hover{transform:translateY(-2px);border-color:#1FA37A}@media(max-width:767px){.beup-contact-demo{display:grid;grid-template-columns:1fr}.beup-contact-demo a{width:100%}}@media(prefers-reduced-motion:reduce){.beup-contact-demo a{transition:none}}';
    doc.head.appendChild(style);
  }

  function addBar(doc) {
    if (!doc || !doc.body || doc.querySelector('.beup-contact-demo')) return;
    var target = doc.querySelector('footer') || doc.querySelector('main') || doc.body;
    addStyles(doc);
    var wrap = doc.createElement('div');
    wrap.className = 'beup-contact-demo';
    wrap.setAttribute('aria-label', 'Contact options');
    wrap.innerHTML = '<a href="mailto:' + DEMO.email + '">Email Consultation</a>' +
      '<a href="tel:' + DEMO.phone + '">Call Consultation</a>' +
      '<a href="https://wa.me/' + DEMO.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>' +
      '<a href="' + DEMO.instagram + '" target="_blank" rel="noopener">Instagram</a>';
    target.appendChild(wrap);
  }

  function run() {
    try {
      var frame = document.getElementById('page-frame');
      if (!frame) return;
      function inject() { try { if (allowed(window.location.pathname)) addBar(frame.contentDocument); } catch (e) {} }
      frame.addEventListener('load', inject);
      inject();
    } catch (e) { console.warn('be.up contact demo:', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
