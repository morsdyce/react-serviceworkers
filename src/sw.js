importScripts('https://unpkg.com/sw-toolbox@3.6.0/sw-toolbox.js');

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// precache resources
toolbox.precache(['/', '/bundle.js']);

// set default to network First
toolbox.router.default = toolbox.networkFirst;

//toolbox.fastest
toolbox.router.get('/(.*', toolbox.networkFirst, {
  cache: {
    name: 'flickr-json-feed',
    maxEntries: 6,
    maxAgeSeconds: 86400,
    networkTimeoutSeconds: 2
  },
  origin: /\.api\.flickr\.com$/
});

toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'flickr-static-images',
    maxEntries: 20,
    maxAgeSeconds: 86400
  },
  origin: /\.staticflickr\.com$/
});
