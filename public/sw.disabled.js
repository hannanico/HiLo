const CACHE_NAME = "hilo-offline-v1";
const HOME_URL = "/";

async function cacheHomePage() {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(HOME_URL, { cache: "reload" });

  if (!response.ok) {
    throw new Error("Could not cache HiLo's home page.");
  }

  const html = await response.clone().text();
  await cache.put(HOME_URL, response);

  // Next.js includes the JavaScript, CSS, and font URLs needed to
  // render the page in its HTML. Cache those exact build URLs.
  const assetUrls = [
    ...html.matchAll(
      /(?:src|href)="(\/_next\/static\/[^"]+)"/g
    ),
  ].map((match) => match[1].replaceAll("&amp;", "&"));

  await Promise.all(
    [...new Set(assetUrls)].map(async (url) => {
      const assetResponse = await fetch(url);

      if (!assetResponse.ok) {
        throw new Error(`Could not cache ${url}`);
      }

      await cache.put(url, assetResponse);
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheHomePage());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key.startsWith("hilo-offline-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate" && url.pathname === HOME_URL) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(HOME_URL, response.clone());
          }

          return response;
        } catch {
          return (await caches.match(HOME_URL)) ?? Response.error();
        }
      })()
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }

        return response;
      })()
    );
  }
});