import styled from 'styled-components';

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const PageTitle = styled.h1`
    font-size: 1.8rem;
    margin: 0;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Slightly larger min-width for detailed cards */
    gap: 20px;
`;

export const EmptyStateContainer = styled.div`
    text-align: center;
    padding: 50px 0;
    color: ${({ theme }) => theme.colors.darkGray};

    svg { /* For react-icons used in empty state */
        font-size: 4rem;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.veryLightGray};
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
`;