import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    padding: 1rem 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 16px 60px;
`;

export const NavbarContent = styled.div`
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LogoLink = styled(NavLink)`
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;

    svg { /* For react-icons */
        margin-right: 10px;
    }
`;

export const NavLinksList = styled.ul`
    display: flex;
    list-style: none;
`;

export const NavItem = styled.li`
    margin-left: 20px;
`;

export const StyledNavLink = styled(NavLink)`
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }

    &.active {
        font-weight: bold;
        /* text-decoration: underline; */
        border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
    }
`;