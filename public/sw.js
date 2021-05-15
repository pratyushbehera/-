let cacheVersion = 1;
let currentCache = {
  offline: "offline-cache" + cacheVersion
};
const offlineUrl = "offline.html";

this.addEventListener("install", event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll(["./img/icon-192x192.png", offlineUrl]);
    })
  );
});

this.addEventListener("fetch", event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" &&
      event.request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

this.addEventListener("push", event => {
  console.log("push received...");
  // this.clients.matchAll().then(function(c) {
  //   if (c.length === 0) {
  const data = event.data.json();
  // Show notification
  console.log("push received...");
  event.waitUntil(
    this.registration.showNotification(data.title, {
      body: "Check out the weather",
      badge: "img/badgeIcon.png",
      icon: "img/icon-144x144.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now() + 1000,
        primaryKey: 1
      }
    })
  );
});

this.addEventListener("notificationclick", function(e) {
  console.log("notification received...");

  this.registration.getNotifications().then(function(notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
  this.clients.matchAll().then(function(clis) {
    var client = clis.find(function(c) {
      return c.visibilityState === "visible";
    });
    if (client !== undefined && client) {
      client.navigate("https://fictional-happiness.now.sh/");
      client.focus();
    } else {
      // there are no visible windows. Open one.
      this.clients.openWindow("https://fictional-happiness.now.sh/");
    }
  });

  //this.clients.openWindow("https://fictional-happiness.now.sh/");
});
