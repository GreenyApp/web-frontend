import React, { useEffect, Suspense, lazy, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme';
import { useAuthStore } from './store/authStore';
import Notification from './components/Notification';
import Layout from './components/Layout';
import DeviceFormModal from './components/DeviceFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { useFcm } from './hooks/useFcm';

const AuthPage = lazy(() => import('./app/pages/AuthPage'));
const HomePage = lazy(() => import('./app/pages/HomePage'));
const DevicesPage = lazy(() => import('./app/pages/DevicesPage'));
const ProfilePage = lazy(() => import('./app/pages/ProfilePage'));

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};


const App: React.FC = () => {
    const { checkAuthStatus, isLoading: authLoading } = useAuthStore();
    useFcm();

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Show a global loader if auth status is being checked
    if (authLoading && !useAuthStore.getState().accessToken && !useAuthStore.getState().isAuthenticated) {
         // Avoid flash of loader if already authenticated from localStorage and just fetching user
        return <div>Loading application...</div>; // Or a proper spinner component
    }

    return (
        <ThemeProvider theme={theme}>
            <DeviceFormModal />
            <DeleteConfirmationModal />
            <GlobalStyle />
            <Notification />
            <Router>
                <Layout> {/* Layout will contain Navbar and the page content area */}
                    <Suspense fallback={<div>Loading page...</div>}> {/* Fallback for lazy loaded pages */}
                        <Routes>
                            <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
                            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                            <Route path="/devices" element={<ProtectedRoute><DevicesPage /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;