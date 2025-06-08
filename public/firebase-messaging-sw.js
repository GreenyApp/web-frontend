// public/firebase-messaging-sw.js

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js'); // Use compat version for service worker
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// REPLACE with your actual Firebase config (same as in firebase.ts)
const firebaseConfig = {
  apiKey: "AIzaSyC9lyFC6HgQY6fo2Q4GtNCkBwV2mvzH5hc",
  authDomain: "greeny-e064b.firebaseapp.com",
  projectId: "greeny-e064b",
  storageBucket: "greeny-e064b.firebasestorage.app",
  messagingSenderId: "660900377273",
  appId: "1:660900377273:web:e1dc19033855e45b3b2168",
  measurementId: "G-3XEBMDFJN5"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title || "New Notification";
    const notificationOptions = {
        body: payload.notification.body || "You have a new message.",
        icon: payload.notification.icon || "/icons/icon-192x192.png", // Path to your app icon in public/icons
        // You can add more options like actions, data, etc.
        // data: payload.data // if you send custom data with notification
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});