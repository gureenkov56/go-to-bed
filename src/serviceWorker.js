const cacheVersionName = 'gtb-cache-v4';


self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheVersionName)
		//.then(cache => {
		//	return cache.addAll(urlsToCache);
		//})
	)
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