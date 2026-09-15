/* Be^Up Home iframe bridge. The deployed site uses a single outer shell + srcdoc iframe. */
(function(){
'use strict';
if(window.top!==window.self||window.location.pathname!=='/')return;
var frame=document.getElementById('page-frame');
if(!frame)return;
var injected=false;
function loadIntoFrame(){
  if(injected)return;
  var fdoc=frame.contentDocument;
  if(!fdoc||!fdoc.head||!fdoc.body)return;
  injected=true;
  var urls=['/home-redesign.js','/home-meta.js','/home-production.js'];
  Promise.all(urls.map(function(url){
    return fetch(url,{cache:'no-store'}).then(function(r){
      if(!r.ok)throw new Error('Failed to load '+url);
      return r.text();
    });
  })).then(function(scripts){
    scripts.forEach(function(code){
      code=code.replace(/if\(window\.top!==window\.self\|\|window\.location\.pathname!=='\\/'\)return;/g,'if(false)return;');
      var s=fdoc.createElement('script');
      s.textContent=code;
      fdoc.body.appendChild(s);
    });
    cleanup();
  }).catch(function(){
    injected=false;
  });
}
function cleanup(){
  var fdoc=frame.contentDocument;
  if(!fdoc)return;
  fdoc.querySelectorAll('.beup-services-graph,.beup-contact-section').forEach(function(el){el.remove();});
}
frame.addEventListener('load',function(){
  injected=false;
  loadIntoFrame();
  setTimeout(cleanup,250);
  setTimeout(cleanup,900);
});
if(frame.contentDocument&&frame.contentDocument.readyState!=='loading')loadIntoFrame();
})();
