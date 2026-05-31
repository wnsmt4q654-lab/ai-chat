var CACHE = "seawhy-v1";
var ASSETS = [
  "/ai-chat/",
  "/ai-chat/index.html",
  "/ai-chat/manifest.json",
  "/ai-chat/swai-icon.png",
  "/ai-chat/bot-avatar.png",
  "/ai-chat/bot-avatar.jpg",
  "/ai-chat/user-avatar.jpg"
];

self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(resp) {
        if (resp.ok) {
          var clone = resp.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return resp;
      });
    })
  );
});
