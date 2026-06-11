/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

// SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0>

function handleRegistration(registration){
  console.log('Service Worker Registered. ', registration)
  /**
   * ServiceWorkerRegistration.onupdatefound
   * The service worker registration's installing worker changes.
   */
  registration.onupdatefound = (e) => {
    const installingWorker = registration.installing;
    installingWorker.onstatechange = (e) => {
      if (installingWorker.state !== 'installed') return;
      if (navigator.serviceWorker.controller) {
        console.log('SW is updated');
      } else {
        console.log('A Visit without previous SW');
        createSnackbar({
          message: 'App ready for offline use.',
          duration: 3000
        })
      }
    };
  }
}

if(navigator.serviceWorker){
  // 本地开发不注册 SW —— 避免缓存干扰，所有资源实时走 dev server
  var isDev = location.hostname === '127.0.0.1' || location.hostname === 'localhost';

  if (!isDev) {
    // For security reasons, a service worker can only control the pages
    // that are in the same directory level or below it. That's why we put sw.js at ROOT level.
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => handleRegistration(registration))
      .catch((error) => {console.log('ServiceWorker registration failed: ', error)})
  }

  // register message receiver
  // https://dbwriteups.wordpress.com/2015/11/16/service-workers-part-3-communication-between-sw-and-pages/
  navigator.serviceWorker.onmessage = (e) => {
    console.log('SW: SW Broadcasting:', event);
    const data = e.data

    if(data.command == "UPDATE_FOUND"){
      console.log("UPDATE_FOUND_BY_SW", data);
      // 本地开发不弹提示 — Jekyll dev server 每次返回不同的 Last-Modified 会误触发
      if (isDev) return;
      createSnackbar({
        message: "Content updated.",
        actionText:"refresh",
        action: function(e){location.reload()}
      })
    }
  }

  // 本地开发：如果之前注册过 SW，清掉旧缓存
  if (isDev) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      registrations.forEach(function(reg) {
        reg.unregister();
        console.log('[Dev] SW unregistered:', reg.scope);
      });
      if (window.caches) {
        caches.keys().then(function(names) {
          names.forEach(function(name) { caches.delete(name); });
          console.log('[Dev] All caches cleared:', names);
        });
      }
    });
  }
}
