import styled from 'styled-components';

export const CardWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const CardHeaderStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 15px 20px;
    font-weight: bold;
`;

export const CardBody = styled.div`
    padding: 20px;
    flex-grow: 1; 
`;