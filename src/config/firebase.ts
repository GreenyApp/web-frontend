import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC9lyFC6HgQY6fo2Q4GtNCkBwV2mvzH5hc",
  authDomain: "greeny-e064b.firebaseapp.com",
  projectId: "greeny-e064b",
  storageBucket: "greeny-e064b.firebasestorage.app",
  messagingSenderId: "660900377273",
  appId: "1:660900377273:web:e1dc19033855e45b3b2168",
  measurementId: "G-3XEBMDFJN5"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "BO4a9x8ks_UdDM5fKfX3YKZyou_1N9w1tYdW1Dne5MJ58NylGXDBVCjwGDBqxjU_k-YpxYbJHrUp280KabIL51o", // See step 3
        });
        if (currentToken) {
            console.log("FCM Registration Token:", currentToken);
            return currentToken;
        } else {
            console.log("No registration token available. Request permission to generate one.");
            return null;
        }
    } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
        return null;
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            resolve(payload);
        });
    });

export { messaging };
