import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
`;

export const ModalHeader = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 15px 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
`;

export const ModalCloseButton = styled.button`
    cursor: pointer;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    padding: 0;
    line-height: 1;
`;

export const ModalBody = styled.div`
    padding: 20px;
    flex-grow: 1;
`;

export const ModalFooter = styled.div`
    padding: 15px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;