import styled from 'styled-components';
import Card from '../Card';

export const StyledDeviceCard = styled(Card)`
`;

export const DeviceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const DeviceTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
`;

export const DeviceInfo = styled.div`
    margin-top: 15px;
`;

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;

export const InfoLabel = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    flex-basis: 50%; 
`;

export const InfoValue = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDark};
    text-align: right;
`;

export const InfoGaugeWrapper = styled.div`
    flex-basis: 100%; 
    margin-top: 5px;
`;

export const DeviceActions = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const InfoItemWithGauge = styled(InfoItem)`
  flex-wrap: wrap;
`;