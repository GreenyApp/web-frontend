import styled from 'styled-components';
import Card from '../Card'; // Import the Card component itself for styling

export const StyledDeviceCard = styled(Card)` // Extend Card styles
  /* Add specific styles for DeviceCard if needed,
     otherwise, it inherits from CardWrapper */
`;

export const DeviceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Ensure it takes full width of CardHeader */
`;

export const DeviceTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0; /* Override default h3 margin */
`;

export const DeviceInfo = styled.div`
    margin-top: 15px;
`;

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align items nicely */
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
    flex-basis: 50%; /* Give some space */
`;

export const InfoValue = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDark};
    text-align: right;
`;

export const InfoGaugeWrapper = styled.div`
    flex-basis: 100%; /* Gauge takes full width below label/value */
    margin-top: 5px;
`;

export const DeviceActions = styled.div`
    margin-top: 20px; /* Increased margin */
    display: flex;
    gap: 10px;
    flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
`;

// Specific styling for info items with gauges
export const InfoItemWithGauge = styled(InfoItem)`
  flex-wrap: wrap; // Allow label/value and gauge to stack
`;