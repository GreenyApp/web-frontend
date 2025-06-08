import styled from 'styled-components';

export const SectionHeader = styled.h1`
    margin: 30px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
`;

export const ProfileFormContainer = styled.div`
    max-width: 600px; /* Or adjust as needed */
`;

export const SubHeader = styled.h3`
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.primaryDark};
`;