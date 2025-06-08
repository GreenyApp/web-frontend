import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Nav, NavbarContent, LogoLink, NavLinksList, NavItem, StyledNavLink } from './styles';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const showNotification = useUIStore(state => state.showNotification);

    const handleLogout = () => {
        logout();
        showNotification('Ви успішно вийшли з облікового запису', 'success');
        // Navigation to /auth will be handled by ProtectedRoute
    };

    return (
        <Nav>
            <NavbarContent>
                <LogoLink to="/">
                    <FaLeaf /> Greeny
                </LogoLink>
                <NavLinksList>
                    {isAuthenticated ? (
                        <>
                            <NavItem><StyledNavLink to="/">Головна</StyledNavLink></NavItem>
                            <NavItem><StyledNavLink to="/devices">Мої пристрої</StyledNavLink></NavItem>
                            <NavItem><StyledNavLink to="/profile">Профіль</StyledNavLink></NavItem>
                            <NavItem>
                                <a href="#" onClick={handleLogout} style={{color: 'white', textDecoration:'none'}}>Вийти</a>
                            </NavItem>
                        </>
                    ) : (
                        <NavItem><StyledNavLink to="/auth">Увійти / Реєстрація</StyledNavLink></NavItem>
                    )}
                </NavLinksList>
            </NavbarContent>
        </Nav>
    );
};

export default Navbar;