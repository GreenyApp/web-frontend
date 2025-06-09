import { useEffect, useState } from 'react';
import { requestForToken, onMessageListener } from '../config/firebase';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

interface FcmPayload {
    notification: {
        title?: string;
        body?: string;
        image?: string;
    };
    data?: Record<string, string>; 
}

export const useFcm = () => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<FcmPayload | null>(null);
    const { showNotification: showUiNotification } = useUIStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        const setupFcm = async () => {
            if (isAuthenticated && 'Notification' in window && 'serviceWorker' in navigator) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    const token = await requestForToken();
                    if (token) {
                        setFcmToken(token);
                        console.log('FCM Token acquired in hook:', token);
                    }
                } else {
                    console.log('Unable to get permission to notify.');
                }
            }
        };

        setupFcm();
    }, [isAuthenticated]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unsubscribe = onMessageListener()
            .then((payload) => {
                const fcmPayload = payload as FcmPayload;
                console.log('Foreground message received in hook:', fcmPayload);
                setNotification(fcmPayload);
                showUiNotification(
                    `${fcmPayload.notification?.title || 'New Message'}: ${fcmPayload.notification?.body || ''}`,
                    'info'
                );
            })
            .catch((err) => console.error('failed to listen for foreground messages: ', err));

        return () => {};
    }, [showUiNotification]);

    return { fcmToken, notification };
};