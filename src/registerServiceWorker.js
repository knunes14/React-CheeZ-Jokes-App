// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    const registerValidSW = (swUrl) => {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                } else {
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });
    };

    const checkValidServiceWorker = (swUrl) => {
      fetch(swUrl)
        .then((response) => {
          if (
            response.status === 404 ||
            response.headers.get('content-type').indexOf('javascript') === -1
          ) {
            navigator.serviceWorker.ready.then((registration) => {
              registration.unregister().then(() => {
                window.location.reload();
              });
            });
          } else {
            registerValidSW(swUrl);
          }
        })
        .catch(() => {
          console.log(
            'No internet connection found. App is running in offline mode.'
          );
        });
    };

    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
      if (publicUrl.origin === window.location.origin) {
        window.addEventListener('load', () => {
          const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
          if (publicUrl.hostname === 'localhost') {
            checkValidServiceWorker(swUrl);
            navigator.serviceWorker.ready.then(() => {
              console.log(
                'This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ'
              );
            });
          } else {
            registerValidSW(swUrl);
          }
        });
      }
    }
  }, []);
};

export default useServiceWorker;