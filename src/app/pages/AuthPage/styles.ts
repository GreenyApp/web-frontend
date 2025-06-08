import styled from 'styled-components';

export const AuthContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
`;

export const AuthTabs = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

export const AuthTab = styled.div<{ active?: boolean }>`
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.lightGray};
    color: ${({ theme, active }) => active ? theme.colors.white : theme.colors.text};
    transition: background-color 0.3s, color 0.3s;
    font-weight: ${({ active }) => active ? 'bold' : 'normal'};

    &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;

export const AuthFormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.colors.danger};
    margin-bottom: 15px;
    text-align: center;
    font-size: 0.9em;
`;