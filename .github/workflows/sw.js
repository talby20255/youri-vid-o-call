var C='allo-v1';
var F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js',
'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all(F.map(function(u){return c.add(u).catch(function(){});}));
  }));
  self.skipWaiting();
});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r||fetch(e.request).catch(function(){return caches.match('./index.html');});
  }));
});
