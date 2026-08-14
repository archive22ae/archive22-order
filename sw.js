self.addEventListener('push', event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      title: 'Archive 22',
      body: event.data ? event.data.text() : 'New order received'
    };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Archive 22', {
      body: data.body || 'New order received',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: data.url || '/receiver.html'
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data || '/receiver.html')
  );
});
