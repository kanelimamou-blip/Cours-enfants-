// Garde l'appli disponible hors ligne. Changer VERSION à chaque mise à jour.
const VERSION = "gs-202610300019";
const FICHIERS = ["./", "./index.html", "./manifest.webmanifest", "./icone-192.png", "./icone-512.png", "../voix/voix.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Polices : on garde la première copie téléchargée.
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION + "-polices").then(c => c.match(req).then(r => r || fetch(req).then(rep => { c.put(req, rep.clone()); return rep; }))));
    return;
  }
  if (url.origin !== location.origin) return;
  // Pages et fichiers de l'appli : réseau d'abord pour avoir les nouvelles leçons, sinon la copie hors ligne.
  e.respondWith(
    fetch(req).then(rep => { if (rep.ok) caches.open(VERSION).then(c => c.put(req, rep.clone())); return rep; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
