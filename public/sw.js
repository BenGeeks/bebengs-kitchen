const STATIC_CACHE_NAME = 'site-static-cache-v12072023-2';
const DYNAMIC_CACHE_NAME = 'site-dynamic-cache-v12072023';
const staticAssets = ['/images/favicon.ico', '/offline.html', '/images/header_logo.png', '/prod', '/sw.js', '/images/loader.gif'];

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
