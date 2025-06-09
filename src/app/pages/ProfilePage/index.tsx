import React, { useState, type FormEvent } from 'react';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import userService from '../../../services/userService';
import { SectionHeader, ProfileFormContainer, SubHeader } from './styles';

const ProfilePage: React.FC = () => {
    const { user } = useAuthStore();
    const showNotification = useUIStore(state => state.showNotification);

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
            await userService.changePassword(newPassword);
            showNotification('Пароль успішно змінено', 'success');
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
        return <p>Завантаження профілю...</p>;
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