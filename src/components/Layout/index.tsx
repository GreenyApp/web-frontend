import React from 'react';
import Navbar from '../Navbar';
import { MainContentContainer } from './styles';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <MainContentContainer>
                {children}
            </MainContentContainer>
        </>
    );
};

export default Layout;