const CACHE_NAME = 'caramujo-africano-slz-final-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './prefeitura_semus.png',
  './logo_covep.png',
  './ciclo_angiostrongylus.png',
  './caramujo_comparativo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
