const CACHE_NAME = 'my-site-cache-v1';
const offlineImageUrl = 'assets/images/offline.jpg';
const urlsToCache = [
  '/',
  'bundle.js',
  offlineImageUrl
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.match('staticflickr.com')) {
    return event.respondWith(handleFlickerImageRequest(event));
  }

  if (event.request.url.match('localhost:3000')) {
    return event.respondWith(handleFlickerAPIRequests(event));
  }

  return event.respondWith(returnCacheThenNetwork(event));
});

function returnCacheThenNetwork(event) {
  return caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
}

function handleFlickerAPIRequests(event) {
  return caches.match(event.request)
    .then((cachedResponse) => {
      if (navigator.onLine) {
        fetch(event.request).then((response) => {
          // check if we received a valid response
          if (!response || response.status !== 200) {
            return response;
          }

          const clonedResponse = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, clonedResponse);

              self.clients.matchAll()
                .then((clientList) => {
                  clientList.forEach((client) => {
                    client.postMessage({ type: 'stories::update' });
                  });
                });
            });
        });
      }

      return cachedResponse || fetch(event.request);
    });
}

function handleFlickerImageRequest(event) {
  return caches.match(event.request)
    .then((cachedResponse) => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response);
          });

          return response.clone();
        })
        .catch(() => caches.match(offlineImageUrl));
    });
}
