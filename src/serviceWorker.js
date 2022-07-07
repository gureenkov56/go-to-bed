const cacheVersionName = 'gtb-cache-v8';

self.addEventListener('activate', event => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			return keys.map(async (cache) => {
				if(cache !== cacheVersionName) {
					console.log('Service Worker: Removing old cache: '+cache);
					return await caches.delete(cache);
				}
			})
		})()
	)
})

self.addEventListener('install', event => {
	event.waitUntil(caches.open(cacheVersionName))
})

self.addEventListener('fetch', async event => {
	event.respondWith(caches.open(cacheVersionName).then((cache) => {
		return cache.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
				cache.put(event.request, fetchedResponse.clone());
				return fetchedResponse;
			});
		});
	}));
})