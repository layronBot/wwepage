//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_LayronGutierrezPWA';

//ficheros a cachear en la aplicaición
var urlsToCache = [
    './',
    './css/styles.css',
    './imagenes/wwe.png',
    './imagenes/wwe-raw-logo.jpg',
    './imagenes/wwe nxt.jpg',
    './imagenes/wwe smackdown.png',
    './imagenes/facebook.png',
    './imagenes/instagram.png',
    './imagenes/twitter.png',
    './imagenes/favicon-1024x1024.png',
    './imagenes/favicon-512x512.png',
    './imagenes/favicon-384x384.png',
    './imagenes/favicon-256x256.png',
    './imagenes/favicon-192x192.png',
    './imagenes/favicon-128x128.png',
    './imagenes/favicon-96x96.png',
    './imagenes/favicon-64x64.png',
    './imagenes/favicon-32x32.png',
    './imagenes/favicon-16x16.png',
];

//Evento install
//Instalación del service Worker y guarda en cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});