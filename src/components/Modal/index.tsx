import React from 'react';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from './styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footerActions?: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footerActions,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay onClick={onClose}> 
            <ModalContent onClick={(e) => e.stopPropagation()}> 
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                {footerActions && <ModalFooter>{footerActions}</ModalFooter>}
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;