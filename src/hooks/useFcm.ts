// src/hooks/useFcm.ts
import { useEffect, useState } from 'react';
import { requestForToken, onMessageListener } from '../config/firebase';
import { useUIStore } from '../store/uiStore'; // To show in-app notifications
import { useAuthStore } from '../store/authStore';

interface FcmPayload {
    notification: {
        title?: string;
        body?: string;
        image?: string;
    };
    data?: Record<string, string>; // Custom data
}

export const useFcm = () => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<FcmPayload | null>(null);
    const { showNotification: showUiNotification } = useUIStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        const setupFcm = async () => {
            if (isAuthenticated && 'Notification' in window && 'serviceWorker' in navigator) {
                // Request permission
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    const token = await requestForToken();
                    if (token) {
                        setFcmToken(token);
                        // TODO: Send this token to your backend if it's new or changed
                        // This should ideally be done in a service after login/token refresh
                        console.log('FCM Token acquired in hook:', token);
                    }
                } else {
                    console.log('Unable to get permission to notify.');
                }
            }
        };

        setupFcm();
    }, [isAuthenticated]); // Re-run if authentication state changes

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unsubscribe = onMessageListener()
            .then((payload) => {
                const fcmPayload = payload as FcmPayload; // Type assertion
                console.log('Foreground message received in hook:', fcmPayload);
                setNotification(fcmPayload);
                // Show an in-app notification using your UI store
                showUiNotification(
                    `${fcmPayload.notification?.title || 'New Message'}: ${fcmPayload.notification?.body || ''}`,
                    'info'
                );
            })
            .catch((err) => console.error('failed to listen for foreground messages: ', err));

        return () => {
            // Clean up the listener if needed, though onMessageListener itself returns a promise
            // that resolves once. If you were using a continuous listener, you'd unsubscribe here.
        };
    }, [showUiNotification]);

    return { fcmToken, notification };
};