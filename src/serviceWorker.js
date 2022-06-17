const cacheVersionName = 'gtb-cache-v4';

//const urlsToCache = [
//	'index.html',
//	'styles/style.css',
//	'js/app.js',
//	'favicon.ico',
//	'manifest.json',
//	'images/svg/cloud-download-svgrepo-com.svg',
//	'images/posts/me.jpeg',
//	'images/posts/qrCloudTips.png',
//	'images/icons/ios/144.png',
//	'https://fonts.gstatic.com/s/montserrat/v24/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2'
//]

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
		// Respond with the image from the cache or from the network
		return cache.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
				// Add the network response to the cache for future visits.
				// Note: we need to make a copy of the response to save it in
				// the cache and use the original as the request response.
				cache.put(event.request, fetchedResponse.clone());

				// Return the network response
				return fetchedResponse;
			});
		});
	}));
})