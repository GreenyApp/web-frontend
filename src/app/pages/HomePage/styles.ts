import styled from 'styled-components';
import { FaSeedling, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

export const SectionHeader = styled.h1`
    margin: 30px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;

export const OverviewCardContent = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 1.2rem;
  }
`;

export const TotalDevicesValue = styled.p`
  font-size: 2rem !important;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const WarningText = styled.p`
  color: ${({ theme }) => theme.colors.warning} !important;
`;

export const SeedlingIcon = styled(FaSeedling)` color: ${({ theme }) => theme.colors.primary};`;
export const WarningIcon = styled(FaExclamationTriangle)` color: ${({ theme }) => theme.colors.warning};`;
export const LightbulbIcon = styled(FaLightbulb)` color: ${({ theme }) => theme.colors.info};`; // Or other suitable color