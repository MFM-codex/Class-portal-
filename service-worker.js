const CACHE_NAME = "class-portal-cache-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "dashboard.html",
  "announcements.html",
  "assignments.html",
  "members.html",
  "settings.html",
  "photos.html",
  "videos.html",
  "notes.html",
  "css/style.css",
  "js/app.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("index.html"))
      );
    })
  );
});
