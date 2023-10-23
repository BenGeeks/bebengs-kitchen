const STATIC_CACHE_NAME = 'site-static-cache-v10232023';
const DYNAMIC_CACHE_NAME = 'site-dynamic-cache';
const staticAssets = ['images/favicon.ico', '/offline.html', '/images/logo-144x144.png', '/prod', '/sw.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('activate', () => {
  console.log('Service worker activated');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match('/offline.html')));
});
