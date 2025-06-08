import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { NotificationWrapper } from './styles';

const Notification: React.FC = () => {
    const { message, type, visible } = useUIStore((state) => state.notification);

    if (!message && !visible) return null; // Don't render if no message, even if briefly visible

    return (
        <NotificationWrapper visible={visible} type={type}>
            {message}
        </NotificationWrapper>
    );
};

export default Notification;