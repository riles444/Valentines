const CACHE_NAME = 'valentines-v1';
const urlsToCache = [
    './',
    './valentines.css',
    './valentines.js',
    './images/heart.png',
    './US/IMG-20250607-WA0019.jpg',
    './US/IMG-20250606-WA0068 (1).jpg',
    './US/WhatsApp Image 2025-11-09 at 20.26.56.jpeg',
    './US/IMG-20250607-WA0018.jpg',
    './US/1000096200.jpg',
    './US/WhatsApp Image 2025-11-09 at 20.26.44.jpeg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});