import styled from 'styled-components';

export const FormGroup = styled.div`
    margin-bottom: 15px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.mediumGray};
    border-radius: 4px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;