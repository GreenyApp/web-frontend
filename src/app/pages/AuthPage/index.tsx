import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { AuthContainer, AuthTabs, AuthTab, AuthFormContainer, ErrorMessage } from './styles';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const { login, register, isLoading, error: authError } = useAuthStore();
    const showNotification = useUIStore(state => state.showNotification);
    const clearAuthError = () => useAuthStore.setState({ error: null });


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearAuthError(); // Clear previous errors

        if (mode === 'register' && password !== confirmPassword) {
            showNotification('Паролі не співпадають!', 'error');
            return;
        }

        let success = false;
        if (mode === 'login') {
            success = await login({ email, password });
            if (success) showNotification('Ви успішно увійшли!', 'success');
        } else {
            success = await register({ email, password });
             if (success) showNotification('Ви успішно зареєструвалися!', 'success');
        }

        if (success) {
            navigate('/');
        } else {
            // Error will be set in authStore, and displayed via {authError}
            // showNotification(authStoreError || 'Помилка автентифікації', 'error');
        }
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        clearAuthError();
    }

    return (
        <AuthContainer>
            <AuthTabs>
                <AuthTab active={mode === 'login'} onClick={() => switchMode('login')}>
                    Увійти
                </AuthTab>
                <AuthTab active={mode === 'register'} onClick={() => switchMode('register')}>
                    Реєстрація
                </AuthTab>
            </AuthTabs>
            <AuthFormContainer>
                <form onSubmit={handleSubmit}>
                    {authError && <ErrorMessage>{authError}</ErrorMessage>}
                    <Input
                        label="Електронна пошта"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Пароль"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {mode === 'register' && (
                        <Input
                            label="Підтвердити пароль"
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}
                    <Button type="submit" fullWidth disabled={isLoading}>
                        {isLoading ? 'Завантаження...' : (mode === 'login' ? 'Увійти' : 'Зареєструватися')}
                    </Button>
                </form>
            </AuthFormContainer>
        </AuthContainer>
    );
};

export default AuthPage;