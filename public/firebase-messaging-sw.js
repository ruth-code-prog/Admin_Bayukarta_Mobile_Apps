// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyBgXZkRzjsXBGut8PV9r6Ojfbbv7pcI-7Y',
  authDomain: 'bayukarta-c3fb0.firebaseapp.com',
  projectId: 'bayukarta-c3fb0',
  storageBucket: 'bayukarta-c3fb0.appspot.com',
  messagingSenderId: '280779452296',
  appId: '1:280779452296:web:f4170405aa6d323c46d43d',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  console.log(event)
  return event.waitUntil(self.clients.openWindow('http://localhost:3000'))
})