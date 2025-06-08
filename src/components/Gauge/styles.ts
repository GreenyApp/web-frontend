import styled from 'styled-components';

export const GaugeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 5px;
    margin-top: 5px;
`;

interface GaugeFillProps {
    percentage: number;
    color: string;
}

export const GaugeFill = styled.div<GaugeFillProps>`
    position: absolute;
    height: 100%;
    border-radius: 5px;
    left: 0;
    top: 0;
    width: ${({ percentage }) => percentage}%;
    background-color: ${({ color }) => color};
    transition: width 0.3s ease-in-out;
`;