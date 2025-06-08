import styled, { css, type DefaultTheme } from 'styled-components';

interface StyledButtonProps {
    variant?: 'outline' | 'danger';
    fullWidth?: boolean;
    theme: DefaultTheme; // Explicitly type theme
}

export const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    font-size: 1rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.mediumGray};
        cursor: not-allowed;
        color: ${({ theme }) => theme.colors.darkGray};
    }

    ${({ variant, theme }) =>
        variant === 'outline' &&
        css`
            background-color: transparent;
            border: 1px solid ${theme.colors.primary};
            color: ${theme.colors.primary};
            &:hover {
                background-color: ${theme.colors.primary};
                color: ${theme.colors.white};
            }
            &:disabled {
                border-color: ${theme.colors.mediumGray};
                background-color: transparent;
                color: ${theme.colors.darkGray};
            }
        `}

    ${({ variant, theme }) =>
        variant === 'danger' &&
        css`
            background-color: ${theme.colors.danger};
            color: ${theme.colors.white};
            &:hover {
                background-color: ${theme.colors.dangerDark};
            }
             &:disabled {
                background-color: ${theme.colors.mediumGray};
                color: ${theme.colors.darkGray};
            }
        `}

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `}
`;