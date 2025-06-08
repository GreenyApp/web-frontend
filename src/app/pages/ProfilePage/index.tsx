import React, { useState, type FormEvent } from 'react';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import userService from '../../../services/userService'; // Direct service call for password change
import { SectionHeader, ProfileFormContainer, SubHeader } from './styles';

const ProfilePage: React.FC = () => {
    const { user } = useAuthStore();
    const showNotification = useUIStore(state => state.showNotification);

    // const [currentPassword, setCurrentPassword] = useState(''); // Backend doesn't require current for change via user.id
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        if (!newPassword) {
            showNotification('Введіть новий пароль', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            showNotification('Паролі не співпадають', 'error');
            return;
        }

        setIsChangingPassword(true);
        try {
            // The backend API for changePassword uses the authenticated user's ID
            // and doesn't require the current password in the payload.
            await userService.changePassword(newPassword);
            showNotification('Пароль успішно змінено', 'success');
            // setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Помилка зміни пароля';
            showNotification(errorMsg, 'error');
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (!user) {
        return <p>Завантаження профілю...</p>; // Or redirect if not authenticated
    }

    return (
        <div>
            <SectionHeader>Профіль користувача</SectionHeader>
            <ProfileFormContainer>
                <Card>
                    <Input
                        label="Електронна пошта"
                        id="profileEmail"
                        type="email"
                        value={user.email}
                        disabled
                    />

                    <SubHeader>Зміна пароля</SubHeader>
                    <form onSubmit={handleChangePassword}>
                        {/* Backend API doesn't require currentPassword field for /user/change-password endpoint
                        <Input
                            label="Поточний пароль"
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        /> */}
                        <Input
                            label="Новий пароль"
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            label="Підтвердження нового пароля"
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" disabled={isChangingPassword}>
                            {isChangingPassword ? 'Зміна...' : 'Змінити пароль'}
                        </Button>
                    </form>
                </Card>
            </ProfileFormContainer>
        </div>
    );
};

export default ProfilePage;